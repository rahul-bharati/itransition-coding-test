import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Drugs from "@/components/drugs/drugs";
import * as drugsApi from "@/api/drugs";
import { mockDrugs, mockCompanies, mockTableConfig } from "@/test/mocks/data";
import { TooltipProvider } from "@/components/ui/tooltip";

// Mock the API module
vi.mock("@/api/drugs", () => ({
  fetchDrugs: vi.fn(),
  fetchCompanies: vi.fn(),
  fetchTableConfig: vi.fn(),
  updateTableConfig: vi.fn(),
}));

describe("Drugs Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mocks
    vi.mocked(drugsApi.fetchDrugs).mockResolvedValue({
      items: mockDrugs,
      totalItems: 3,
    });
    vi.mocked(drugsApi.fetchCompanies).mockResolvedValue({
      items: mockCompanies,
    });
    vi.mocked(drugsApi.fetchTableConfig).mockResolvedValue(mockTableConfig);
    vi.mocked(drugsApi.updateTableConfig).mockResolvedValue(mockTableConfig);
  });

  it("renders the component with title", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    expect(screen.getByText("Drugs Database")).toBeInTheDocument();
  });

  it("fetches and displays drugs on mount", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("DRG001")).toBeInTheDocument();
    });

    expect(drugsApi.fetchDrugs).toHaveBeenCalledWith({
      page: 1,
      limit: 20,
      sortBy: undefined,
      sortOrder: undefined,
      company: undefined,
      search: undefined,
    });
  });

  it("fetches companies on mount", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(drugsApi.fetchCompanies).toHaveBeenCalled();
    });
  });

  it("fetches table config on mount", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(drugsApi.fetchTableConfig).toHaveBeenCalled();
    });
  });

  it("displays loading state initially", () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders search input", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search drugs..."),
      ).toBeInTheDocument();
    });
  });

  it("renders search button", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /search/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders company filter dropdown", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("All Companies")).toBeInTheDocument();
    });
  });

  it("performs search when search button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search drugs..."),
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search drugs...");
    await user.type(searchInput, "Amoxicillin");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(drugsApi.fetchDrugs).toHaveBeenCalledWith(
        expect.objectContaining({
          search: "Amoxicillin",
          page: 1,
        }),
      );
    });
  });

  it("performs search when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search drugs..."),
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search drugs...");
    await user.type(searchInput, "Metformin{Enter}");

    await waitFor(() => {
      expect(drugsApi.fetchDrugs).toHaveBeenCalledWith(
        expect.objectContaining({
          search: "Metformin",
          page: 1,
        }),
      );
    });
  });

  it("opens company filter dropdown and shows companies", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("All Companies")).toBeInTheDocument();
    });

    const filterButton = screen.getByText("All Companies");
    await user.click(filterButton);

    await waitFor(() => {
      const menuItems = screen.getAllByRole("menuitem");
      const companyNames = menuItems.map((item) => item.textContent);
      expect(companyNames).toContain("CardioMed Pharmaceuticals");
      expect(companyNames).toContain("MindCare Pharmaceuticals");
    });
  });

  it("filters by company when company is selected", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("All Companies")).toBeInTheDocument();
    });

    const filterButton = screen.getByText("All Companies");
    await user.click(filterButton);

    await waitFor(() => {
      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems.length).toBeGreaterThan(0);
    });

    const menuItems = screen.getAllByRole("menuitem");
    const cardioMedItem = menuItems.find(
      (item) => item.textContent === "CardioMed Pharmaceuticals",
    );

    if (cardioMedItem) {
      await user.click(cardioMedItem);
    }

    await waitFor(() => {
      expect(drugsApi.fetchDrugs).toHaveBeenCalledWith(
        expect.objectContaining({
          company: "CardioMed Pharmaceuticals",
          page: 1,
        }),
      );
    });
  });

  it("shows Clear Filters button when filters are active", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search drugs..."),
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search drugs...");
    await user.type(searchInput, "test");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("Clear Filters")).toBeInTheDocument();
    });
  });

  it("clears filters when Clear Filters button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search drugs..."),
      ).toBeInTheDocument();
    });

    // Add a search filter
    const searchInput = screen.getByPlaceholderText("Search drugs...");
    await user.type(searchInput, "test");
    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("Clear Filters")).toBeInTheDocument();
    });

    // Clear filters
    const clearButton = screen.getByText("Clear Filters");
    await user.click(clearButton);

    await waitFor(() => {
      expect(drugsApi.fetchDrugs).toHaveBeenCalledWith(
        expect.objectContaining({
          search: undefined,
          company: undefined,
          page: 1,
        }),
      );
    });
  });

  it("resets to page 1 when search changes", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search drugs..."),
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search drugs...");
    await user.type(searchInput, "Amoxicillin");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(drugsApi.fetchDrugs).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
        }),
      );
    });
  });

  it("handles API errors gracefully", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    vi.mocked(drugsApi.fetchDrugs).mockRejectedValue(new Error("API Error"));

    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Failed to fetch drugs:",
        expect.any(Error),
      );
    });

    consoleError.mockRestore();
  });

  it("displays correct page size (20 items)", async () => {
    render(
      <TooltipProvider>
        <Drugs />
      </TooltipProvider>,
    );

    await waitFor(() => {
      expect(drugsApi.fetchDrugs).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 20,
        }),
      );
    });
  });
});
