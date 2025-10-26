import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { drugColumns } from "@/components/drugs/columns";
import { mockDrugs } from "@/test/mocks/data";
import { TooltipProvider } from "@/components/ui/tooltip";

describe("Drug Columns", () => {
  it("has correct number of columns", () => {
    expect(drugColumns).toHaveLength(5);
  });

  it("has ID column", () => {
    const idColumn = drugColumns.find((col: any) => col.accessorKey === "id");
    expect(idColumn).toBeDefined();
  });

  it("has Code column", () => {
    const codeColumn = drugColumns.find(
      (col: any) => col.accessorKey === "code",
    );
    expect(codeColumn).toBeDefined();
  });

  it("has Name column with correct ID", () => {
    const nameColumn = drugColumns.find((col) => col.id === "name");
    expect(nameColumn).toBeDefined();
  });

  it("has Company column", () => {
    const companyColumn = drugColumns.find(
      (col: any) => col.accessorKey === "company",
    );
    expect(companyColumn).toBeDefined();
  });

  it("has Launch Date column", () => {
    const launchDateColumn = drugColumns.find(
      (col: any) => col.accessorKey === "launchDate",
    );
    expect(launchDateColumn).toBeDefined();
  });

  it("Name column combines genericName and brandName", () => {
    const nameColumn = drugColumns.find((col) => col.id === "name") as any;
    if (nameColumn && nameColumn.accessorFn) {
      const result = nameColumn.accessorFn(mockDrugs[0], 0);
      expect(result).toBe("Amoxicillin (Amoxil)");
    }
  });

  it("Name column truncates text with tooltip", () => {
    const nameColumn = drugColumns.find((col) => col.id === "name");
    expect(nameColumn?.cell).toBeDefined();

    if (nameColumn?.cell && typeof nameColumn.cell === "function") {
      const mockContext = {
        row: {
          original: mockDrugs[0],
        },
      } as any;

      const { container } = render(
        <TooltipProvider>{nameColumn.cell(mockContext)}</TooltipProvider>,
      );

      const truncatedDiv = container.querySelector(".truncate");
      expect(truncatedDiv).toBeInTheDocument();
      expect(truncatedDiv).toHaveClass("max-w-[400px]");
    }
  });

  it("Name column renders with tooltip wrapper", () => {
    const nameColumn = drugColumns.find((col) => col.id === "name");

    if (nameColumn?.cell && typeof nameColumn.cell === "function") {
      const mockContext = {
        row: {
          original: mockDrugs[0],
        },
      } as any;

      const { container } = render(
        <TooltipProvider delayDuration={0}>
          {nameColumn.cell(mockContext)}
        </TooltipProvider>,
      );

      // Check that the truncated div is rendered
      const truncatedDiv = container.querySelector(".truncate");
      expect(truncatedDiv).toBeTruthy();
      expect(truncatedDiv?.textContent).toBe("Amoxicillin (Amoxil)");
    }
  });

  it("Launch Date column formats date correctly", () => {
    const launchDateColumn = drugColumns.find(
      (col: any) => col.accessorKey === "launchDate",
    );

    if (launchDateColumn?.cell && typeof launchDateColumn.cell === "function") {
      const mockContext = {
        getValue: () => "2023-01-15",
      } as any;

      const { container } = render(
        <div>{launchDateColumn.cell(mockContext)}</div>,
      );

      // Check that date is formatted (format may vary by locale)
      expect(container.textContent).toMatch(/2023/);
    }
  });

  it("all columns except Name have sortable headers", () => {
    const sortableColumns = ["id", "code", "company", "launchDate"];

    sortableColumns.forEach((key) => {
      const column = drugColumns.find((col: any) => col.accessorKey === key);
      expect(column?.header).toBeDefined();
      expect(typeof column?.header).toBe("function");
    });
  });

  it("Name column has sortable header", () => {
    const nameColumn = drugColumns.find((col) => col.id === "name");
    expect(nameColumn?.header).toBeDefined();
    expect(typeof nameColumn?.header).toBe("function");
  });
});
