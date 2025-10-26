import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTable } from "@/components/drugs/data-table";
import { drugColumns } from "@/components/drugs/columns";
import { mockDrugs } from "@/test/mocks/data";
import userEvent from "@testing-library/user-event";
import { TooltipProvider } from "@/components/ui/tooltip";

describe("DataTable", () => {
  const mockOnPaginationChange = vi.fn();
  const mockOnSortingChange = vi.fn();
  const mockOnColumnVisibilityChange = vi.fn();

  const defaultProps = {
    columns: drugColumns,
    data: mockDrugs,
    pageCount: 1,
    pageIndex: 0,
    pageSize: 20,
    totalItems: 3,
    sorting: [],
    columnVisibility: {},
    onPaginationChange: mockOnPaginationChange,
    onSortingChange: mockOnSortingChange,
    onColumnVisibilityChange: mockOnColumnVisibilityChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the data table with correct data", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} />
      </TooltipProvider>,
    );

    expect(screen.getByText("DRG001")).toBeInTheDocument();
    expect(screen.getByText("DRG002")).toBeInTheDocument();
    expect(screen.getByText("DRG003")).toBeInTheDocument();
  });

  it("displays column headers", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} />
      </TooltipProvider>,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Launch Date")).toBeInTheDocument();
  });

  it("displays pagination information", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} />
      </TooltipProvider>,
    );

    expect(screen.getByText("Page 1 of 1 (3 total items)")).toBeInTheDocument();
  });

  it("renders Previous and Next buttons", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} />
      </TooltipProvider>,
    );

    expect(
      screen.getByRole("button", { name: /previous/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} pageIndex={0} />
      </TooltipProvider>,
    );

    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} pageIndex={0} pageCount={1} />
      </TooltipProvider>,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("enables Next button when not on last page", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} pageIndex={0} pageCount={3} />
      </TooltipProvider>,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeEnabled();
  });

  it("calls onPaginationChange when Next is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} pageIndex={0} pageCount={3} />
      </TooltipProvider>,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    expect(mockOnPaginationChange).toHaveBeenCalledWith(1, 20);
  });

  it("calls onPaginationChange when Previous is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} pageIndex={1} pageCount={3} />
      </TooltipProvider>,
    );

    const previousButton = screen.getByRole("button", { name: /previous/i });
    await user.click(previousButton);

    expect(mockOnPaginationChange).toHaveBeenCalledWith(0, 20);
  });

  it("displays 'No Results' when data is empty", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} data={[]} totalItems={0} />
      </TooltipProvider>,
    );

    expect(screen.getByText("No Results")).toBeInTheDocument();
  });

  it("displays drug names in combined format", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} />
      </TooltipProvider>,
    );

    expect(screen.getByText("Amoxicillin (Amoxil)")).toBeInTheDocument();
    expect(screen.getByText("Metformin (Glucophage)")).toBeInTheDocument();
  });

  it("displays formatted launch dates", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} />
      </TooltipProvider>,
    );

    // Check that dates are formatted (format may vary by locale)
    const dates = screen.getAllByText(/2023/);
    expect(dates.length).toBeGreaterThan(0);
  });

  it("renders View Options button", () => {
    render(
      <TooltipProvider>
        <DataTable {...defaultProps} />
      </TooltipProvider>,
    );

    expect(screen.getByRole("button", { name: /view/i })).toBeInTheDocument();
  });
});
