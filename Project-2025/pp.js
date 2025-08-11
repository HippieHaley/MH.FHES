const procedures = [
  {
    service: "99202\nNew Pt Limited",
    cpt: "99202",
    hcpcs: "",
    icd10: "",
    fullprice: 170,
    keywords: ["limited-new", "new pt", "99202"]
  },
  {
    service: "99203\nNew Pt Intermediate",
    cpt: "99203",
    hcpcs: "",
    icd10: "",
    fullprice: 240,
    keywords: ["intermediate-new", "new pt", "99203"]
  },
  {
    service: "99204\nNew Pt Comprehensive",
    cpt: "99204",
    hcpcs: "",
    icd10: "",
    fullprice: 365,
    keywords: ["comprehensive-new", "new pt", "99204"]
  },
  {
    service: "99211\nEst Pt Minimal (RN)",
    cpt: "99211",
    hcpcs: "",
    icd10: "",
    fullprice: 51,
    keywords: ["minimal-established", "est pt", "99211"]
  },
  {
    service: "99212\nEst Pt Limited",
    cpt: "99212",
    hcpcs: "",
    icd10: "",
    fullprice: 101,
    keywords: ["limited-established", "est pt", "99212"]
  },
  {
    service: "99213\nEst Pt Intermediate",
    cpt: "99213",
    hcpcs: "",
    icd10: "",
    fullprice: 166,
    keywords: ["intermediate-established", "est pt", "99213"]
  },
  {
    service: "99214\nEst Pt Comprehensive",
    cpt: "99214",
    hcpcs: "",
    icd10: "",
    fullprice: 243,
    keywords: ["comprehensive-established", "est pt", "99214"]
  },
  {
    service: "99384\nPreventive New 12–17",
    cpt: "99384",
    hcpcs: "",
    icd10: "",
    fullprice: 306,
    keywords: ["preventive new", "99384", "12–17", "ie"]
  },
  {
    service: "99385\nPreventive New 18–39",
    cpt: "99385",
    hcpcs: "",
    icd10: "",
    fullprice: 267,
    keywords: ["preventive new", "99385", "18–39", "ie"]
  },
  {
    service: "99386\nPreventive New 40–64",
    cpt: "99386",
    hcpcs: "",
    icd10: "",
    fullprice: 285,
    keywords: ["preventive new", "99386", "40–64", "ie"]
  },
  {
    service: "99394\nPreventive Est 12–17",
    cpt: "99394",
    hcpcs: "",
    icd10: "",
    fullprice: 262,
    keywords: ["preventive established", "99394", "12–17", "ae"]
  },
  {
    service: "99395\nPreventive Est 18–39",
    cpt: "99395",
    hcpcs: "",
    icd10: "",
    fullprice: 267,
    keywords: ["preventive established", "99395", "18–39", "ae"]
  },
  {
    service: "99396\nPreventive Est 40–64",
    cpt: "99396",
    hcpcs: "",
    icd10: "",
    fullprice: 285,
    keywords: ["preventive established", "99396", "40–64", "ae"]
  },
  { 
    service: "Implant Insertion",
    cpt: "11981",
    hcpcs: "J7307",
    icd10: "Z30.017",
    fullprice: 316,
    keywords: [
      "implant insert",
      "implant insertion",
      "nexplanon",
      "implant"
    ]
  },
  {
    service: "Implant Removal",
    cpt: "11982",
    hcpcs: "",
    icd10: "Z30.46",
    fullprice: 349,
    keywords: [
      "implant removal",
      "nexplanon",
      "remove implant"
    ]
  },
  {
    service: "Implant Removal + Reinsertion",
    cpt: "11983",
    hcpcs: "",
    icd10: "Z30.017",
    modifier: "Modifier 51 when both a insert and removal happen same visit",
    fullprice: 478,
    keywords: [
      "implant insert/ reinsert",
      "implant reinsertion",
      "nexplanon",
      "implant removal and insertion"
    ]
  },
  {
    service: "IUD Insertion",
    cpt: "58300",
    hcpcs: "J7297, J7296, J7300",
    icd10: "Z30.430",
    modifier: "Modifier 51 when both a insert and removal happen same visit",
    fullprice: 178,
    keywords: [
      "iud insert",
      "iud insertion",
      "liletta",
      "paragard",
      "mirena",
      "bayer",
      "iud"
    ]
  },
  {
    service: "IUD Removal",
    cpt: "58301",
    hcpcs: "",
    icd10: "Z30.432",
    fullprice: 211,
    keywords: [
      "iud removal",
      "liletta",
      "paragard",
      "mirena",
      "bayer",
      "remove iud"
    ]
  },
  {
    service: "Doxycycline",
    cpt: "",
    hcpcs: "",
    icd10: "A56.01, A54.01",
    fullprice: 1,
    keywords: [
      "doxycycline"
    ]
  },
  {
    service: "Rocephin (ceftriaxone inj)",
    cpt: "",
    hcpcs: "J0696",
    icd10: "A54.01",
    fullprice: 20,
    keywords: [
      "rocephin",
      "ceftriaxone"
    ]
  },
  {
    service: "Bicillin L-A",
    cpt: "",
    hcpcs: "J0561",
    icd10: "A51.0",
    fullprice: 30,
    keywords: [
      "bicillin"
    ]
  },
  {
    service: "Azithromycin",
    cpt: "",
    hcpcs: "",
    icd10: "A56.01",
    fullprice: 0,
    keywords: [
      "azithromycin"
    ]
  },
  {
    service: "Suprax",
    cpt: "J3490?",
    hcpcs: "",
    icd10: "A54.00",
    fullprice: 0,
    keywords: [
      "suprax"
    ]
  },
    {
    service: "Cefixime",
    cpt: "J3490?",
    hcpcs: "",
    icd10: "A54.00",
    fullprice: 0,
    keywords: [
      "cefixime"
    ]
  },
  {
    service: "Acyclovir",
    cpt: "",
    hcpcs: "J0133",
    icd10: "A60.0",
    fullprice: 0,
    keywords: [
      "acyclovir",
      "acylovir"
    ]
  },
  {
    service: "Metronidazole",
    cpt: "",
    hcpcs: "J1836",
    icd10: "A59.01",
    fullprice: 0,
    keywords: [
      "metronidazole"
    ]
  },
  {
    service: "Fluconazole",
    cpt: "",
    hcpcs: "use NDC",
    icd10: "B37.3",
    fullprice: 0,
    keywords: [
      "fluconazole"
    ]
  },
  {
    service: "Ibuprofen",
    cpt: "",
    hcpcs: "J1745- INJ?",
    icd10: "R52",
    fullprice: 0,
    keywords: [
      "ibuprofen",
      "ibuprofen injection"
    ]
  },
  {
    service: "Clindamycin Cream",
    cpt: "",
    hcpcs: "J3490",
    icd10: "N76.0",
    fullprice: 0,
    keywords: [
      "clindamycin cream"
    ]
  },
  {
    service: "Clotrimazole Cream",
    cpt: "",
    hcpcs: "A6250",
    icd10: "B37.3",
    fullprice: 0,
    keywords: [
      "clotrimazole cream"
    ]
  },
  {
    service: "Liquid Based PAP",
    cpt: "88175",
    hcpcs: "",
    icd10: "Z12.4",
    fullprice: 30,
    keywords: [
      "liquid based pap",
      "pap",
      "liquid pap"
    ]
  },
  {
    service: "Conventional PAP",
    cpt: "88164",
    hcpcs: "",
    icd10: "Z12.4",
    fullprice: 23,
    keywords: [
      "conventional pap",
      "pap",
      "conv pap"
    ]
  },
  {
    service: "HPV",
    cpt: "87624",
    hcpcs: "",
    icd10: "Z11.51",
    fullprice: 52,
    keywords: [
      "hpv"
    ]
  },
  {
    service: "Pathology Fee",
    cpt: "99000 or G0416–G0419",
    hcpcs: "",
       icd10: "",
    fullprice: 72,
    keywords: [
      "pathology fee"
    ]
  },
  {
    service: "Wet Mount",
    cpt: "87210",
    hcpcs: "",
    icd10: "N76.0",
    fullprice: 15,
    keywords: [
      "wet mount"
    ]
  },
  {
    service: "Chlamydia (CHL)",
    cpt: "87491",
    hcpcs: "",
    icd10: "Z11.8",
    fullprice: 15,
    keywords: [
      "chlamydia",
      "chl"
    ]
  },
  {
    service: "Gonorrhea (GC)",
    cpt: "87591",
    hcpcs: "",
    icd10: "Z11.3",
    fullprice: 15,
    keywords: [
      "gonorrhea",
      "gc"
    ]
  },
  {
    service: "Pregnancy Test Urine",
    cpt: "81025",
    hcpcs: "",
    icd10: "Z32.01 or Z32.02",
    fullprice: 20,
    keywords: [
      "preg",
      "pregnancy test",
      "pregnancy test"
    ]
  },
  {
    service: "Injection Fee",
    cpt: "96372",
    hcpcs: "",
    icd10: "",
    fullprice: 38,
    keywords: [
      "inj. fee",
      "injection fee"
    ]
  },
  {
    service: "Venipuncture",
    cpt: "36415",
    hcpcs: "",
    icd10: "",
    fullprice: 7,
    keywords: [
      "venipuncture"
    ]
  },
  {
    service: "Genital Wart Treatment Male",
    cpt: "54050",
    hcpcs: "",
    icd10: "A63.0",
    fullprice: 300,
    keywords: [
      "genital wart tx",
      "genital wart treatment",
    ]
  },
  {
  service: "Genital Wart Treatment Female",
    cpt: "56501",
    hcpcs: "",
    icd10: "A63.0",
    fullprice: 323,
    keywords: [
      "genital wart tx",
      "genital wart treatment",
    ]
  },
  {
    service: "HIV Rapid",
    cpt: "86703 or 87806",
    hcpcs: "",
    icd10: "Z11.4",
    fullprice: 40,
    keywords: [
      "rapid hiv",
      "hiv rapid",
      "hiv"
    ]
  },
  {
    service: "HIV Serum",
    cpt: "86701, 86702",
    hcpcs: "",
    icd10: "Z11.4",
    fullprice: 22,
    keywords: [
      "serum hiv",
      "hiv serum",
      "hiv"
    ]
  },
  {
    service: "RPR (Syphilis)",
    cpt: "86592",
    hcpcs: "",
    icd10: "Z11.3",
    fullprice: 20,
    keywords: [
      "rpr",
      "syphilis"
    ]
  },
  {
    service: "TPPA (Syphilis)",
    cpt: "86593",
    hcpcs: "",
    icd10: "Z11.3",
    fullprice: 35,
    keywords: [
      "tppa",
      "tppa (syphilis)"
    ]
  },
  {
    service: "HSV PCR",
    cpt: "87529",
    hcpcs: "",
    icd10: "A60.00",
    fullprice: 0,
    keywords: [
      "hsv pcr"
    ]
  },
  {
    service: "HSV Serum ",
    cpt: "86695",
    hcpcs: "",
    icd10: "A60.00",
    fullprice: 0,
    keywords: [
      "hsv serum ",
      "hsv",
      "serum"
    ]
  },
  {
    service: "Urine Dipstick (non-automated)",
    cpt: "81002",
    hcpcs: "",
    icd10: "R82.90",
    fullprice: 8,
    keywords: [
      "urine dip",
      "urine dipstick"
    ]
  },
   {
    service: "Urine Dipstick",
    cpt: "81003",
    hcpcs: "",
    icd10: "R82.90",
    fullprice: 10,
    keywords: [
      "urine dip",
      "urine dipstick"
    ]
  },
  {
  service: "Basal Thermometer",
  cpt: "",
  hcpcs: "A4931",
  icd10: "",
  fullprice: 16,
  keywords: ["basal thermometer", "thermometer", "a4931"]
},
{
  service: "Depo",
  cpt: "",
  hcpcs: "J1050",
  icd10: "Z30.42",
  fullprice: 27,
  keywords: ["Depo", "medroxyprogesterone", "depo-provera", "j1050"]
},
{
  service: "VCF Foam",
  cpt: "",
  hcpcs: "A4269",
  icd10: "",
  fullprice: 16,
  keywords: ["vcf", "foam", "a4269"]
},
{
  service: "Gynol II",
  cpt: "",
  hcpcs: "A4269",
  icd10: "",
  fullprice: 7,
  keywords: ["gynol", "gynol ii", "a4269"]
},
{
  service: "Liletta IUD",
  cpt: "",
  hcpcs: "J7297",
  icd10: "Z30.430",
  fullprice: 130,
  keywords: ["liletta", "iud", "j7297"]
},
{
  service: "Paragard IUD",
  cpt: "",
  hcpcs: "J7300",
  icd10: "Z30.430",
  fullprice: 315,
  keywords: ["paragard", "iud", "j7300"]
},
{
  service: "Mirena IUD",
  cpt: "",
  hcpcs: "J7302",
  icd10: "Z30.430",
  fullprice: 315,
  keywords: ["mirena", "iud", "j7302"]
},
{
  service: "Xulane Patch",
  cpt: "",
  hcpcs: "J7304",
  icd10: "Z30.011",
  fullprice: 75,
  keywords: ["xulane", "patch", "j7304", "birth control"]
},
{
  service: "NuvaRing",
  cpt: "",
  hcpcs: "J7303",
  icd10: "Z30.011",
  fullprice: 8,
  keywords: ["nuvaring", "nuva ring", "j7303", "birth control"]
},
{
  service: "Nexplanon",
  cpt: "",
  hcpcs: "J7307",
  icd10: "Z30.017",
  fullprice: 573,
  keywords: ["nexplanon", "implant", "j7307"]
},
{
  service: "Alese (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["alese", "birth control", "pill", "s4993"]
},
{
  service: "Apri (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["apri", "birth control", "pill", "s4993"]
},
{
  service: "Aubra (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["aubra", "birth control", "pill", "s4993"]
},
{
  service: "Aviane (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["aviane", "birth control", "pill", "s4993"]
},
{
  service: "Camila (Progestin-Only Pill)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 28,
  keywords: ["camila", "birth control", "pop", "progestin", "s4993"]
},
{
  service: "Chateal (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["chateal", "birth control", "pill", "s4993"]
},
{
  service: "Cryselle (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["cryselle", "birth control", "pill", "s4993"]
},
{
  service: "Cyred (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["cyred", "birth control", "pill", "s4993"]
},
{
  service: "Doxycycline (Oral)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "A56.01",
  fullprice: 1,
  keywords: ["doxycycline", "sti treatment", "oral antibiotic", "s4993"]
},
{
  service: "Enpresse (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["enpresse", "birth control", "pill", "s4993"]
},
{
  service: "Jolivette (Progestin-Only Pill)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["jolivette", "birth control", "pop", "progestin", "s4993"]
},
{
  service: "Levora (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 14,
  keywords: ["levora", "birth control", "pill", "s4993"]
},
{
  service: "Lutera (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 16,
  keywords: ["lutera", "birth control", "pill", "s4993"]
},
{
  service: "Lyza (Progestin-Only Pill)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["lyza", "birth control", "pop", "s4993"]
},
{
  service: "Mononessa (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["mononessa", "birth control", "pill", "s4993"]
},
{
  service: "Nor QD (Progestin-Only Pill)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 9,
  keywords: ["nor qd", "birth control", "pop", "s4993"]
},
{
  service: "Nordette (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["nordette", "birth control", "pill", "s4993"]
},
{
  service: "Norethindrone (Generic POP)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["norethindrone", "birth control", "pop", "progestin", "s4993"]
},
{
  service: "Nortrel 777 (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["nortrel", "nortrel 777", "birth control", "pill", "s4993"]
},
{
  service: "Orsythia (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["orsythia", "birth control", "pill", "s4993"]
},
{
  service: "Portia (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["portia", "birth control", "pill", "s4993"]
},
{
  service: "Reclipsen (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 11,
  keywords: ["reclipsen", "birth control", "pill", "s4993"]
},
{
  service: "Sprintec (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["sprintec", "birth control", "pill", "s4993"]
},
{
  service: "Sronyx (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 6,
  keywords: ["sronyx", "birth control", "pill", "s4993"]
},
{
  service: "Tri-Lo Marzia (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 14,
  keywords: ["tri-lo marzia", "birth control", "pill", "s4993"]
},
{
  service: "Tri-Lo Sprintec (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["tri-lo sprintec", "birth control", "pill", "s4993"]
},
{
  service: "TriNessa Lo (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["trinessa lo", "birth control", "pill", "s4993"]
},
{
  service: "Triphasil (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  keywords: ["triphasil", "birth control", "pill", "s4993"]
},
{
  service: "Trivora (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 14,
  keywords: ["trivora", "birth control", "pill", "s4993"]
},
{
  service: "Vilbra (Oral Contraceptive)",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  keywords: ["vilbra", "birth control", "pill", "s4993"]
}

];

export default procedures;
    