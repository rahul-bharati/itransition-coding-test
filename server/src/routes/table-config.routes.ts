import { Router } from "express";
import TableConfigService from "../service/table-config.service";
import TableConfigController from "../controller/table-config.controller";

class TableConfigRoutes {
    public router: Router;
    private controller: TableConfigController;

    constructor(private readonly service: typeof TableConfigService = TableConfigService) {
        this.router = Router();
        this.controller = new TableConfigController(this.service);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // bind controller methods to preserve `this`
        this.router.get("/", this.controller.get.bind(this.controller));
        this.router.patch("/", this.controller.update.bind(this.controller));
    }
}

export default new TableConfigRoutes().router;
