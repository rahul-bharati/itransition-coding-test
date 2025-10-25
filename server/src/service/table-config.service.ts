import {ITableConfig} from "../interface/table-config";
import TableConfig from "../model/table-config";

class TableConfigService {
    tableConfig;
    constructor() {
        this.tableConfig = TableConfig
    }

    async getTableConfig(): Promise<ITableConfig | null> {
        return this.tableConfig.findOne().lean();
    }

    async updateTableConfig(newConfig: ITableConfig): Promise<ITableConfig | null> {
        return this.tableConfig.findOneAndUpdate({}, newConfig, {new: true, upsert: true}).lean();
    }

    async createTableConfig(config: ITableConfig): Promise<ITableConfig> {
        const newTableConfig = new this.tableConfig(config);
        return newTableConfig.save();
    }
}

export default new TableConfigService();