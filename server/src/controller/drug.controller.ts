import {Request, Response} from "express";

import DrugService from "../service/drug.service";

class DrugController {
    service: typeof DrugService

    constructor(private readonly drugService: typeof DrugService) {
        this.service = drugService
    }

    async get(req: Request, res: Response) {
        try {
            const {limit, page, company, sortBy, sortOrder, search} = req.query;

            // Validate query parameters
            if (limit !== undefined) {
                const limitNum = parseInt(limit as string, 10);
                if (isNaN(limitNum) || limitNum < 0) {
                    return res.status(400).json({error: 'Invalid limit parameter'});
                }
            }

            if (page !== undefined) {
                const pageNum = parseInt(page as string, 10);
                if (isNaN(pageNum) || pageNum < 0) {
                    return res.status(400).json({error: 'Invalid page parameter'});
                }
            }

            const result = await this.service.get({
                limit: limit ? parseInt(limit as string, 10) : undefined,
                page: page ? parseInt(page as string, 10) : undefined,
                company: company as string | undefined,
                sortBy: sortBy as 'launchDate' | 'company' | 'genericName' | undefined,
                sortOrder: sortOrder as 'asc' | 'desc' | undefined,
                search: search as string | undefined,
            });

            const response = {
                items: result.items,
                totalItems: result.totalItems,
                page: page ? parseInt(page as string, 10) : 1,
                limit: limit ? parseInt(limit as string, 10) : 30,
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error('Error in DrugController.get:', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}

export default DrugController;