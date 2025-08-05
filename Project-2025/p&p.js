const procedures = [
  {
    service: "Implant Insertion (e.g., Nexplanon)",
    cpt: "11981",
    hcpcs: "J7307",
    icd10: "Z30.017",
    fullprice: 0,
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
    fullprice: 0,
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
    fullprice: 0,
    keywords: [
      "implant insert/ reinsert",
      "implant reinsertion",
      "nexplanon",
      "implant removal and insertion"
    ]
  },
  {
    service: "IUD Insertion (e.g., Liletta, Paragard, Mirena)",
    cpt: "58300",
    hcpcs: "J7297, J7296, J7300",
    icd10: "Z30.430",
    modifier: "Modifier 51 when both a insert and removal happen same visit",
    fullprice: 0,
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
    fullprice: 0,
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
    service: "Medroxyprogesterone inj. (Depo)",
    cpt: "",
    hcpcs: "J1050",
    icd10: "Z30.42",
    fullprice: 0,
    keywords: [
      "medroxy",
      "depo",
      "depo injection",
      "inj. fee (depo)",
      "depo injection fee"
    ]
  },
  {
  service: "NuvaRing",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  modifier: "For initial prescription/counseling, use Z30.011. For surveillance/follow-up, use Z30.44.",
  fullprice: 0,
  keywords: [
    "nuva ring",
    "nuvaring"
  ]
  },
  {
    service: "Xulane Patch",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 0,
    keywords: [
      "xulane patch",
      "patch"
    ]
  },
  {
    service: "Doxycycline (oral)",
    cpt: "",
    hcpcs: "",
    icd10: "A56.01, A54.01",
    fullprice: 0,
    keywords: [
      "doxycycline"
    ]
  },
  {
    service: "Rocephin (ceftriaxone inj)",
    cpt: "",
    hcpcs: "J0696",
    icd10: "A54.01",
    fullprice: 0,
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
    fullprice: 0,
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
    service: "Suprax (cefixime)",
    cpt: "J3490?",
    hcpcs: "",
    icd10: "A54.00",
    fullprice: 0,
    keywords: [
      "suprax",
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
    fullprice: 0,
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
    fullprice: 0,
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
    fullprice: 0,
    keywords: [
      "hpv"
    ]
  },
  {
    service: "Pathology Fee",
    cpt: "99000 or G0416–G0419",
    hcpcs: "",
       icd10: "",
    fullprice: 0,
    keywords: [
      "pathology fee"
    ]
  },
  {
    service: "Wet Mount",
    cpt: "87210",
    hcpcs: "",
    icd10: "N76.0",
    fullprice: 0,
    keywords: [
      "wet mount"
    ]
  },
  {
    service: "Chlamydia (CHL)",
    cpt: "87491",
    hcpcs: "",
    icd10: "Z11.8",
    fullprice: 0,
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
    fullprice: 0,
    keywords: [
      "gonorrhea",
      "gc"
    ]
  },
  {
    service: "Pregnancy Test Urine - Positive",
    cpt: "81025",
    hcpcs: "",
    icd10: "Z32.01",
    fullprice: 0,
    keywords: [
      "preg - pos hcg",
      "pregnancy test",
      "pregnancy test positive"
    ]
  },
  {
    service: "Pregnancy Test Urine - Negative",
    cpt: "81025",
    hcpcs: "",
    icd10: "Z32.02",
    fullprice: 0,
    keywords: [
      "preg - neg hcg",
      "pregnancy test",
      "pregnancy test negative"
    ]
  },
  {
    service: "STI Injection Fee",
    cpt: "96372",
    hcpcs: "",
       icd10: "",
    fullprice: 0,
    keywords: [
      "inj. fee (sti tx)",
      "sti injection fee"
    ]
  },
  {
    service: "Depo Injection Fee",
    cpt: "96372",
    hcpcs: "",
       icd10: "",
    fullprice: 0,
    keywords: [
      "inj. fee (depo)",
      "depo injection fee"
    ]
  },
  {
    service: "Venipuncture",
    cpt: "36415",
    hcpcs: "",
       icd10: "",
    fullprice: 0,
    keywords: [
      "venipuncture"
    ]
  },
  {
    service: "Genital Wart Treatment (e.g., cryo)",
    cpt: "56501 or 54050",
    hcpcs: "",
    icd10: "A63.0",
    fullprice: 0,
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
    fullprice: 0,
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
    fullprice: 0,
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
    fullprice: 0,
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
    fullprice: 0,
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
    service: "Urine Dipstick",
    cpt: "81002 (non-automated) or 81003",
    hcpcs: "",
    icd10: "R82.90",
    fullprice: 0,
    keywords: [
      "urine dip",
      "urine dipstick"
    ]
  }
];

export default procedures;
    