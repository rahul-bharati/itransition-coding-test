import {ITableConfig} from "../interface/table-config";

export const DEFAULT_TABLE_CONFIG: ITableConfig = {
    columns: [
        {key: 'id', label: 'ID', visible: true, order: 1},
        {key: 'code', label: 'Code', visible: true, order: 2},
        {key: 'name', label: 'Name', visible: true, order: 3},
        {key: 'category', label: 'Category', visible: true, order: 4},
        {key: 'launchDate', label: 'Launch Date', visible: true, order: 5},
    ]
}