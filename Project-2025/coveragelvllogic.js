import Scale from './scale.js';
const { coverageChart, awcChart } = Scale;

const coverageLevels = ["0%", "25%", "50%", "75%", "100%"];
const $ = (id) => document.getElementById(id);
const n = (v) => Number(v) || 0;
const money = (v) => `$${Number(v).toLocaleString(undefined,{maximumFractionDigits:0})}`;

/* ---------- Coverage & AWC logic ---------- */
const determineCoverageLevel = (householdSize, yearlyIncome) => {
  const row = coverageChart[householdSize];
  if (!row) return "N/A";
  for (let i = 0; i < row.length; i++) {
    if (yearlyIncome <= row[i]) return coverageLevels[i];
  }
  return "100%";
};
const determineAWCQualification = (householdSize, yearlyIncome) =>
  !awcChart[householdSize] ? "N/A" : (yearlyIncome <= awcChart[householdSize] ? "Yes" : "No");

/* ---------- Income calcs ---------- */
function calculateIncome(type){
  let total=0, avg=0, annual=0;
  if (type === 'biweekly'){
    const a=n($('paystub1').value), b=n($('paystub2').value);
    total=a+b; avg=total/2; annual=avg*26;
  } else if (type === 'weekly'){
    const a=n($('weeklyPaystub1').value), b=n($('weeklyPaystub2').value);
    total=a+b; avg=total/2; annual=avg*52;
  } else if (type === 'twiceMonth'){
    const a=n($('twiceMonthPaystub1').value), b=n($('twiceMonthPaystub2').value);
    total=a+b; avg=total/2; annual=avg*24;
  } else if (type === 'verbal'){
    const hrs=n($('verbalHours').value), rate=n($('verbalRate').value);
    total=hrs*rate; avg=total; annual=total*52;
  } else { return; }

  $(`${type}Total`).textContent   = total.toFixed(2);
  $(`${type}Average`).textContent = avg.toFixed(2);
  $(`${type}Annual`).textContent  = annual.toFixed(2);
  calculateGrandTotal();
}
window.calculateIncome = calculateIncome;

/* ---------- Grand total ---------- */
function calculateGrandTotal(){
  const biweekly = n($('biweeklyAnnual').textContent);
  const weekly   = n($('weeklyAnnual').textContent);
  const twiceM   = n($('twiceMonthAnnual').textContent);
  const verbal   = n($('verbalAnnual').textContent);

  const tipsWeekly = n($('AnnualTips').value);      // weekly
  const otherMon   = n($('AnnualOtherMonthly').value); // monthly
  const otherYear  = n($('OtherAnnual').value);        // yearly

  const grand = biweekly + weekly + twiceM + verbal + (tipsWeekly*52) + (otherMon*12) + otherYear;
  $('grandTotal').textContent = grand.toFixed(2);

  updateHouseholdIncome();
  // keep charts fresh if a modal is open later
  renderAWCChart(n($('householdSize').value), grand);
}
window.calculateGrandTotal = calculateGrandTotal;

/* ---------- Household display ---------- */
function updateHouseholdIncome(){
  const size = n($('householdSize').value);
  const income = n($('grandTotal').textContent);

  $('coverageLevel').textContent = determineCoverageLevel(size, income);
  const awc = determineAWCQualification(size, income);
  $('awcQualification').textContent = awc;
}
window.updateHouseholdIncome = updateHouseholdIncome;

/* ---------- Coverage table (5 columns) ---------- */
function renderCoverageChart(selectedSize){
  const tbody = $('coverageTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  Object.keys(coverageChart)
    .sort((a,b)=>Number(a)-Number(b))
    .forEach(size=>{
      const vals = coverageChart[size]; // [0,25,50,75,100]
      const tr = document.createElement('tr');
      if (Number(size)===Number(selectedSize)) tr.classList.add('coverage-row--highlight');
      tr.innerHTML = `
        <td>${size}</td>
        <td>${money(vals[0])}</td>
        <td>${money(vals[1])}</td>
        <td>${money(vals[2])}</td>
        <td>${money(vals[3])}</td>
        <td>${money(vals[4])}</td>`;
      tbody.appendChild(tr);
    });
}

/* ---------- AWC table (2 columns) ---------- */
function renderAWCChart(selectedSize, yourIncome){
  const tbody = $('awcTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  Object.keys(awcChart)
    .sort((a,b)=>Number(a)-Number(b))
    .forEach(size=>{
      const threshold = awcChart[size];
      const tr = document.createElement('tr');
      if (Number(size)===Number(selectedSize)) tr.classList.add('coverage-row--highlight');
      tr.innerHTML = `
        <td>${size}</td>
        <td>${money(threshold)}</td>`;
      tbody.appendChild(tr);
    });
}

/* ---------- Modals ---------- */
const openModal  = (id)=>{ const el=$(id); if(!el) return; el.style.display='flex'; el.setAttribute('aria-hidden','false'); };
const closeModal = (id)=>{ const el=$(id); if(!el) return; el.style.display='none'; el.setAttribute('aria-hidden','true'); };

$('triggerModal1').addEventListener('click', ()=>{
  renderCoverageChart(n($('householdSize').value));
  openModal('modalOverlay1');
});
$('triggerModal2').addEventListener('click', ()=>{
  renderAWCChart(n($('householdSize').value), n($('grandTotal').textContent));
  openModal('modalOverlay2');
});

['modalOverlay1','modalOverlay2'].forEach(id=>{
  const overlay = $(id);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(id); });
  overlay.querySelector('.modal-close').addEventListener('click', ()=>closeModal(id));
});

/* ---------- Notes toggle ---------- */
document.querySelectorAll('.toggleNotes').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const notes = $('notesContainer');
    notes.style.display = (notes.style.display==='none' || notes.style.display==='') ? 'block' : 'none';
  });
});

/* ---------- Init ---------- */
calculateGrandTotal();             // compute once
renderCoverageChart(n($('householdSize').value));
renderAWCChart(n($('householdSize').value), n($('grandTotal').textContent));

$('householdSize').addEventListener('change', ()=>{
  updateHouseholdIncome();
  renderCoverageChart(n($('householdSize').value));
  renderAWCChart(n($('householdSize').value), n($('grandTotal').textContent));
});