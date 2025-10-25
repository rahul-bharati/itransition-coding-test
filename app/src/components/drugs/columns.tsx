import type {ColumnDef} from "@tanstack/react-table";
import type {DrugType} from "@/interface/drugType.ts";

export const drugColumns: ColumnDef<DrugType>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "code",
        header: "Code"
    },
    {
        header: "Name",
        accessorFn: (row) => `${row.genericName} (${row.brandName})`,
        id: "name"
    },
    {
        accessorKey: "company",
        header: "Company"
    },
    {
        accessorKey: "launchDate",
        header: "Launch Date",
        // @ts-ignore
        cell: ({getValue}) => {
            const value = getValue<string>()
            return new Date(value).toLocaleDateString()
        }
    }
]