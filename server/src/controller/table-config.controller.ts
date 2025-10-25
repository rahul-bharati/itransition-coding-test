import {Request, Response} from "express";
import TableConfigService from "../service/table-config.service";
import {DEFAULT_TABLE_CONFIG} from "../config/table-config.defaults";
import {ITableConfig} from "../interface/table-config";

class TableConfigController {
    service: typeof TableConfigService;

    constructor(private readonly tableConfigService: typeof TableConfigService) {
        this.service = tableConfigService;
    }

    async get(req: Request, res: Response) {
        const config = await this.service.getTableConfig();
        if (config) {
            return res.status(200).json(config);
        } else {
            await this.tableConfigService.createTableConfig(DEFAULT_TABLE_CONFIG);
            return res.status(200).json(DEFAULT_TABLE_CONFIG)
        }
    }

    async update(req: Request, res: Response) {
        const newConfig = req.body as ITableConfig;
        if (!newConfig) {
            return res.status(400).json({message: "Table configuration is required"});
        }
        const updatedConfig = await this.service.updateTableConfig(newConfig);
        return res.status(200).json(updatedConfig);
    }
}

export default TableConfigController;