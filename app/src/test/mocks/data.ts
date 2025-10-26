import type { DrugType } from "@/interface/drugType";
import type { TableConfig } from "@/api/drugs";

export const mockDrugs: DrugType[] = [
  {
    id: "1",
    code: "DRG001",
    genericName: "Amoxicillin",
    brandName: "Amoxil",
    company: "CardioMed Pharmaceuticals",
    launchDate: "2023-01-15",
  },
  {
    id: "2",
    code: "DRG002",
    genericName: "Metformin",
    brandName: "Glucophage",
    company: "MindCare Pharmaceuticals",
    launchDate: "2023-02-20",
  },
  {
    id: "3",
    code: "DRG003",
    genericName: "Lisinopril",
    brandName: "Prinivil",
    company: "CardioMed Pharmaceuticals",
    launchDate: "2023-03-10",
  },
];

export const mockCompanies = [
  "CardioMed Pharmaceuticals",
  "MindCare Pharmaceuticals",
];

export const mockTableConfig: TableConfig = {
  columns: [
    { key: "id", label: "ID", visible: true, order: 1 },
    { key: "code", label: "Code", visible: true, order: 2 },
    { key: "name", label: "Name", visible: true, order: 3 },
    { key: "company", label: "Company", visible: true, order: 4 },
    { key: "launchDate", label: "Launch Date", visible: true, order: 5 },
  ],
};

export const mockDataResponse = {
  items: mockDrugs,
  totalItems: 3,
};
