import type { ColumnDef } from "@tanstack/react-table";
import type { DrugType } from "@/interface/drugType.ts";
import DataTableColumnHeader from "@/components/drugs/data-table-column-headet.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export const drugColumns: ColumnDef<DrugType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    accessorFn: (row) => `${row.genericName} (${row.brandName})`,
    id: "name",
    cell: ({ row }) => {
      const fullName = `${row.original.genericName} (${row.original.brandName})`;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[400px] truncate cursor-default">
              {fullName}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{fullName}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  },
  {
    accessorKey: "launchDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Launch Date" />
    ),
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return new Date(value).toLocaleDateString();
    },
  },
];
