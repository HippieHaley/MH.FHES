import procedures from './pp.js';

let grandTotal = 0;
const selectedItems = {};

function getSelectedPercent() {
  return parseFloat(document.getElementById('percentSelector').value) / 100;
}

function initializePriceList() {
  const container = document.createElement('div');
  container.className = 'services-container';

  const visitChunks = [
    {
      title: 'New Office Visits',
      items: procedures.filter(p => ['99202', '99203', '99204'].includes(p.cpt))
    },
    {
      title: 'Established Visits',
      items: procedures.filter(p => ['99211', '99212', '99213', '99214'].includes(p.cpt))
    },
    {
      title: 'Preventive New',
      items: procedures.filter(p => ['99384', '99385', '99386'].includes(p.cpt))
    },
    {
      title: 'Preventive Established',
      items: procedures.filter(p => ['99394', '99395', '99396'].includes(p.cpt))
    }
  ];

  visitChunks.forEach(({ title, items }) => {
    const section = document.createElement('div');
    section.className = 'service-section';
    section.innerHTML = `<h3>${title}</h3>`;

    items.forEach(item => {
      const serviceDiv = document.createElement('div');
      serviceDiv.className = 'service-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = item.service.replace(/\s+/g, '-').toLowerCase();

      const label = document.createElement('label');
      label.htmlFor = checkbox.id;

      const line1 = document.createElement('div');
      line1.textContent = item.cpt;

      const line2 = document.createElement('div');
      line2.textContent = item.service.replace(item.cpt, '').trim();

      label.appendChild(line1);
      label.appendChild(line2);

      checkbox.addEventListener('change', () => {
        handleServiceSelection(item, checkbox.checked);
      });

      serviceDiv.appendChild(checkbox);
      serviceDiv.appendChild(label);
      section.appendChild(serviceDiv);
    });

    container.appendChild(section);
  });

  const chunks = [
    {
      title: null,
      items: procedures.filter(p => [
        'Liquid Based PAP',
        'Conventional PAP',
        'HPV',
        'Pathology Fee',
        'Wet Mount',
         'Chlamydia (CHL)',
        'Gonorrhea (GC)',
        'Pregnancy Test Urine',
      ].includes(p.service))
    },
    {
      title: null,
      items: procedures.filter(p => [
        'Injection Fee',
        'Venipuncture',
        'Genital Wart Treatment Male',
        'Genital Wart Treatment Female',
        'HIV Rapid',
        'HIV Serum',
        'RPR (Syphilis)',
        'TPPA (Syphilis)',
        'HSV PCR',
        'HSV Serum',
        'Urine Dipstick (non-automated)',
        'Urine Dipstick'
      ].includes(p.service))
    },
    {
      title: null,
      items: procedures.filter(p => [
        'Implant Insertion (e.g., Nexplanon)',
        'Implant Removal (e.g., Nexplanon)',
        'Implant Removal and Insertion (e.g., Nexplanon)',
        'IUD Insertion (e.g., Liletta, Paragard, Mirena)',
        'IUD Removal (e.g., Liletta, Paragard, Mirena)',
        'IUD Removal and Insertion (e.g., Liletta, Paragard, Mirena)',
        'Nexplanon',
        'Liletta IUD',
        'Paragard IUD',
        'Bayer IUD',
        'Depo-Provera (Medroxyprogesterone)',
        'NuvaRing',
        'Xulane Patch'
      ].includes(p.service))
    },
    {
      title: null,
      items: procedures.filter(p => [
        'Doxycycline (oral)',
        'Rocephin (ceftriaxone inj)',
        'Bicillin L-A',
        'Azithromycin',
        'Acyclovir',
        'Metronidazole',
        'Fluconazole',
        'Ibuprofen',
        'Clindamycin Cream',
        'Clotrimazole Cream',
        'Bicillin',
        'Doxycycline (Oral)'
      ].includes(p.service))
    }
  ];
  chunks.forEach(({ items }) => {
    const section = document.createElement('div');
    section.className = 'service-section';

    items.forEach(item => {
      const serviceDiv = document.createElement('div');
      serviceDiv.className = 'service-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = item.service.replace(/\s+/g, '-').toLowerCase();

      const label = document.createElement('label');
      label.htmlFor = checkbox.id;
      label.textContent = item.service;

      const codeSpan = document.createElement('span');
      codeSpan.className = 'code-info';
      codeSpan.textContent = `${item.cpt || ''} ${item.hcpcs || ''} ${item.icd10 || ''}`.trim();

      checkbox.addEventListener('change', () => {
        handleServiceSelection(item, checkbox.checked);
      });

      serviceDiv.appendChild(checkbox);
      serviceDiv.appendChild(label);
      serviceDiv.appendChild(codeSpan);
      section.appendChild(serviceDiv);
    });

    container.appendChild(section);
  });

  document.getElementById('services-list').appendChild(container);
}

function handleServiceSelection(service, isChecked) {
  const percent = getSelectedPercent();
  const price = (service.fullprice || 0) * percent;

  if (isChecked) {
    addToReceipt(service.service, price);
  } else {
    removeFromReceipt(service.service);
  }
}

function addToReceipt(serviceName, price) {
  const receiptList = document.getElementById('receipt-items');
  const listItem = document.createElement('div');
  listItem.className = 'receipt-item';

  const itemText = document.createElement('span');
  itemText.textContent = `${serviceName}: $${price.toFixed(2)}`;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.className = 'remove-button';
  removeBtn.onclick = () => removeFromReceipt(serviceName);

  listItem.appendChild(itemText);
  listItem.appendChild(removeBtn);
  receiptList.appendChild(listItem);

  selectedItems[serviceName] = { price, element: listItem };
  updateGrandTotal();
}

function removeFromReceipt(serviceName) {
  if (selectedItems[serviceName]) {
    selectedItems[serviceName].element.remove();
    delete selectedItems[serviceName];
    updateGrandTotal();

    const checkbox = document.querySelector(`#${serviceName.replace(/\s+/g, '-').toLowerCase()}`);
    if (checkbox) {
      checkbox.checked = false;
    }
  }
}

function updateGrandTotal() {
  grandTotal = Object.values(selectedItems).reduce((sum, item) => sum + item.price, 0);
  document.getElementById('grand-total').textContent = `$${grandTotal.toFixed(2)}`;
}

function copyReceipt() {
  const percent = document.getElementById('percentSelector').value;
  const items = Object.keys(selectedItems).map(service =>
    `${service}: $${selectedItems[service].price.toFixed(2)}`
  );

  const receiptText = `=== Family Health Education Services ===\nDate: ${new Date().toLocaleDateString()}\nFee Percentage: ${percent}%\n\nServices:\n${items.join('\n')}\n\nTotal: $${grandTotal.toFixed(2)}`;

  navigator.clipboard.writeText(receiptText)
    .then(() => alert('Receipt copied to clipboard!'))
    .catch(() => alert('Failed to copy receipt.'));
}

document.addEventListener('DOMContentLoaded', () => {
  initializePriceList();

  document.getElementById('percentSelector').addEventListener('change', () => {
    Object.entries(selectedItems).forEach(([service, item]) => {
      const procedure = procedures.find(p => p.service === service);
      if (procedure) {
        const newPrice = (procedure.fullprice || 0) * getSelectedPercent();
        item.price = newPrice;
        item.element.querySelector('span').textContent =
          `${service}: $${newPrice.toFixed(2)}`;
      }
    });
    updateGrandTotal();
  });

  document.getElementById('copy-receipt').addEventListener('click', copyReceipt);
});
