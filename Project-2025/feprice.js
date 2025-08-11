import procedures from './pp.js';

let grandTotal = 0;
const selectedItems = {};

function getSelectedPercent() {
  return parseFloat(document.getElementById('percentSelector').value) / 100;
}

function isMultipleAllowed(serviceName) {
  const multipleItems = [
    'Chlamydia (CHL)', 'Gonorrhea (GC)', 'NuvaRing', 'Xulane Patch',
    'Doxycycline', 'Rocephin (ceftriaxone inj)', 'Bicillin L-A', 'Azithromycin',
    'Acyclovir', 'Metronidazole', 'Fluconazole', 'Ibuprofen',
    'Clindamycin Cream', 'Clotrimazole Cream',
    'Alese', 'Apri', 'Aubra', 'Aviane', 'Bicillin', 'Camila', 'Ceftriaxone',
    'Chateal', 'Cryselle', 'Cyred', 'Doxycycline', 'Enpresse', 'Jolivette',
    'Levora', 'Lutera', 'Lyza', 'Mononessa', 'Nor QD', 'Nordette', 'Norethindrone',
    'Nortrel 777', 'Orsythia', 'Portia', 'Reclipsen', 'Sprintec', 'Sronyx',
    'Tri-LoMarzia', 'Tri-Lo Sprintec', 'TriNessa Lo', 'Triphasil', 'Trivora', 'Vilbra'
  ];

  const isOralContraceptive = procedures.some(p =>
    p.service === serviceName &&
    (p.service.toLowerCase().includes('oral contraceptive') ||
     p.service.toLowerCase().includes('pill') ||
     p.service.toLowerCase().includes('pop'))
  );

  return multipleItems.includes(serviceName) || isOralContraceptive;
}

function initializePriceList() {
  const container = document.createElement('div');
  container.className = 'services-container';

  const visitChunks = [
    { title: 'New Office Visits', items: procedures.filter(p => ['99202', '99203', '99204'].includes(p.cpt)) },
    { title: 'Established Visits', items: procedures.filter(p => ['99211', '99212', '99213', '99214'].includes(p.cpt)) },
    { title: 'Preventive New', items: procedures.filter(p => ['99384', '99385', '99386'].includes(p.cpt)) },
    { title: 'Preventive Established', items: procedures.filter(p => ['99394', '99395', '99396'].includes(p.cpt)) }
  ];

  visitChunks.forEach(({ title, items }) => {
    const section = document.createElement('div');
    section.className = 'service-section';
    section.innerHTML = `<h3>${title}</h3>`;
    items.forEach(item => addServiceCheckbox(section, item));
    container.appendChild(section);
  });

  const chunks = [
    {
      title: null,
      items: procedures.filter(p => ['Liquid Based PAP', 'Conventional PAP', 'HPV', 'Pathology Fee', 'Wet Mount', 'Chlamydia (CHL)', 'Gonorrhea (GC)', 'Pregnancy Test Urine'].includes(p.service))
    },
    {
      title: null,
      items: procedures.filter(p => ['Injection Fee', 'Venipuncture', 'Genital Wart Treatment Male', 'Genital Wart Treatment Female', 'HIV Rapid', 'HIV Serum', 'RPR (Syphilis)', 'TPPA (Syphilis)', 'HSV PCR', 'HSV Serum', 'Urine Dipstick (non-automated)', 'Urine Dipstick'].includes(p.service))
    },
    {
      title: null,
      items: procedures.filter(p => ['Implant Insertion', 'Implant Removal', 'Implant Removal and Insertion', 'Nexplanon', 'IUD Insertion', 'IUD Removal', 'IUD Removal and Insertion', 'Liletta IUD', 'Paragard IUD', 'Bayer IUD', 'Mirena IUD', 'NuvaRing', 'Xulane Patch', 'Depo'].includes(p.service)),
      includeOralDropdown: true
    },
    {
      title: null,
      items: procedures.filter(p => ['Doxycycline', 'Rocephin (ceftriaxone inj)', 'Bicillin L-A', 'Azithromycin', 'Acyclovir', 'Metronidazole', 'Fluconazole', 'Ibuprofen', 'Clindamycin Cream', 'Clotrimazole Cream'].includes(p.service))
    }
  ];

  chunks.forEach(({ items, includeOralDropdown }) => {
    const section = document.createElement('div');
    section.className = 'service-section';
    items.forEach(item => addServiceCheckbox(section, item));

    if (includeOralDropdown) {
      const oralOptions = procedures.filter(p =>
        Array.isArray(p.keywords) &&
        (p.keywords.some(k => k.toLowerCase().includes('pill')) ||
         p.keywords.some(k => k.toLowerCase().includes('pop')))
      );

      const dropdownLabel = document.createElement('label');
      dropdownLabel.textContent = 'Oral Contraceptives:';
      const select = document.createElement('select');
      select.innerHTML = '<option value="">-- Select Pill --</option>';

      oralOptions.forEach(pill => {
        const option = document.createElement('option');
        option.value = pill.service;
        option.textContent = pill.service;
        select.appendChild(option);
      });

      select.addEventListener('change', () => {
        const selected = oralOptions.find(p => p.service === select.value);
        if (selected) {
          const price = (selected.fullprice || 0) * getSelectedPercent();
          const quantity = isMultipleAllowed(selected.service) ? parseInt(prompt('Enter quantity (1–13):', 1), 10) : 1;
          if (!isNaN(quantity) && quantity > 0 && quantity <= 13) {
            addToReceipt(selected.service, price * quantity, quantity);
          }
        }
        select.selectedIndex = 0;
      });

      section.appendChild(dropdownLabel);
      section.appendChild(select);
    }

    container.appendChild(section);
  });

  document.getElementById('services-list').appendChild(container);
}

function addServiceCheckbox(section, item) {
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
}

function handleServiceSelection(service, isChecked) {
  const price = (service.fullprice || 0) * getSelectedPercent();
  if (isChecked) {
    if (isMultipleAllowed(service.service)) {
      const quantity = parseInt(prompt('Enter quantity (1–13):', 1), 10);
      if (!isNaN(quantity) && quantity > 0 && quantity <= 13) {
        addToReceipt(service.service, price * quantity, quantity);
      }
    } else {
      addToReceipt(service.service, price);
    }
  } else {
    removeFromReceipt(service.service);
  }
}

function addToReceipt(serviceName, price, quantity = 1) {
  const receiptList = document.getElementById('receipt-items');
  const listItem = document.createElement('div');
  listItem.className = 'receipt-item';

  const itemText = document.createElement('span');
  itemText.textContent = `${serviceName} x${quantity}: $${price.toFixed(2)}`;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.className = 'remove-button';
  removeBtn.onclick = () => removeFromReceipt(serviceName);

  listItem.appendChild(itemText);
  listItem.appendChild(removeBtn);
  receiptList.appendChild(listItem);

  selectedItems[serviceName] = { price, quantity, element: listItem };
  updateGrandTotal();
}

function removeFromReceipt(serviceName) {
  if (selectedItems[serviceName]) {
    selectedItems[serviceName].element.remove();
    delete selectedItems[serviceName];
    updateGrandTotal();
    const checkbox = document.querySelector(`#${serviceName.replace(/\s+/g, '-').toLowerCase()}`);
    if (checkbox) checkbox.checked = false;
  }
}

function updateGrandTotal() {
  grandTotal = Object.values(selectedItems).reduce((sum, item) => sum + item.price, 0);
  document.getElementById('grand-total').textContent = `$${grandTotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  initializePriceList();

  document.getElementById('percentSelector').addEventListener('change', () => {
    Object.entries(selectedItems).forEach(([service, item]) => {
      const procedure = procedures.find(p => p.service === service);
      if (procedure) {
        const newPrice = (procedure.fullprice || 0) * getSelectedPercent() * item.quantity;
        item.price = newPrice;
        item.element.querySelector('span').textContent = `${service} x${item.quantity}: $${newPrice.toFixed(2)}`;
      }
    });
    updateGrandTotal();
  });

  document.getElementById('copy-receipt').addEventListener('click', () => {
    const percent = document.getElementById('percentSelector').value;
    const lines = Object.entries(selectedItems).map(([service, item]) => `${service} x${item.quantity}: $${item.price.toFixed(2)}`);
    const receiptText = `=== Family Health Education Services ===\nDate: ${new Date().toLocaleDateString()}\nFee Percentage: ${percent}%\n\nServices:\n${lines.join('\n')}\n\nTotal: $${grandTotal.toFixed(2)}`;
    navigator.clipboard.writeText(receiptText)
      .then(() => alert('Receipt copied to clipboard!'))
      .catch(() => alert('Failed to copy receipt.'));
  });

  document.getElementById('percentSelector').value = 100;
});
