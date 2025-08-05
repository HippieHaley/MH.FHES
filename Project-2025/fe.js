import procedures from './pp.js';

let grandTotal = 0;
const selectedItems = {};

function getSelectedPercent() {
  return parseFloat(document.getElementById('percentSelector').value) / 100;
}

function initializePriceList() {
  const container = document.createElement('div');
  container.className = 'services-container';

  // Extract Visit Type items only once
  const visitItems = procedures.filter(p =>
    p.keywords.some(k =>
      [
        'limited-new',
        'intermediate-new',
        'comprehensive-new',
        'minimal-established',
        'limited-established',
        'intermediate-established',
        'comprehensive-established',
        'preventive new',
        'preventive established'
      ].includes(k.toLowerCase())
    )
  );

  // Custom labeled visit chunks
  const visitChunks = [
    {
      title: 'New Office Visits',
      items: visitItems.filter(p =>
        ['99202', '99203', '99204'].includes(p.cpt)
      )
    },
    {
      title: 'Established Visits',
      items: visitItems.filter(p =>
        ['99211', '99212', '99213', '99214'].includes(p.cpt)
      )
    },
    {
      title: 'Preventive New',
      items: visitItems.filter(p =>
        ['99384', '99385', '99386'].includes(p.cpt)
      )
    },
    {
      title: 'Preventive Established',
      items: visitItems.filter(p =>
        ['99394', '99395', '99396'].includes(p.cpt)
      )
    }
  ];

  // Render visit chunks
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

  // Remaining categories
  const categories = {
    'Contraception': procedures.filter(p =>
      p.keywords.some(k =>
        ['implant', 'iud', 'depo', 'nuva ring', 'patch'].includes(k.toLowerCase())
      )
    ),
    'Tests': procedures.filter(p =>
      p.keywords.some(k =>
        ['pap', 'hpv', 'chl', 'gc', 'hiv', 'pregnancy test'].includes(k.toLowerCase())
      )
    ),
    'Medications': procedures.filter(p =>
      p.keywords.some(k =>
        [
          'doxycycline',
          'rocephin',
          'bicillin',
          'azithromycin',
          'acyclovir',
          'metronidazole',
          'fluconazole',
          'clindamycin cream',
          'clotrimazole cream',
          'ibuprofen'
        ].includes(k.toLowerCase())
      )
    ),
    'Services': procedures.filter(p =>
      p.keywords.some(k =>
        ['injection', 'venipuncture', 'wart', 'urine dip', 'pathology fee', 'wet mount'].includes(k.toLowerCase())
      )
    )
  };

  for (const [category, items] of Object.entries(categories)) {
    if (items.length === 0) continue;

    const section = document.createElement('div');
    section.className = 'service-section';
    section.innerHTML = `<h3>${category}</h3>`;

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
  }

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

  const receiptText = `=== Family Health Education Services ===
Date: ${new Date().toLocaleDateString()}
Fee Percentage: ${percent}%

Services:
${items.join('\n')}

Total: $${grandTotal.toFixed(2)}`;

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
