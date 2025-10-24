export interface DrugData {
  code: string;
  genericName: string;
  company: string;
  brandName: string;
  launchDate: string;
}

export const mockDrugs: DrugData[] = [
  {
    "code": "DRG001",
    "genericName": "Paracetamol",
    "company": "PharmaCorp Ltd",
    "brandName": "Panadol",
    "launchDate": "2020-01-15"
  },
  {
    "code": "DRG002",
    "genericName": "Ibuprofen",
    "company": "MediHealth Inc",
    "brandName": "Advil",
    "launchDate": "2019-03-22"
  },
  {
    "code": "DRG003",
    "genericName": "Amoxicillin",
    "company": "BioPharm Solutions",
    "brandName": "Amoxil",
    "launchDate": "2021-06-10"
  },
  {
    "code": "DRG004",
    "genericName": "Metformin",
    "company": "DiabetesCare Corp",
    "brandName": "Glucophage",
    "launchDate": "2018-11-05"
  },
  {
    "code": "DRG005",
    "genericName": "Lisinopril",
    "company": "CardioMed Pharmaceuticals",
    "brandName": "Prinivil",
    "launchDate": "2020-08-30"
  },
  {
    "code": "DRG006",
    "genericName": "Atorvastatin",
    "company": "HeartHealth Inc",
    "brandName": "Lipitor",
    "launchDate": "2017-02-14"
  },
  {
    "code": "DRG007",
    "genericName": "Omeprazole",
    "company": "GastroPharm Ltd",
    "brandName": "Prilosec",
    "launchDate": "2019-09-18"
  },
  {
    "code": "DRG008",
    "genericName": "Amlodipine",
    "company": "CardioMed Pharmaceuticals",
    "brandName": "Norvasc",
    "launchDate": "2021-01-25"
  },
  {
    "code": "DRG009",
    "genericName": "Losartan",
    "company": "BPControl Inc",
    "brandName": "Cozaar",
    "launchDate": "2020-04-12"
  },
  {
    "code": "DRG010",
    "genericName": "Simvastatin",
    "company": "HeartHealth Inc",
    "brandName": "Zocor",
    "launchDate": "2018-07-08"
  },
  {
    "code": "DRG011",
    "genericName": "Levothyroxine",
    "company": "ThyroidCare Pharma",
    "brandName": "Synthroid",
    "launchDate": "2019-12-20"
  },
  {
    "code": "DRG012",
    "genericName": "Azithromycin",
    "company": "AntiBio Labs",
    "brandName": "Zithromax",
    "launchDate": "2020-10-03"
  },
  {
    "code": "DRG013",
    "genericName": "Metoprolol",
    "company": "CardioMed Pharmaceuticals",
    "brandName": "Lopressor",
    "launchDate": "2021-03-17"
  },
  {
    "code": "DRG014",
    "genericName": "Albuterol",
    "company": "RespiroCare Inc",
    "brandName": "Ventolin",
    "launchDate": "2019-05-28"
  },
  {
    "code": "DRG015",
    "genericName": "Gabapentin",
    "company": "NeuroPharma Solutions",
    "brandName": "Neurontin",
    "launchDate": "2020-02-09"
  },
  {
    "code": "DRG016",
    "genericName": "Hydrochlorothiazide",
    "company": "BPControl Inc",
    "brandName": "Microzide",
    "launchDate": "2018-09-14"
  },
  {
    "code": "DRG017",
    "genericName": "Sertraline",
    "company": "MindCare Pharmaceuticals",
    "brandName": "Zoloft",
    "launchDate": "2021-07-22"
  },
  {
    "code": "DRG018",
    "genericName": "Montelukast",
    "company": "RespiroCare Inc",
    "brandName": "Singulair",
    "launchDate": "2019-11-11"
  },
  {
    "code": "DRG019",
    "genericName": "Furosemide",
    "company": "RenalHealth Corp",
    "brandName": "Lasix",
    "launchDate": "2020-05-19"
  },
  {
    "code": "DRG020",
    "genericName": "Citalopram",
    "company": "MindCare Pharmaceuticals",
    "brandName": "Celexa",
    "launchDate": "2021-09-06"
  },
  {
    "code": "DRG021",
    "genericName": "Pantoprazole",
    "company": "GastroPharm Ltd",
    "brandName": "Protonix",
    "launchDate": "2018-04-23"
  },
  {
    "code": "DRG022",
    "genericName": "Tramadol",
    "company": "PainRelief Pharma",
    "brandName": "Ultram",
    "launchDate": "2019-08-07"
  },
  {
    "code": "DRG023",
    "genericName": "Clopidogrel",
    "company": "CardioMed Pharmaceuticals",
    "brandName": "Plavix",
    "launchDate": "2020-12-15"
  },
  {
    "code": "DRG024",
    "genericName": "Prednisone",
    "company": "ImmunoPharm Inc",
    "brandName": "Deltasone",
    "launchDate": "2021-02-28"
  },
  {
    "code": "DRG025",
    "genericName": "Warfarin",
    "company": "CoagControl Labs",
    "brandName": "Coumadin",
    "launchDate": "2017-10-31"
  },
  {
    "code": "DRG003",
    "genericName": "Amoxicillin",
    "company": "BioPharm Solutions",
    "brandName": "Amoxil Plus",
    "launchDate": "2023-08-15"
  },
  {
    "code": "DRG007",
    "genericName": "Omeprazole",
    "company": "GastroPharm Ltd",
    "brandName": "Prilosec Advanced",
    "launchDate": "2022-11-20"
  },
  {
    "code": "DRG012",
    "genericName": "Azithromycin",
    "company": "AntiBio Labs",
    "brandName": "Zithromax Z-Pak",
    "launchDate": "2024-05-10"
  }
];

/**
 * Get drug data by code
 * @param code - Drug code to search for
 * @returns DrugData object if found, undefined otherwise
 */
export const getDrugByCode = (code: string): DrugData | undefined => {
  return mockDrugs.find(drug => drug.code === code);
};

/**
 * Get all drugs with a specific code (including duplicates)
 * @param code - Drug code to search for
 * @returns Array of DrugData objects with matching code
 */
export const getAllDrugsByCode = (code: string): DrugData[] => {
  return mockDrugs.filter(drug => drug.code === code);
};

// Example usage and test cases
export const examples = {
  // Input: "DRG001"
  // Expected output:
  getDrugByCode_DRG001: {
    input: "DRG001",
    expected: {
      "code": "DRG001",
      "genericName": "Paracetamol",
      "company": "PharmaCorp Ltd",
      "brandName": "Panadol",
      "launchDate": "2020-01-15"
    }
  },

  // Input: "DRG003" (has duplicates)
  // Expected output: First occurrence
  getDrugByCode_DRG003: {
    input: "DRG003",
    expected: {
      "code": "DRG003",
      "genericName": "Amoxicillin",
      "company": "BioPharm Solutions",
      "brandName": "Amoxil",
      "launchDate": "2021-06-10"
    }
  },

  // Input: "DRG003" (get all duplicates)
  // Expected output: Array of both occurrences
  getAllDrugsByCode_DRG003: {
    input: "DRG003",
    expected: [
      {
        "code": "DRG003",
        "genericName": "Amoxicillin",
        "company": "BioPharm Solutions",
        "brandName": "Amoxil",
        "launchDate": "2021-06-10"
      },
      {
        "code": "DRG003",
        "genericName": "Amoxicillin",
        "company": "BioPharm Solutions",
        "brandName": "Amoxil Plus",
        "launchDate": "2023-08-15"
      }
    ]
  },

  // Input: "DRG007" (has duplicates)
  // Expected output: Array of both occurrences
  getAllDrugsByCode_DRG007: {
    input: "DRG007",
    expected: [
      {
        "code": "DRG007",
        "genericName": "Omeprazole",
        "company": "GastroPharm Ltd",
        "brandName": "Prilosec",
        "launchDate": "2019-09-18"
      },
      {
        "code": "DRG007",
        "genericName": "Omeprazole",
        "company": "GastroPharm Ltd",
        "brandName": "Prilosec Advanced",
        "launchDate": "2022-11-20"
      }
    ]
  },

  // Input: "DRG012" (has duplicates)
  // Expected output: Array of both occurrences
  getAllDrugsByCode_DRG012: {
    input: "DRG012",
    expected: [
      {
        "code": "DRG012",
        "genericName": "Azithromycin",
        "company": "AntiBio Labs",
        "brandName": "Zithromax",
        "launchDate": "2020-10-03"
      },
      {
        "code": "DRG012",
        "genericName": "Azithromycin",
        "company": "AntiBio Labs",
        "brandName": "Zithromax Z-Pak",
        "launchDate": "2024-05-10"
      }
    ]
  },

  // Input: "DRG999" (non-existent)
  // Expected output: undefined
  getDrugByCode_NotFound: {
    input: "DRG999",
    expected: undefined
  },

  // Input: "DRG999" (non-existent, get all)
  // Expected output: empty array
  getAllDrugsByCode_NotFound: {
    input: "DRG999",
    expected: []
  }
};

