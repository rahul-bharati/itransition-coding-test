export const KEYS = ['id', 'code', 'name', 'category', 'launchDate'] as const;

export interface ITableColumn {
    key: typeof KEYS[number];
    label: string;
    visible: boolean;
    order: number;
}

export interface ITableConfig {
    columns: ITableColumn[];
}