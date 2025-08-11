
<script type="module">
import Scale from './scale.js';
const coverageChart = Scale.coverageChart;
const awcChart = Scale.awcChart;
const coverageLevels = ["0%", "25%", "50%", "75%", "100%"];

/* ---------- Helpers ---------- */
function currency(n){ return `$${Number(n).toLocaleString(undefined,{maximumFractionDigits:0})}`; }

/* ---------- Coverage & AWC logic ---------- */
function determineCoverageLevel(householdSize, yearlyIncome){
  if (!coverageChart[householdSize]) return "N/A";
  const brackets = coverageChart[householdSize];
  for (let i=0;i<brackets.length;i++){
    if (yearlyIncome <= brackets[i]) return coverageLevels[i];
  }
  return "100%";
}
function determineAWCQualification(householdSize, yearlyIncome){
  if (!awcChart[householdSize]) return "N/A";
  return (yearlyIncome <= awcChart[householdSize]) ? "Yes" : "No";
}

/* ---------- Income calcs ---------- */
function calculateIncome(type){
  let paystub1, paystub2, verbalHours, verbalRate, total, average, annual;
  switch(type){
    case 'biweekly':
      paystub1 = parseFloat(document.getElementById('paystub1').value)||0;
      paystub2 = parseFloat(document.getElementById('paystub2').value)||0;
      total = paystub1 + paystub2; average = total/2; annual = average*26; break;
    case 'weekly':
      paystub1 = parseFloat(document.getElementById('weeklyPaystub1').value)||0;
      paystub2 = parseFloat(document.getElementById('weeklyPaystub2').value)||0;
      total = paystub1 + paystub2; average = total/2; annual = average*52; break;
    case 'twiceMonth':
      paystub1 = parseFloat(document.getElementById('twiceMonthPaystub1').value)||0;
      paystub2 = parseFloat(document.getElementById('twiceMonthPaystub2').value)||0;
      total = paystub1 + paystub2; average = total/2; annual = average*24; break;
    case 'verbal':
      verbalHours = parseFloat(document.getElementById('verbalHours').value)||0;
      verbalRate = parseFloat(document.getElementById('verbalRate').value)||0;
      total = verbalHours*verbalRate; average = total; annual = total*52; break;
    default: return;
  }
  document.getElementById(`${type}Total`).textContent   = total.toFixed(2);
  document.getElementById(`${type}Average`).textContent = average.toFixed(2);
  document.getElementById(`${type}Annual`).textContent  = annual.toFixed(2);
  calculateGrandTotal();
}
window.calculateIncome = calculateIncome; // expose for inline onchange

/* ---------- Grand total ---------- */
function calculateGrandTotal(){
  const biweeklyAnnual    = parseFloat(document.getElementById('biweeklyAnnual').textContent)||0;
  const weeklyAnnual      = parseFloat(document.getElementById('weeklyAnnual').textContent)||0;
  const twiceMonthAnnual  = parseFloat(document.getElementById('twiceMonthAnnual').textContent)||0;
  const verbalAnnual      = parseFloat(document.getElementById('verbalAnnual').textContent)||0;

  const weeklyTips    = parseFloat(document.getElementById('AnnualTips').value)||0;
  const annualTips    = weeklyTips*52;
  const otherMonthly  = parseFloat(document.getElementById('AnnualOtherMonthly').value)||0;
  const annualMonthly = otherMonthly*12;
  const otherAnnual   = parseFloat(document.getElementById('OtherAnnual').value)||0;

  let grandTotal = biweeklyAnnual + weeklyAnnual + twiceMonthAnnual + verbalAnnual + annualTips + annualMonthly + otherAnnual;

  // Add incomes from household members
  const memberDivs = document.querySelectorAll('#householdMembersContainer > div');
  memberDivs.forEach(div=>{
    const incomeInput = div.querySelector('input[name^="memberIncome"]');
    const freqSelect  = div.querySelector('select[name^="memberFrequency"]');
    if (incomeInput && freqSelect && incomeInput.value){
      const amount = parseFloat(incomeInput.value)||0;
      let annual = 0;
      switch (freqSelect.value){
        case 'weekly': annual=amount*52; break;
        case 'biweekly': annual=amount*26; break;
        case 'monthly': annual=amount*12; break;
        case 'annually': annual=amount; break;
      }
      grandTotal += annual;
    }
  });

  document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
  updateHouseholdIncome();
}

/* ---------- Household display ---------- */
function updateHouseholdIncome(){
  const householdSize = parseInt(document.getElementById('householdSize').value)||0;
  const yearlyIncome  = parseFloat(document.getElementById('grandTotal').textContent)||0;

  const coverageLevel = determineCoverageLevel(householdSize, yearlyIncome);
  document.getElementById('coverageLevel').textContent = coverageLevel;

  const awcQualification = determineAWCQualification(householdSize, yearlyIncome);
  document.getElementById('awcQualification').textContent = awcQualification;
}

function updateHouseholdMemberFields(){
  const container = document.getElementById('householdMembersContainer');
  const size = parseInt(document.getElementById('householdSize').value||1);
  container.innerHTML = '';
  if (size <= 1) return;

  for (let i=2;i<=size;i++){
    const wrapper = document.createElement('div');
    wrapper.style.display='flex';
    wrapper.style.flexDirection='column';
    wrapper.style.gap='10px';
    wrapper.style.marginBottom='10px';

    const topRow = document.createElement('div');
    topRow.style.display='flex'; topRow.style.gap='10px';

    const select = document.createElement('select');
    select.name = `relationship${i}`;
    select.innerHTML = `
      <option value="">Select Relationship</option>
      <option>Child</option><option>Grandchild</option><option>Significant Other</option>
      <option>Fiancé</option><option>Spouse</option><option>Sibling</option>
      <option>Parent</option><option>Grandparent</option><option>Friend</option>
      <option>Roommate</option><option>Other</option>`;
    select.style.flex='1'; select.style.padding='8px'; select.style.borderRadius='10px';

    const input = document.createElement('input');
    input.type='text'; input.name=`name${i}`; input.placeholder=`Name of person ${i}`;
    input.style.flex='2'; input.style.padding='8px'; input.style.borderRadius='10px';

    const plusBtn = document.createElement('button');
    plusBtn.type='button'; plusBtn.textContent='+';
    plusBtn.style.flex='0 0 40px'; plusBtn.style.borderRadius='10px';
    plusBtn.style.backgroundColor='#f8c9f9'; plusBtn.style.border='2px solid #f8c9f9';
    plusBtn.style.width='40px'; plusBtn.style.height='40px';

    topRow.appendChild(select); topRow.appendChild(input); topRow.appendChild(plusBtn);

    const incomeSection = document.createElement('div');
    incomeSection.style.display='none'; incomeSection.style.marginTop='10px';
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
    incomeSection.querySelectorAll('input, select').forEach(el=>{ el.style.marginLeft='10px'; el.style.marginRight='20px'; });

    const incomeInput = incomeSection.querySelector(`input[name="memberIncome${i}"]`);
    const freqSelect  = incomeSection.querySelector(`select[name="memberFrequency${i}"]`);
    incomeInput.addEventListener('input', calculateGrandTotal);
    freqSelect.addEventListener('change', calculateGrandTotal);

    plusBtn.addEventListener('click', ()=>{
      incomeSection.style.display = (incomeSection.style.display==='none') ? 'block' : 'none';
      calculateGrandTotal();
    });

    wrapper.appendChild(topRow);
    wrapper.appendChild(incomeSection);
    container.appendChild(wrapper);
  }
}

/* ---------- Modals ---------- */
function openModal(id){ const el=document.getElementById(id); if(!el) return; el.style.display='flex'; el.setAttribute('aria-hidden','false'); }
function closeModal(id){ const el=document.getElementById(id); if(!el) return; el.style.display='none'; el.setAttribute('aria-hidden','true'); }

document.getElementById('triggerModal1').addEventListener('click', ()=>openModal('modalOverlay1'));
document.getElementById('triggerModal2').addEventListener('click', ()=>openModal('modalOverlay2'));

['modalOverlay1','modalOverlay2'].forEach(id=>{
  const overlay=document.getElementById(id);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(id); });
  overlay.querySelector('.modal-close').addEventListener('click', ()=>closeModal(id));
});

/* ---------- Coverage table render ---------- */
function renderCoverageChart(selectedSize){
  const tbody = document.getElementById('coverageTableBody');
  if(!tbody) return;
  tbody.innerHTML='';

  Object.keys(coverageChart).sort((a,b)=>Number(a)-Number(b)).forEach(size=>{
    const vals = coverageChart[size]; // [0,25,50,75,100]
    const tr = document.createElement('tr');
    if (Number(size)===Number(selectedSize)) tr.classList.add('coverage-row--highlight');
    tr.innerHTML = `
      <td>${size}</td>
      <td>${currency(vals[0])}</td>
      <td>${currency(vals[1])}</td>
      <td>${currency(vals[2])}</td>
      <td>${currency(vals[3])}</td>
      <td>${currency(vals[4])}</td>`;
    tbody.appendChild(tr);
  });
}

/* ---------- Copy to clipboard ---------- */
function copyIncomeInfo(){
  const householdSize   = document.getElementById('householdSize').value || "1";
  const yearlyIncome    = document.getElementById('grandTotal').textContent || "0";
  const coverageLevel   = document.getElementById('coverageLevel').textContent || "N/A";
  const awcQualification= document.getElementById('awcQualification').textContent || "N/A";
  const workingAt       = document.getElementById('workingAt').value || "Unemployed";
  const incomeType      = document.getElementById('incomeType').value;

  if(!incomeType){ alert("❌ Please select an Income Type before copying."); return; }

  let infoToCopy = `Income Type: ${incomeType}\nWorking @: ${workingAt}\nPeople in Household: ${householdSize}\n\n`;
  const members = document.getElementById('householdMembersContainer').children;
  infoToCopy += "Members of Household (besides client):\n";
  Array.from(members).forEach(member=>{
    const relationship = member.querySelector('select[name^="relationship"]')?.value || "N/A";
    const name = member.querySelector('input[name^="name"]')?.value || "N/A";
    const income = member.querySelector('input[name^="memberIncome"]')?.value || "";
    const freq = member.querySelector('select[name^="memberFrequency"]')?.value || "";
    infoToCopy += `- ${relationship}: ${name}\n`;
    if(income){
      const val = parseFloat(income); let annual=val;
      switch((freq||'').toLowerCase()){
        case 'weekly': annual=val*52; break;
        case 'biweekly': annual=val*26; break;
        case 'monthly': annual=val*12; break;
      }
      const formattedVal = `$${val.toLocaleString()}`;
      const formattedAnnual = `$${annual.toLocaleString(undefined,{minimumFractionDigits:2})}`;
      infoToCopy += (freq.toLowerCase()==='annually')
        ? `   • Income: ${formattedAnnual} annually\n`
        : `   • Income: ${formattedVal} ${freq} (Annual: ${formattedAnnual})\n`;
    }
  });
  infoToCopy += "\n";

  // Include sections only if non-zero
  const pushIf = (label, totalId, parts)=> {
    const annual = parseFloat(document.getElementById(totalId).textContent)||0;
    if(!annual) return;
    infoToCopy += `${label}\n${parts().join('\n')}\n\n`;
  };
  pushIf("Biweekly Income:", "biweeklyAnnual", ()=>[
    `  Paystub 1: $${document.getElementById('paystub1').value||"0"}`,
    `  Paystub 2: $${document.getElementById('paystub2').value||"0"}`,
    `  Total:     $${document.getElementById('biweeklyTotal').textContent||"0"}`,
    `  Average:   $${Number(document.getElementById('biweeklyAverage').textContent||0).toFixed(2)}`,
    `  Annual:    $${Number(document.getElementById('biweeklyAnnual').textContent||0).toFixed(2)}`
  ]);
  pushIf("Weekly Income:", "weeklyAnnual", ()=>[
    `  Paystub 1: $${document.getElementById('weeklyPaystub1').value||"0"}`,
    `  Paystub 2: $${document.getElementById('weeklyPaystub2').value||"0"}`,
    `  Total:     $${document.getElementById('weeklyTotal').textContent||"0"}`,
    `  Average:   $${Number(document.getElementById('weeklyAverage').textContent||0).toFixed(2)}`,
    `  Annual:    $${Number(document.getElementById('weeklyAnnual').textContent||0).toFixed(2)}`
  ]);
  pushIf("Twice a Month Income:", "twiceMonthAnnual", ()=>[
    `  Paystub 1: $${document.getElementById('twiceMonthPaystub1').value||"0"}`,
    `  Paystub 2: $${document.getElementById('twiceMonthPaystub2').value||"0"}`,
    `  Total:     $${document.getElementById('twiceMonthTotal').textContent||"0"}`,
    `  Average:   $${Number(document.getElementById('twiceMonthAverage').textContent||0).toFixed(2)}`,
    `  Annual:    $${Number(document.getElementById('twiceMonthAnnual').textContent||0).toFixed(2)}`
  ]);
  pushIf("Weekly Verbal Income:", "verbalAnnual", ()=>[
    `  Hours Worked: ${document.getElementById('verbalHours').value||"0"}`,
    `  Hourly Rate:  $${document.getElementById('verbalRate').value||"0"}`,
    `  Total:        $${document.getElementById('verbalTotal').textContent||"0"}`,
    `  Average:      $${Number(document.getElementById('verbalAverage').textContent||0).toFixed(2)}`,
    `  Annual:       $${Number(document.getElementById('verbalAnnual').textContent||0).toFixed(2)}`
  ]);

  const tips = parseFloat(document.getElementById('AnnualTips').value)||0;
  const otherMonthly = parseFloat(document.getElementById('AnnualOtherMonthly').value)||0;
  const otherAnnual  = parseFloat(document.getElementById('OtherAnnual').value)||0;
  if (tips||otherMonthly||otherAnnual){
    infoToCopy += "Extra Income:\n";
    if(tips) infoToCopy += `  Tips per week: $${tips} (Annualized: $${(tips*52).toFixed(2)})\n`;
    if(otherMonthly) infoToCopy += `  Other Income per Month: $${otherMonthly} (Annualized: $${(otherMonthly*12).toFixed(2)})\n`;
    if(otherAnnual) infoToCopy += `  Other Annual Income: $${otherAnnual}\n`;
    infoToCopy += "\n";
  }

  infoToCopy += `Yearly Income: $${yearlyIncome}\nClient Pay: ${coverageLevel}\nAWC! qualification: ${awcQualification} -If Applicable\nInsurance:\n${new Date().toLocaleString([], { hour:'2-digit', minute:'2-digit', year:'numeric', month:'2-digit', day:'2-digit' })}\nStaff: H\n`;

  const notes = document.getElementById('userNotes').value.trim();
  if(notes){ infoToCopy += `\nAdditional Notes:\n${notes}\n`; }

  navigator.clipboard.writeText(infoToCopy)
    .then(()=>alert("Household info copied to clipboard!"))
    .catch(err=>{ console.error("Failed to copy:", err); alert("Unable to copy info."); });
}
window.copyIncomeInfo = copyIncomeInfo;

/* ---------- Init ---------- */
calculateGrandTotal();
renderCoverageChart(document.getElementById('householdSize').value);

document.getElementById('householdSize').addEventListener('change', ()=>{
  updateHouseholdMemberFields();
  renderCoverageChart(document.getElementById('householdSize').value);
});

document.querySelectorAll('.toggleNotes').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const notes=document.getElementById('notesContainer');
    notes.style.display = (notes.style.display==='none' || notes.style.display==='') ? 'block' : 'none';
  });
});
</script>