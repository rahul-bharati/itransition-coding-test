import {Router} from "express";
import DrugController from "../controller/drug.controller";
import DrugService from "../service/drug.service";

class DrugRoutes {
    public router: Router
    private controller: DrugController

    constructor(private readonly service: typeof DrugService = DrugService) {
        this.router = Router()
        this.controller = new DrugController(this.service)
        this.initializeRoutes()
    }

    initializeRoutes(): void {
        // bind controller methods to preserve `this`
        this.router.get("/", this.controller.get.bind(this.controller))
        this.router.get('/companies', this.controller.getCompanies.bind(this.controller))
    }
}

export default new DrugRoutes().router;