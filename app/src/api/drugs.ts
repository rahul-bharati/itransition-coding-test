import axios from "axios";
import type { DrugType } from "@/interface/drugType.ts";

const BASE_URL_API = import.meta.env.VITE_API_BACKEND_URL || "";

export interface DataResponse {
  items: DrugType[];
  totalItems: number;
}

export interface DrugsQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  company?: string;
  search?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  visible: boolean;
  order: number;
}

export interface TableConfig {
  columns: TableColumn[];
}

export const fetchDrugs = async (
  params?: DrugsQueryParams,
): Promise<DataResponse> => {
  const response = await axios.get(`${BASE_URL_API}/api/drug`, { params });
  return response.data;
};

export const fetchCompanies = async (): Promise<{ items: string[] }> => {
  const response = await axios.get(`${BASE_URL_API}/api/drug/companies`);
  return response.data;
};

export const fetchTableConfig = async (): Promise<TableConfig> => {
  const response = await axios.get(`${BASE_URL_API}/api/table-config`);
  return response.data;
};

export const updateTableConfig = async (
  config: TableConfig,
): Promise<TableConfig> => {
  const response = await axios.patch(
    `${BASE_URL_API}/api/table-config`,
    config,
  );
  return response.data;
};
