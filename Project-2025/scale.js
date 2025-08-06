class scale{
    getSelectedPercent() {
        const percentSelect = document.getElementById('percent-select');
        const selectedValue = percentSelect.value;
        return parseFloat(selectedValue) / 100;
    }   

    /***************************************************
     * 1) Coverage Chart & Coverage Level Logic
     ***************************************************/
    coverageChart = {
      1: [15650, 23474, 31300, 39124, 39125],
      2: [21150, 31724, 42299, 52874, 52875],
      3: [26650, 39974, 53299, 66624, 66625],
      4: [32150, 48224, 64299, 80374, 80375],
      5: [37650, 56474, 75299, 94124, 94125],
      6: [43150, 64724, 86299, 107874, 107875],
      7: [48650, 72974, 97299, 121624, 121625],
      8: [54150, 81224, 108299, 135374, 135375],
      9: [59650, 89474, 119299, 149124, 149125],
      10: [65150, 97724, 130299, 162874, 162875],
      11: [70650, 105974, 141299, 176624, 176625],
      12: [76150, 114224, 152299, 190374, 190375],
      13: [81650, 122474, 163299, 204124, 204125],
      14: [87150, 130724, 174299, 217874, 217875],
      15: [92650, 138974, 185299, 231624, 231625]
    };
    coverageLevels = ["0%", "25%", "50%", "75%", "100%"];
    determineCoverageLevel(householdSize, yearlyIncome) {
      if (!coverageChart[householdSize]) {
        return "N/A";
      }
      const incomeBrackets = coverageChart[householdSize];
      for (let i = 0; i < incomeBrackets.length; i++) {
        if (yearlyIncome <= incomeBrackets[i]) {
          return coverageLevels[i];
        }
      }
      return "100%";
    }
    /***************************************************
     * 2) AWC! Qualification Logic
     ***************************************************/
    awcChart = {
      1: 39125,
      2: 52875,
      3: 66625,
      4: 80375,
      5: 94125,
      6: 107875,
      7: 121625,
      8: 135375,
      9: 149125,
      10: 162875,
      11: 176625,
      12: 190375,
      13: 204125,
      14: 217875,
      15: 231625
    };
    determineAWCQualification(householdSize, yearlyIncome) {
      if (!awcChart[householdSize]) {
        return "N/A";
      }
      return (yearlyIncome <= awcChart[householdSize]) ? "Yes" : "No";
    }
    /***************************************************
     * 3) Income Calculations (biweekly, weekly, etc.)
     ***************************************************/
    calculateIncome(type) {
      let paystub1, paystub2, verbalHours, verbalRate, total, average, annual;
      switch (type) {
        case 'biweekly':
          paystub1 = parseFloat(document.getElementById('paystub1').value) || 0;
          paystub2 = parseFloat(document.getElementById('paystub2').value) || 0;
          total = paystub1 + paystub2;
          average = total / 2;
          annual = average * 26;
          break;
        case 'weekly':
          paystub1 = parseFloat(document.getElementById('weeklyPaystub1').value) || 0;
          paystub2 = parseFloat(document.getElementById('weeklyPaystub2').value) || 0;
          total = paystub1 + paystub2;
          average = total / 2;
          annual = average * 52;
          break;
        case 'twiceMonth':
          paystub1 = parseFloat(document.getElementById('twiceMonthPaystub1').value) || 0;
          paystub2 = parseFloat(document.getElementById('twiceMonthPaystub2').value) || 0;
          total = paystub1 + paystub2;
          average = total / 2;
          annual = average * 24;
          break;
        case 'verbal':
          verbalHours = parseFloat(document.getElementById('verbalHours').value) || 0;
          verbalRate = parseFloat(document.getElementById('verbalRate').value) || 0;
          total = verbalHours * verbalRate;
          average = total;
          annual = total * 52;
          break;
        default:
          return;
      }
      document.getElementById(`${type}Total`).textContent = total.toFixed(2);
      document.getElementById(`${type}Average`).textContent = average.toFixed(2);
      document.getElementById(`${type}Annual`).textContent = annual.toFixed(2);

      // Update the grand total
      calculateGrandTotal();
    }
    /***************************************************
     * 4) Summation of All Incomes
     ***************************************************/
    calculateGrandTotal() {
  const biweeklyAnnual = parseFloat(document.getElementById('biweeklyAnnual').textContent) || 0;
  const weeklyAnnual = parseFloat(document.getElementById('weeklyAnnual').textContent) || 0;
  const twiceMonthAnnual = parseFloat(document.getElementById('twiceMonthAnnual').textContent) || 0;
  const verbalAnnual = parseFloat(document.getElementById('verbalAnnual').textContent) || 0;

  const weeklyTips = parseFloat(document.getElementById('AnnualTips').value) || 0;
  const annualTips = weeklyTips * 52;

  const otherMonthlyIncome = parseFloat(document.getElementById('AnnualOtherMonthly').value) || 0;
  const annualOtherMonthlyIncome = otherMonthlyIncome * 12;

  const otherAnnualIncome = parseFloat(document.getElementById('OtherAnnual').value) || 0;

  // ✅ Use 'let' so we can add to it later
  let grandTotal = biweeklyAnnual + weeklyAnnual + twiceMonthAnnual + verbalAnnual + annualTips + annualOtherMonthlyIncome + otherAnnualIncome;

  // ✅ Add incomes from household members
  const memberDivs = document.querySelectorAll('#householdMembersContainer > div');
  memberDivs.forEach((div, index) => {
    const incomeInput = div.querySelector('input[name^="memberIncome"]');
const freqSelect = div.querySelector('select[name^="memberFrequency"]');

    if (incomeInput && freqSelect && incomeInput.value) {
      const amount = parseFloat(incomeInput.value) || 0;
      let annual = 0;
      switch (freqSelect.value) {
        case 'weekly': annual = amount * 52; break;
        case 'biweekly': annual = amount * 26; break;
        case 'monthly': annual = amount * 12; break;
        case 'annually': annual = amount; break;
      }
      grandTotal += annual;
    }
  });

  document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);

  // ✅ Trigger updates
  updateHouseholdIncome();
}

    /***************************************************
     * 5) Household Info (Coverage + AWC) Display
     ***************************************************/
    updateHouseholdIncome() {
  const householdSize = parseInt(document.getElementById('householdSize').value) || 0;
  const yearlyIncome = parseFloat(document.getElementById('grandTotal').textContent) || 0;

  const coverageLevel = determineCoverageLevel(householdSize, yearlyIncome);
  document.getElementById('coverageLevel').textContent = coverageLevel;

  const awcQualification = determineAWCQualification(householdSize, yearlyIncome);
  document.getElementById('awcQualification').textContent = awcQualification;

  // ✅ Do NOT call updateHouseholdMemberFields() here to avoid infinite loop
}
 updateHouseholdMemberFields() {
  const container = document.getElementById('householdMembersContainer');
  const size = parseInt(document.getElementById('householdSize').value || 1);

  container.innerHTML = '';
  if (size <= 1) return;

  for (let i = 2; i <= size; i++) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '10px';
    wrapper.style.marginBottom = '10px';

    const topRow = document.createElement('div');
    topRow.style.display = 'flex';
    topRow.style.gap = '10px';

    const select = document.createElement('select');
    select.name = `relationship${i}`;
    select.innerHTML = `
      <option value="">Select Relationship</option>
      <option>Child</option>
      <option>Grandchild</option>
      <option>Significant Other</option>
      <option>Fiancé</option>
      <option>Spouse</option>
      <option>Sibling</option>
      <option>Parent</option>      
      <option>Grandparent</option>
      <option>Friend</option>
      <option>Roommate</option>
      <option>Other</option>
    `;
    select.style.flex = '1';
    select.style.padding = '8px';
    select.style.borderRadius = '10px';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `name${i}`;
    input.placeholder = `Name of person ${i}`;
    input.style.flex = '2';
    input.style.padding = '8px';
    input.style.borderRadius = '10px';

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.textContent = '+';
    plusBtn.style.flex = '0 0 40px';
    plusBtn.style.borderRadius = '10px';
    plusBtn.style.backgroundColor = '#f8c9f9';
    plusBtn.style.border = '2px solid #f8c9f9';
    plusBtn.style.width = '130px';
    plusBtn.style.height = '40px';


    topRow.appendChild(select);
    topRow.appendChild(input);
    topRow.appendChild(plusBtn);

    const incomeSection = document.createElement('div');
    incomeSection.style.display = 'none';
    incomeSection.style.marginTop = '10px';
    incomeSection.innerHTML = `
      <label>Income Amount: <input type="number" step="0.01" name="memberIncome${i}" /></label>
      <label>Frequency:
        <select name="memberFrequency${i}">
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
      </label>
    `;
// Add event listeners to recalculate when user changes inputs
const incomeInput = incomeSection.querySelector(`input[name="memberIncome${i}"]`);
const freqSelect = incomeSection.querySelector(`select[name="memberFrequency${i}"]`);

incomeInput.addEventListener('input', calculateGrandTotal);
freqSelect.addEventListener('change', calculateGrandTotal);

    incomeSection.querySelectorAll('input, select').forEach(el => {
      el.style.marginLeft = '10px';
      el.style.marginRight = '20px';
    });

    plusBtn.addEventListener('click', () => {
  incomeSection.style.display = (incomeSection.style.display === 'none') ? 'block' : 'none';
  calculateGrandTotal(); // Recalculate after revealing the field
});


    wrapper.appendChild(topRow);
    wrapper.appendChild(incomeSection);
    container.appendChild(wrapper);
  }
}

// Modal 1 functionality
 triggerModal1 = document.getElementById('triggerModal1');
 modalOverlay1 = document.getElementById('modalOverlay1');

triggerModal1.addEventListener('click', function() {
  modalOverlay1.style.display = 'flex';
});

modalOverlay1.addEventListener('click', function(e) {
  // Close if clicking outside the modal content
  if (e.target === modalOverlay1) {
    modalOverlay1.style.display = 'none';
  }
});

// Modal 2 functionality
 triggerModal2 = document.getElementById('triggerModal2');
 modalOverlay2 = document.getElementById('modalOverlay2');

triggerModal2.addEventListener('click', function() {
  modalOverlay2.style.display = 'flex';
});

modalOverlay2.addEventListener('click', function(e) {
  // Close if clicking outside the modal content
  if (e.target === modalOverlay2) {
    modalOverlay2.style.display = 'none';
  }
});

    /***************************************************
     * 6) Copy Button Function
     ***************************************************/
    copyIncomeInfo() {
   householdSize = document.getElementById('householdSize').value || "1";
  const yearlyIncome = document.getElementById('grandTotal').textContent || "0";
  const coverageLevel = document.getElementById('coverageLevel').textContent || "N/A";
  const awcQualification = document.getElementById('awcQualification').textContent || "N/A";
  const workingAt = document.getElementById('workingAt').value || "Unemployed";

  const incomeType = document.getElementById('incomeType').value;
  if (!incomeType) {
    alert("❌ Please select an Income Type before copying.");
    return;
  }

  let infoToCopy = `Income Type: ${incomeType}\nWorking @: ${workingAt}\nPeople in Household: ${householdSize}\n\n`;

  const membersSection = document.getElementById('householdMembersContainer');
const members = membersSection.children; // ✅ Only top-level divs

infoToCopy += "\n";
infoToCopy += "Members of Household (besides client):\n";
Array.from(members).forEach((member) => {
  const relationship = member.querySelector('select[name^="relationship"]')?.value || "N/A";
  const name = member.querySelector('input[name^="name"]')?.value || "N/A";
  const income = member.querySelector('input[name^="memberIncome"]')?.value || "";
  const freq = member.querySelector('select[name^="memberFrequency"]')?.value || "";

  infoToCopy += `- ${relationship}: ${name}\n`;

  if (income) {
    const val = parseFloat(income);
    let annual = 0;
    switch (freq.toLowerCase()) {
      case 'weekly': annual = val * 52; break;
      case 'biweekly': annual = val * 26; break;
      case 'monthly': annual = val * 12; break;
      case 'annually': annual = val; break;
      default: annual = val;
    }

    const formattedVal = `$${val.toLocaleString()}`;
    const formattedAnnual = `$${annual.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    if (freq.toLowerCase() === 'annually') {
      infoToCopy += `   • Income: ${formattedAnnual} annually\n`;
    } else {
      infoToCopy += `   • Income: ${formattedVal} ${freq} (Annual: ${formattedAnnual})\n`;
    }
  }
});
infoToCopy += "\n";
  // Biweekly Income
  const biweeklyAnnual = parseFloat(document.getElementById('biweeklyAnnual').textContent) || 0;
  if (biweeklyAnnual !== 0) {
    const paystub1 = document.getElementById('paystub1').value || "0";
    const paystub2 = document.getElementById('paystub2').value || "0";
    const biweeklyTotal = document.getElementById('biweeklyTotal').textContent || "0";
    const biweeklyAverage = parseFloat(document.getElementById('biweeklyAverage').textContent) || 0;
    infoToCopy += 
`Biweekly Income:
  Paystub 1: $${paystub1}
  Paystub 2: $${paystub2}
  Total:     $${biweeklyTotal}
  Average:   $${biweeklyAverage.toFixed(2)}
  Annual:    $${biweeklyAnnual.toFixed(2)}

`;
  }

  // Weekly Income
  const weeklyAnnual = parseFloat(document.getElementById('weeklyAnnual').textContent) || 0;
  if (weeklyAnnual !== 0) {
    const weeklyPaystub1 = document.getElementById('weeklyPaystub1').value || "0";
    const weeklyPaystub2 = document.getElementById('weeklyPaystub2').value || "0";
    const weeklyTotal = document.getElementById('weeklyTotal').textContent || "0";
    const weeklyAverage = parseFloat(document.getElementById('weeklyAverage').textContent) || 0;
    infoToCopy += 
`Weekly Income:
  Paystub 1: $${weeklyPaystub1}
  Paystub 2: $${weeklyPaystub2}
  Total:     $${weeklyTotal}
  Average:   $${weeklyAverage.toFixed(2)}
  Annual:    $${weeklyAnnual.toFixed(2)}

`;
  }

  // Twice a Month Income
  const twiceMonthAnnual = parseFloat(document.getElementById('twiceMonthAnnual').textContent) || 0;
  if (twiceMonthAnnual !== 0) {
    const twiceMonthPaystub1 = document.getElementById('twiceMonthPaystub1').value || "0";
    const twiceMonthPaystub2 = document.getElementById('twiceMonthPaystub2').value || "0";
    const twiceMonthTotal = document.getElementById('twiceMonthTotal').textContent || "0";
    const twiceMonthAverage = parseFloat(document.getElementById('twiceMonthAverage').textContent) || 0;
    infoToCopy += 
`Twice a Month Income:
  Paystub 1: $${twiceMonthPaystub1}
  Paystub 2: $${twiceMonthPaystub2}
  Total:     $${twiceMonthTotal}
  Average:   $${twiceMonthAverage.toFixed(2)}
  Annual:    $${twiceMonthAnnual.toFixed(2)}

`;
  }

  // Weekly Verbal Income
  const verbalAnnual = parseFloat(document.getElementById('verbalAnnual').textContent) || 0;
  if (verbalAnnual !== 0) {
    const verbalHours = document.getElementById('verbalHours').value || "0";
    const verbalRate = document.getElementById('verbalRate').value || "0";
    const verbalTotal = document.getElementById('verbalTotal').textContent || "0";
    const verbalAverage = parseFloat(document.getElementById('verbalAverage').textContent) || 0;
    infoToCopy += 
`Weekly Verbal Income:
  Hours Worked: ${verbalHours}
  Hourly Rate:  $${verbalRate}
  Total:        $${verbalTotal}
  Average:      $${verbalAverage.toFixed(2)}
  Annual:       $${verbalAnnual.toFixed(2)}

`;
  }

  // Extra Income Section
  const tipsValue = document.getElementById('AnnualTips').value || "0";
  const tips = parseFloat(tipsValue) || 0;
  const otherMonthlyValue = document.getElementById('AnnualOtherMonthly').value || "0";
  const otherMonthly = parseFloat(otherMonthlyValue) || 0;
  const otherAnnualValue = document.getElementById('OtherAnnual').value || "0";
  const otherAnnual = parseFloat(otherAnnualValue) || 0;

  if (tips !== 0 || otherMonthly !== 0 || otherAnnual !== 0) {
    infoToCopy += "Extra Income:\n";
    if (tips !== 0) {
      let annualTips = tips * 52;
      infoToCopy += `  Tips per week: $${tips} (Annualized: $${annualTips.toFixed(2)})\n`;
    }
    if (otherMonthly !== 0) {
      let annualOtherMonthly = otherMonthly * 12;
      infoToCopy += `  Other Income per Month: $${otherMonthly} (Annualized: $${annualOtherMonthly.toFixed(2)})\n`;
    }
    if (otherAnnual !== 0) {
      infoToCopy += `  Other Annual Income: $${otherAnnual}\n`;
    }
  } // Close the "Extra Income Section" block properly

  infoToCopy += 
    `Yearly Income: $${yearlyIncome}\n` +
    `Client Pay: ${coverageLevel}\n` +
    `AWC! qualification: ${awcQualification} -If Applicable\n` +
    `Insurance:\n` +
    `${new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })}\n` +
    `Staff: H\n`;
    const notes = document.getElementById('userNotes').value.trim();
if (notes) {
  infoToCopy += `\nAdditional Notes:\n${notes}\n`;
}

  navigator.clipboard.writeText(infoToCopy)
    .then(() => alert("Household info copied to clipboard!"))
    .catch(err => {
      console.error("Failed to copy text:", err);
      alert("Unable to copy info.");
    });
} // ✅ Correct closing of copyIncomeInfo()

    // Initialize everything on page load
    calculateGrandTotal();
document.getElementById('householdSize').addEventListener('change', () => {
  updateHouseholdMemberFields();
});

document.querySelectorAll('.toggleNotes').forEach(button => {
    button.addEventListener('click', () => {
        const notes = document.getElementById('notesContainer');
        notes.style.display = (notes.style.display === 'none' || notes.style.display === '') ? 'block' : 'none';
    });
});

}   
    export default scale;


