import { useEffect, useState } from "react";
import type { DrugType } from "@/interface/drugType.ts";
import {
  fetchDrugs,
  fetchCompanies,
  fetchTableConfig,
  updateTableConfig,
} from "@/api/drugs.ts";
import { DataTable } from "@/components/drugs/data-table.tsx";
import { drugColumns } from "@/components/drugs/columns.tsx";
import type { SortingState, VisibilityState } from "@tanstack/react-table";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Filter, Search } from "lucide-react";

function Drugs() {
  const [drugs, setDrugs] = useState<DrugType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch companies on mount
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const { items } = await fetchCompanies();
        setCompanies(items);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    getCompanies();
  }, []);

  // Fetch table config on mount
  useEffect(() => {
    const getTableConfig = async () => {
      try {
        const config = await fetchTableConfig();
        const visibility: VisibilityState = {};
        config.columns.forEach((col) => {
          if (!col.visible) {
            visibility[col.key] = false;
          }
        });
        setColumnVisibility(visibility);
      } catch (error) {
        console.error("Failed to fetch table config:", error);
      }
    };
    getTableConfig();
  }, []);

  // Fetch drugs whenever filters change
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const sortBy = sorting[0]?.id;
        const sortOrder = sorting[0]?.desc ? "desc" : "asc";

        const { items, totalItems } = await fetchDrugs({
          page: pageIndex + 1,
          limit: pageSize,
          sortBy,
          sortOrder: sortBy ? sortOrder : undefined,
          company: selectedCompany || undefined,
          search: search || undefined,
        });

        setDrugs(items);
        setTotalItems(totalItems);
      } catch (error) {
        console.error("Failed to fetch drugs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [pageIndex, pageSize, sorting, selectedCompany, search]);

  // Update table config when column visibility changes
  useEffect(() => {
    const updateConfig = async () => {
      try {
        const config = await fetchTableConfig();
        const updatedColumns = config.columns.map((col) => ({
          ...col,
          visible: columnVisibility[col.key],
        }));
        await updateTableConfig({ columns: updatedColumns });
      } catch (error) {
        console.error("Failed to update table config:", error);
      }
    };

    // Only update if columnVisibility has been initialized
    if (Object.keys(columnVisibility).length > 0) {
      updateConfig();
    }
  }, [columnVisibility]);

  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number,
  ) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);
  };

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);
    setPageIndex(0); // Reset to first page when sorting changes
  };

  const handleColumnVisibilityChange = (newVisibility: VisibilityState) => {
    setColumnVisibility(newVisibility);
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setPageIndex(0); // Reset to first page when search changes
  };

  const handleCompanyFilter = (company: string) => {
    setSelectedCompany(company);
    setPageIndex(0); // Reset to first page when filter changes
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setSelectedCompany("");
    setPageIndex(0);
  };

  const pageCount = Math.ceil(totalItems / pageSize);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Drugs Database</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2 flex-1">
          <Input
            placeholder="Search drugs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="max-w-sm"
          />
          <Button onClick={handleSearch} size="sm">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              {selectedCompany || "All Companies"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px]">
            <DropdownMenuItem onClick={() => handleCompanyFilter("")}>
              All Companies
            </DropdownMenuItem>
            {companies.map((company) => (
              <DropdownMenuItem
                key={company}
                onClick={() => handleCompanyFilter(company)}
              >
                {company}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(search || selectedCompany) && (
          <Button onClick={clearFilters} variant="ghost" size="sm">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <DataTable
          columns={drugColumns}
          data={drugs}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalItems={totalItems}
          sorting={sorting}
          columnVisibility={columnVisibility}
          onPaginationChange={handlePaginationChange}
          onSortingChange={handleSortingChange}
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      )}
    </div>
  );
}

export default Drugs;
