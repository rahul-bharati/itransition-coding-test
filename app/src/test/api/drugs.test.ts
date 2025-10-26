import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchDrugs,
  fetchCompanies,
  fetchTableConfig,
  updateTableConfig,
} from "@/api/drugs";
import { mockDrugs, mockCompanies, mockTableConfig } from "@/test/mocks/data";

vi.mock("axios");

describe("Drugs API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchDrugs", () => {
    it("fetches drugs successfully", async () => {
      const mockResponse = {
        data: {
          items: mockDrugs,
          totalItems: 3,
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await fetchDrugs();

      expect(axios.get).toHaveBeenCalledWith("/api/drug", {
        params: undefined,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("fetches drugs with pagination params", async () => {
      const mockResponse = {
        data: {
          items: mockDrugs,
          totalItems: 3,
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      await fetchDrugs({ page: 2, limit: 20 });

      expect(axios.get).toHaveBeenCalledWith("/api/drug", {
        params: { page: 2, limit: 20 },
      });
    });

    it("fetches drugs with sorting params", async () => {
      const mockResponse = {
        data: {
          items: mockDrugs,
          totalItems: 3,
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      await fetchDrugs({ sortBy: "genericName", sortOrder: "asc" });

      expect(axios.get).toHaveBeenCalledWith("/api/drug", {
        params: { sortBy: "genericName", sortOrder: "asc" },
      });
    });

    it("fetches drugs with company filter", async () => {
      const mockResponse = {
        data: {
          items: mockDrugs,
          totalItems: 3,
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      await fetchDrugs({ company: "CardioMed Pharmaceuticals" });

      expect(axios.get).toHaveBeenCalledWith("/api/drug", {
        params: { company: "CardioMed Pharmaceuticals" },
      });
    });

    it("fetches drugs with search query", async () => {
      const mockResponse = {
        data: {
          items: mockDrugs,
          totalItems: 3,
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      await fetchDrugs({ search: "Amoxicillin" });

      expect(axios.get).toHaveBeenCalledWith("/api/drug", {
        params: { search: "Amoxicillin" },
      });
    });

    it("fetches drugs with all params combined", async () => {
      const mockResponse = {
        data: {
          items: mockDrugs,
          totalItems: 3,
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const params = {
        page: 1,
        limit: 20,
        sortBy: "genericName",
        sortOrder: "desc" as const,
        company: "CardioMed Pharmaceuticals",
        search: "test",
      };

      await fetchDrugs(params);

      expect(axios.get).toHaveBeenCalledWith("/api/drug", {
        params,
      });
    });

    it("handles API errors", async () => {
      const error = new Error("Network Error");
      vi.mocked(axios.get).mockRejectedValue(error);

      await expect(fetchDrugs()).rejects.toThrow("Network Error");
    });
  });

  describe("fetchCompanies", () => {
    it("fetches companies successfully", async () => {
      const mockResponse = {
        data: {
          items: mockCompanies,
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await fetchCompanies();

      expect(axios.get).toHaveBeenCalledWith("/api/drug/companies");
      expect(result).toEqual(mockResponse.data);
    });

    it("handles API errors", async () => {
      const error = new Error("Network Error");
      vi.mocked(axios.get).mockRejectedValue(error);

      await expect(fetchCompanies()).rejects.toThrow("Network Error");
    });
  });

  describe("fetchTableConfig", () => {
    it("fetches table config successfully", async () => {
      const mockResponse = {
        data: mockTableConfig,
      };

      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await fetchTableConfig();

      expect(axios.get).toHaveBeenCalledWith("/api/table-config");
      expect(result).toEqual(mockTableConfig);
    });

    it("handles API errors", async () => {
      const error = new Error("Network Error");
      vi.mocked(axios.get).mockRejectedValue(error);

      await expect(fetchTableConfig()).rejects.toThrow("Network Error");
    });
  });

  describe("updateTableConfig", () => {
    it("updates table config successfully", async () => {
      const updatedConfig = {
        ...mockTableConfig,
        columns: mockTableConfig.columns.map((col, idx) =>
          idx === 0 ? { ...col, visible: false } : col,
        ),
      };

      const mockResponse = {
        data: updatedConfig,
      };

      vi.mocked(axios.patch).mockResolvedValue(mockResponse);

      const result = await updateTableConfig(updatedConfig);

      expect(axios.patch).toHaveBeenCalledWith(
        "/api/table-config",
        updatedConfig,
      );
      expect(result).toEqual(updatedConfig);
    });

    it("handles API errors", async () => {
      const error = new Error("Network Error");
      vi.mocked(axios.patch).mockRejectedValue(error);

      await expect(updateTableConfig(mockTableConfig)).rejects.toThrow(
        "Network Error",
      );
    });
  });
});
