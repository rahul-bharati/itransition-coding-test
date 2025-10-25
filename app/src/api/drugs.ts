import axios from "axios";
import type {DrugType} from "@/interface/drugType.ts";


export interface DataResponse {
    items: DrugType[];
}

export const fetchDrugs = async (): Promise<DataResponse> => {
    const response = await axios.get('http://localhost:3000/drug');
    return response.data;
}
