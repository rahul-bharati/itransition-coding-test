import Drug from "../model/drug";

interface QueryParams {
    limit?: number;
    page?: number;
    company?: string;
    sortBy?: 'launchDate' | 'company' | 'genericName';
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

interface DrugServiceResponse {
    items: any[];
    totalItems: number;
}

class DrugService {
    drug

    constructor() {
        this.drug = Drug
    }

    async get(params?: QueryParams): Promise<DrugServiceResponse> {
        const defaultParams: QueryParams = {
            limit: 30,
            page: 1,
            sortBy: 'launchDate',
            sortOrder: 'desc',
        };

        // Merge defaults with provided params but do NOT let explicit `undefined` values
        // from `params` overwrite defaults. Use nullish coalescing per-field so that
        // only defined values in `params` replace the defaults.
        type FinalParams = {
            limit: number;
            page: number;
            company?: string;
            sortBy: 'launchDate' | 'company' | 'genericName';
            sortOrder: 'asc' | 'desc';
            search?: string;
        };

        const finalParams: FinalParams = {
            limit: params?.limit ?? defaultParams.limit!,
            page: params?.page ?? defaultParams.page!,
            company: params?.company ?? defaultParams.company,
            sortBy: params?.sortBy ?? defaultParams.sortBy!,
            sortOrder: params?.sortOrder ?? defaultParams.sortOrder!,
            search: params?.search ?? defaultParams.search,
        };

        const skip = (finalParams.page - 1) * finalParams.limit;

        const sortOptions: Record<string, 1 | -1> = {};
        if (finalParams.sortBy) {
            sortOptions[finalParams.sortBy] = finalParams.sortOrder === 'asc' ? 1 : -1;
            // Ensure _id tie-breaker follows the same direction as the primary sort
            sortOptions._id = finalParams.sortOrder === 'asc' ? 1 : -1;
        }

        const filterOptions: any = {};
        if (finalParams.company) filterOptions.company = finalParams.company;

        if (finalParams.search) {
            const searchRegex = new RegExp(finalParams.search, 'i');
            filterOptions.$or = [
                {genericName: searchRegex},
                {brandName: searchRegex},
                {code: searchRegex},
            ];
        }

        const totalItems = await this.drug.countDocuments(filterOptions);

        let documents: any[] = [];

        // Use DB-side sorting for all fields. For `company` we use a collation
        // to get locale-aware, case-insensitive behavior (strength: 2).
        // This avoids loading all documents into memory and ensures consistent
        // ordering that matches locale rules. Tie-breaker `_id` follows the
        // primary sort direction for deterministic results.
        const dir = finalParams.sortOrder === 'asc' ? 1 : -1;
        if (finalParams.sortBy === 'company') {
            documents = await this.drug
                .find(filterOptions)
                .collation({locale: 'en', strength: 2})
                .sort({company: dir, _id: dir})
                .skip(skip)
                .limit(finalParams.limit)
                .select('_id code genericName company brandName launchDate')
                .lean()
                .exec();
        } else {
            documents = await this.drug
                .find(filterOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(finalParams.limit)
                .select('_id code genericName company brandName launchDate')
                .lean()
                .exec();
        }

        // Build response items matching tests' expected shape (no runtime id fields)
        const items = documents.map(doc => ({
            id: doc._id.toString(),
            code: doc.code,
            genericName: doc.genericName,
            brandName: doc.brandName,
            company: doc.company,
            launchDate: new Date(doc.launchDate).toISOString().slice(0, 10),
        }));

        return {items, totalItems};
    }

    async getCompanies(): Promise<string[]> {
        const companies: string[] = await this.drug.distinct("company");
        return Array.from(
            new Map(companies.map((c) => [c.trim().toLowerCase(), c.trim()])).values()
        ).sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
    }
}

export default new DrugService();