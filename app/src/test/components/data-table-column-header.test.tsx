import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTableColumnHeader from "@/components/drugs/data-table-column-headet";
import type { Column } from "@tanstack/react-table";

describe("DataTableColumnHeader", () => {
  const mockToggleSorting = vi.fn();
  const mockClearSorting = vi.fn();

  const createMockColumn = (
    canSort: boolean,
    sortDirection?: "asc" | "desc" | false,
  ) => {
    return {
      getCanSort: () => canSort,
      getIsSorted: () => sortDirection,
      toggleSorting: mockToggleSorting,
      clearSorting: mockClearSorting,
    } as unknown as Column<any, any>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders title when column cannot be sorted", () => {
    const column = createMockColumn(false);
    render(<DataTableColumnHeader column={column} title="Test Column" />);

    expect(screen.getByText("Test Column")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders sortable header with button when column can be sorted", () => {
    const column = createMockColumn(true);
    render(<DataTableColumnHeader column={column} title="Sortable Column" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Sortable Column")).toBeInTheDocument();
  });

  it("shows unsorted icon when column is not sorted", () => {
    const column = createMockColumn(true, false);
    render(<DataTableColumnHeader column={column} title="Column" />);

    // ChevronsUpDown icon should be present
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("shows ascending icon when column is sorted ascending", () => {
    const column = createMockColumn(true, "asc");
    render(<DataTableColumnHeader column={column} title="Column" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("shows descending icon when column is sorted descending", () => {
    const column = createMockColumn(true, "desc");
    render(<DataTableColumnHeader column={column} title="Column" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("opens dropdown menu when header button is clicked", async () => {
    const user = userEvent.setup();
    const column = createMockColumn(true);
    render(<DataTableColumnHeader column={column} title="Column" />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("Asc")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
    expect(screen.getByText("Hide")).toBeInTheDocument();
  });

  it("calls toggleSorting with false when Asc is clicked", async () => {
    const user = userEvent.setup();
    const column = createMockColumn(true);
    render(<DataTableColumnHeader column={column} title="Column" />);

    const button = screen.getByRole("button");
    await user.click(button);

    const ascOption = screen.getByText("Asc");
    await user.click(ascOption);

    expect(mockToggleSorting).toHaveBeenCalledWith(false);
  });

  it("calls toggleSorting with true when Desc is clicked", async () => {
    const user = userEvent.setup();
    const column = createMockColumn(true);
    render(<DataTableColumnHeader column={column} title="Column" />);

    const button = screen.getByRole("button");
    await user.click(button);

    const descOption = screen.getByText("Desc");
    await user.click(descOption);

    expect(mockToggleSorting).toHaveBeenCalledWith(true);
  });

  it("calls clearSorting when Hide is clicked", async () => {
    const user = userEvent.setup();
    const column = createMockColumn(true);
    render(<DataTableColumnHeader column={column} title="Column" />);

    const button = screen.getByRole("button");
    await user.click(button);

    const hideOption = screen.getByText("Hide");
    await user.click(hideOption);

    expect(mockClearSorting).toHaveBeenCalled();
  });
});
