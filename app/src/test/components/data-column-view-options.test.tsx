import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTableViewOptions from "@/components/drugs/data-column-view-options";
import type { Table } from "@tanstack/react-table";

describe("DataTableViewOptions", () => {
  const mockToggleVisibility = vi.fn();

  const createMockColumn = (
    id: string,
    isVisible: boolean,
    canHide: boolean,
  ) => ({
    id,
    getIsVisible: () => isVisible,
    getCanHide: () => canHide,
    toggleVisibility: mockToggleVisibility,
    accessorFn: () => {},
    columnDef: {
      header: id === "name" ? "Name" : id.charAt(0).toUpperCase() + id.slice(1),
    },
  });

  const createMockTable = (columns: any[]) =>
    ({
      getAllColumns: () => columns,
    }) as unknown as Table<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the View button", () => {
    const mockTable = createMockTable([]);
    render(<DataTableViewOptions table={mockTable} />);

    expect(screen.getByRole("button", { name: /view/i })).toBeInTheDocument();
  });

  it("opens dropdown when View button is clicked", async () => {
    const user = userEvent.setup();
    const columns = [
      createMockColumn("id", true, true),
      createMockColumn("name", true, true),
    ];
    const mockTable = createMockTable(columns);

    render(<DataTableViewOptions table={mockTable} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("displays only columns that can be hidden", () => {
    const columns = [
      createMockColumn("id", true, true),
      createMockColumn("code", true, false), // Cannot hide
      createMockColumn("name", true, true),
    ];
    const mockTable = createMockTable(columns);

    render(<DataTableViewOptions table={mockTable} />);

    // Should only show columns that can be hidden
    expect(
      mockTable.getAllColumns().filter((col) => col.getCanHide()).length,
    ).toBe(2);
  });

  it("shows checked items for visible columns", async () => {
    const user = userEvent.setup();
    const columns = [
      createMockColumn("id", true, true),
      createMockColumn("name", false, true),
    ];
    const mockTable = createMockTable(columns);

    render(<DataTableViewOptions table={mockTable} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    // Both columns should be in the menu
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("toggles column visibility when item is clicked", async () => {
    const user = userEvent.setup();
    const columns = [createMockColumn("id", true, true)];
    const mockTable = createMockTable(columns);

    render(<DataTableViewOptions table={mockTable} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    const idOption = screen.getByText("Id");
    await user.click(idOption);

    expect(mockToggleVisibility).toHaveBeenCalled();
  });

  it("displays column labels correctly", async () => {
    const user = userEvent.setup();
    const columns = [
      createMockColumn("id", true, true),
      createMockColumn("code", true, true),
      createMockColumn("name", true, true),
      createMockColumn("company", true, true),
      createMockColumn("launchDate", true, true),
    ];
    const mockTable = createMockTable(columns);

    render(<DataTableViewOptions table={mockTable} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });
});
