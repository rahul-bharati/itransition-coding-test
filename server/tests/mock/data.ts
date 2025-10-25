export interface DrugData {
    code: string;
    genericName: string;
    company: string;
    brandName: string;
    launchDate: string; // ISO 8601
}

/**
 * Master mock dataset matching data.json
 * Note: data.json has duplicates (DRG003, DRG007, DRG012 with updated info at the end)
 * We use the latest versions here (25 unique drugs total)
 */
export const DRUGS_ALL: DrugData[] = [
    {
        code: "DRG001",
        genericName: "Paracetamol",
        company: "PharmaCorp Ltd",
        brandName: "Panadol",
        launchDate: "2020-01-15"
    },
    {
        code: "DRG002",
        genericName: "Ibuprofen",
        company: "MediHealth Inc",
        brandName: "Advil",
        launchDate: "2019-03-22"
    },
    {
        code: "DRG003",
        genericName: "Amoxicillin",
        company: "BioPharm Solutions",
        brandName: "Amoxil Plus",
        launchDate: "2023-08-15"
    },
    {
        code: "DRG004",
        genericName: "Metformin",
        company: "DiabetesCare Corp",
        brandName: "Glucophage",
        launchDate: "2018-11-05"
    },
    {
        code: "DRG005",
        genericName: "Lisinopril",
        company: "CardioMed Pharmaceuticals",
        brandName: "Prinivil",
        launchDate: "2020-08-30"
    },
    {
        code: "DRG006",
        genericName: "Atorvastatin",
        company: "HeartHealth Inc",
        brandName: "Lipitor",
        launchDate: "2017-02-14"
    },
    {
        code: "DRG007",
        genericName: "Omeprazole",
        company: "GastroPharm Ltd",
        brandName: "Prilosec Advanced",
        launchDate: "2022-11-20"
    },
    {
        code: "DRG008",
        genericName: "Amlodipine",
        company: "CardioMed Pharmaceuticals",
        brandName: "Norvasc",
        launchDate: "2021-01-25"
    },
    {
        code: "DRG009",
        genericName: "Losartan",
        company: "BPControl Inc",
        brandName: "Cozaar",
        launchDate: "2020-04-12"
    },
    {
        code: "DRG010",
        genericName: "Simvastatin",
        company: "HeartHealth Inc",
        brandName: "Zocor",
        launchDate: "2018-07-08"
    },
    {
        code: "DRG011",
        genericName: "Levothyroxine",
        company: "ThyroidCare Pharma",
        brandName: "Synthroid",
        launchDate: "2019-12-20"
    },
    {
        code: "DRG012",
        genericName: "Azithromycin",
        company: "AntiBio Labs",
        brandName: "Zithromax Z-Pak",
        launchDate: "2024-05-10"
    },
    {
        code: "DRG013",
        genericName: "Metoprolol",
        company: "CardioMed Pharmaceuticals",
        brandName: "Lopressor",
        launchDate: "2021-03-17"
    },
    {
        code: "DRG014",
        genericName: "Albuterol",
        company: "RespiroCare Inc",
        brandName: "Ventolin",
        launchDate: "2019-05-28"
    },
    {
        code: "DRG015",
        genericName: "Gabapentin",
        company: "NeuroPharma Solutions",
        brandName: "Neurontin",
        launchDate: "2020-02-09"
    },
    {
        code: "DRG016",
        genericName: "Hydrochlorothiazide",
        company: "BPControl Inc",
        brandName: "Microzide",
        launchDate: "2018-09-14"
    },
    {
        code: "DRG017",
        genericName: "Sertraline",
        company: "MindCare Pharmaceuticals",
        brandName: "Zoloft",
        launchDate: "2021-07-22"
    },
    {
        code: "DRG018",
        genericName: "Montelukast",
        company: "RespiroCare Inc",
        brandName: "Singulair",
        launchDate: "2019-11-11"
    },
    {
        code: "DRG019",
        genericName: "Furosemide",
        company: "RenalHealth Corp",
        brandName: "Lasix",
        launchDate: "2020-05-19"
    },
    {
        code: "DRG020",
        genericName: "Citalopram",
        company: "MindCare Pharmaceuticals",
        brandName: "Celexa",
        launchDate: "2021-09-06"
    },
    {
        code: "DRG021",
        genericName: "Pantoprazole",
        company: "GastroPharm Ltd",
        brandName: "Protonix",
        launchDate: "2018-04-23"
    },
    {
        code: "DRG022",
        genericName: "Tramadol",
        company: "PainRelief Pharma",
        brandName: "Ultram",
        launchDate: "2019-08-07"
    },
    {
        code: "DRG023",
        genericName: "Clopidogrel",
        company: "CardioMed Pharmaceuticals",
        brandName: "Plavix",
        launchDate: "2020-12-15"
    },
    {
        code: "DRG024",
        genericName: "Prednisone",
        company: "ImmunoPharm Inc",
        brandName: "Deltasone",
        launchDate: "2021-02-28"
    },
    {
        code: "DRG025",
        genericName: "Warfarin",
        company: "CoagControl Labs",
        brandName: "Coumadin",
        launchDate: "2017-10-31"
    }
];

/**
 * Utility helpers to auto-generate test constants
 */

// Sort helper (desc by launchDate) - default sort
const sortByLaunchDesc = (arr: DrugData[]) =>
    [...arr].sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime());

// Sort helper (asc by launchDate)
const sortByLaunchAsc = (arr: DrugData[]) =>
    [...arr].sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime());

// Sort by generic name
const sortByGenericNameAsc = (arr: DrugData[]) =>
    [...arr].sort((a, b) => a.genericName.localeCompare(b.genericName));

const sortByGenericNameDesc = (arr: DrugData[]) =>
    [...arr].sort((a, b) => b.genericName.localeCompare(a.genericName));

// Sort by company
const sortByCompanyAsc = (arr: DrugData[]) =>
    [...arr].sort((a, b) => a.company.localeCompare(b.company));

// Unique sorted company list
const getCompanies = (arr: DrugData[]) =>
    Array.from(new Set(arr.map(d => d.company))).sort();

/**
 * Derived expected constants for tests
 */

// Default behavior → descending launchDate (newest first)
export const DRUGS_DEFAULT = sortByLaunchDesc(DRUGS_ALL);

// Pagination examples (page-based)
export const DRUGS_LIMIT_5 = DRUGS_DEFAULT.slice(0, 5);
export const DRUGS_LIMIT_10 = DRUGS_DEFAULT.slice(0, 10);
export const DRUGS_PAGE_2_LIMIT_5 = DRUGS_DEFAULT.slice(5, 10);  // page 2, limit 5
export const DRUGS_PAGE_3_LIMIT_5 = DRUGS_DEFAULT.slice(10, 15); // page 3, limit 5
export const DRUGS_PAGE_2_LIMIT_10 = DRUGS_DEFAULT.slice(10, 20); // page 2, limit 10
export const DRUGS_PAGE_4_LIMIT_7 = DRUGS_DEFAULT.slice(21, 28); // page 4, limit 7

// Sorting variations
export const DRUGS_SORT_LAUNCH_ASC = sortByLaunchAsc(DRUGS_ALL);
export const DRUGS_SORT_LAUNCH_DESC = DRUGS_DEFAULT; // Same as default
export const DRUGS_SORT_NAME_ASC = sortByGenericNameAsc(DRUGS_ALL);
export const DRUGS_SORT_NAME_DESC = sortByGenericNameDesc(DRUGS_ALL);
export const DRUGS_SORT_COMPANY_ASC = sortByCompanyAsc(DRUGS_ALL);

// Company filter examples
export const DRUGS_COMPANY_CARDIOMED = sortByLaunchDesc(
    DRUGS_ALL.filter(d => d.company === "CardioMed Pharmaceuticals")
);
export const DRUGS_COMPANY_GASTROPHARM = sortByLaunchDesc(
    DRUGS_ALL.filter(d => d.company === "GastroPharm Ltd")
);
export const DRUGS_COMPANY_MINDCARE = sortByLaunchDesc(
    DRUGS_ALL.filter(d => d.company === "MindCare Pharmaceuticals")
);
export const DRUGS_COMPANY_RESPIROC = sortByLaunchDesc(
    DRUGS_ALL.filter(d => d.company === "RespiroCare Inc")
);

// Search examples (case-insensitive contains)
export const DRUGS_SEARCH_AMOX = sortByLaunchDesc(
    DRUGS_ALL.filter(d =>
        d.genericName.toLowerCase().includes('amox') ||
        d.brandName.toLowerCase().includes('amox') ||
        d.code.toLowerCase().includes('amox')
    )
);

export const DRUGS_SEARCH_METFORMIN = sortByLaunchDesc(
    DRUGS_ALL.filter(d =>
        d.genericName.toLowerCase().includes('metformin') ||
        d.brandName.toLowerCase().includes('metformin') ||
        d.code.toLowerCase().includes('metformin')
    )
);

// Combined filters: company + search
export const DRUGS_CARDIOMED_SEARCH_L = sortByLaunchDesc(
    DRUGS_ALL.filter(d =>
        d.company === "CardioMed Pharmaceuticals" &&
        (d.genericName.toLowerCase().includes('l') ||
            d.brandName.toLowerCase().includes('l'))
    )
);

// Distinct companies (for `/drug/companies` endpoint)
export const DRUGS_COMPANIES = getCompanies(DRUGS_ALL);

// Total count
export const DRUGS_TOTAL_COUNT = DRUGS_ALL.length;
