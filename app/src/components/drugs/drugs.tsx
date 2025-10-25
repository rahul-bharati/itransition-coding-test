import {useEffect, useState} from "react";
import type {DrugType} from "@/interface/drugType.ts";
import {fetchDrugs} from "@/api/drugs.ts";
import {DataTable} from "@/components/drugs/data-column.tsx";
import {drugColumns} from "@/components/drugs/columns.tsx";

function Drugs() {

    const [drugs, setDrugs] = useState<DrugType[]>([]);

    useEffect(() => {
        const getData = async () => {
            const {items} = await fetchDrugs();
            console.log({items})
            setDrugs(items);
        }
        getData();
    }, [])

    return <div className="container mx-auto p-10">
        <DataTable columns={drugColumns} data={drugs}/>
    </div>;
}

export default Drugs;