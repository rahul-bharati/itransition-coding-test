import { describe, it, expect } from "@jest/globals";
import server from "../../src/app/server";
import request from "supertest";
import {
    DRUGS_DEFAULT,                 // full dataset sorted by launchDate desc
    DRUGS_LIMIT_5,                 // first 5 of the default-sorted dataset
    DRUGS_SORT_LAUNCH_ASC,         // full dataset sorted by launchDate asc
    DRUGS_SORT_NAME_ASC,           // full dataset sorted by genericName asc
    DRUGS_SORT_NAME_DESC,          // full dataset sorted by genericName desc
    DRUGS_COMPANY_CARDIOMED,       // all drugs for "CardioMed Pharmaceuticals"
    DRUGS_COMPANY_MINDCARE,        // all drugs for "MindCare Pharmaceuticals"
    DRUGS_SEARCH_AMOX,             // search=amox expected list
    DRUGS_SEARCH_METFORMIN,        // search=Metformin expected list
    DRUGS_TOTAL_COUNT,             // total items in dataset
} from "../mock/data";
import {stripRuntimeFields} from "../utils/normalize";

describe("Drug API", () => {
    describe("GET /drug - Basic retrieval", () => {
        it("should return all drugs with default sorting (newest first) when limit is large", async () => {
            const resp = await request(server.app).get("/drug?limit=9999");
            expect(resp.status).toBe(200);

            const { items, totalItems } = resp.body;
            expect(Array.isArray(items)).toBe(true);
            expect(totalItems).toBe(DRUGS_TOTAL_COUNT);
            expect(items.length).toBe(DRUGS_TOTAL_COUNT);

            // Must match our precomputed default (launchDate desc)
            const normalizedItems = stripRuntimeFields(items);
            expect(normalizedItems).toEqual(DRUGS_DEFAULT);
        });

        it("should return default-limited page when limit is not specified", async () => {
            const resp = await request(server.app).get("/drug");
            expect(resp.status).toBe(200);
            const { items, totalItems } = resp.body;
            expect(Array.isArray(items)).toBe(true);
            expect(typeof totalItems).toBe("number");
            // Do not assert a specific default size; just ensure > 0 and <= total
            expect(items.length).toBeGreaterThan(0);
            expect(items.length).toBeLessThanOrEqual(DRUGS_TOTAL_COUNT);
        });
    });

    describe("GET /drug - Pagination with page", () => {
        it("should return first 5 items with limit=5", async () => {
            const resp = await request(server.app).get("/drug?limit=5");
            expect(resp.status).toBe(200);
            const { items, totalItems } = resp.body;
            expect(items.length).toBe(5);
            expect(totalItems).toBe(DRUGS_TOTAL_COUNT);

            // Verify items are sorted by launchDate desc and match our expected slice
            for (let i = 0; i < items.length - 1; i++) {
                const a = new Date(items[i].launchDate).getTime();
                const b = new Date(items[i + 1].launchDate).getTime();
                expect(a).toBeGreaterThanOrEqual(b);
            }
            const normalizedItems = stripRuntimeFields(items);
            expect(normalizedItems).toEqual(DRUGS_LIMIT_5);
        });

        it("should return first 10 items with limit=10", async () => {
            const resp = await request(server.app).get("/drug?limit=10");
            expect(resp.status).toBe(200);
            const { items, totalItems } = resp.body;
            expect(items.length).toBe(10);
            expect(totalItems).toBe(DRUGS_TOTAL_COUNT);
        });

        it("should return page 2 with limit=5", async () => {
            const page2 = await request(server.app).get("/drug?limit=5&page=2");
            expect(page2.status).toBe(200);
            expect(page2.body.items.length).toBe(5);
            expect(page2.body.totalItems).toBe(DRUGS_TOTAL_COUNT);

            const page1 = await request(server.app).get("/drug?limit=5&page=1");
            expect(page1.status).toBe(200);
            // First item on page 2 should differ from first on page 1
            expect(page2.body.items[0].code).not.toBe(page1.body.items[0].code);
        });

        it("should return page 3 with limit=5", async () => {
            const resp = await request(server.app).get("/drug?limit=5&page=3");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBe(5);
            expect(resp.body.totalItems).toBe(DRUGS_TOTAL_COUNT);
        });

        it("should return page 2 with limit=10", async () => {
            const resp = await request(server.app).get("/drug?limit=10&page=2");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBe(10);
            expect(resp.body.totalItems).toBe(DRUGS_TOTAL_COUNT);
        });

        it("should treat page=1 the same as default for a given limit", async () => {
            const resp1 = await request(server.app).get("/drug?limit=5&page=1");
            const resp2 = await request(server.app).get("/drug?limit=5");
            expect(resp1.status).toBe(200);
            expect(resp2.status).toBe(200);
            expect(resp1.body.items).toEqual(resp2.body.items);
        });

        it("should return empty array when requesting a page beyond available data", async () => {
            const resp = await request(server.app).get("/drug?limit=10&page=100");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBe(0);
            expect(resp.body.totalItems).toBe(DRUGS_TOTAL_COUNT);
        });
    });

    describe("GET /drug - Sorting", () => {
        it("should sort by launchDate ascending", async () => {
            const resp = await request(server.app).get("/drug?sortBy=launchDate&sortOrder=asc&limit=9999");
            expect(resp.status).toBe(200);
            const normalizedItems = stripRuntimeFields(resp.body.items);
            expect(normalizedItems).toEqual(DRUGS_SORT_LAUNCH_ASC);
        });

        it("should sort by launchDate descending (explicit)", async () => {
            const resp = await request(server.app).get("/drug?sortBy=launchDate&sortOrder=desc&limit=9999");
            expect(resp.status).toBe(200);
            const normalizedItems = stripRuntimeFields(resp.body.items);
            expect(normalizedItems).toEqual(DRUGS_DEFAULT);
        });

        it("should sort by genericName ascending", async () => {
            const resp = await request(server.app).get("/drug?sortBy=genericName&sortOrder=asc&limit=9999");
            expect(resp.status).toBe(200);
            const normalizedItems = stripRuntimeFields(resp.body.items);
            expect(normalizedItems).toEqual(DRUGS_SORT_NAME_ASC);
        });

        it("should sort by genericName descending", async () => {
            const resp = await request(server.app).get("/drug?sortBy=genericName&sortOrder=desc&limit=9999");
            expect(resp.status).toBe(200);
            const normalizedItems = stripRuntimeFields(resp.body.items);
            expect(normalizedItems).toEqual(DRUGS_SORT_NAME_DESC);
        });

        it("should sort by company ascending (sanity check with comparator)", async () => {
            const resp = await request(server.app).get("/drug?sortBy=company&sortOrder=asc&limit=9999");
            expect(resp.status).toBe(200);
            const list = resp.body.items;
            for (let i = 0; i < list.length - 1; i++) {
                expect(list[i].company.localeCompare(list[i + 1].company)).toBeLessThanOrEqual(0);
            }
            // First should be <= last lexicographically
            expect(list[0].company.localeCompare(list[list.length - 1].company)).toBeLessThanOrEqual(0);
        });
    });

    describe("GET /drug - Filtering by company", () => {
        it("should filter by CardioMed Pharmaceuticals", async () => {
            const resp = await request(server.app).get("/drug?company=CardioMed Pharmaceuticals&limit=9999");
            expect(resp.status).toBe(200);
            const { items, totalItems } = resp.body;

            expect(totalItems).toBe(DRUGS_COMPANY_CARDIOMED.length);
            expect(items.length).toBe(DRUGS_COMPANY_CARDIOMED.length);
            items.forEach((d: any) => expect(d.company).toBe("CardioMed Pharmaceuticals"));

            // Ensure desc by launchDate
            for (let i = 0; i < items.length - 1; i++) {
                const a = new Date(items[i].launchDate).getTime();
                const b = new Date(items[i + 1].launchDate).getTime();
                expect(a).toBeGreaterThanOrEqual(b);
            }
        });

        it("should filter by MindCare Pharmaceuticals", async () => {
            const resp = await request(server.app).get("/drug?company=MindCare Pharmaceuticals&limit=9999");
            expect(resp.status).toBe(200);
            const { items, totalItems } = resp.body;

            expect(totalItems).toBe(DRUGS_COMPANY_MINDCARE.length);
            expect(items.length).toBe(DRUGS_COMPANY_MINDCARE.length);
            items.forEach((d: any) => expect(d.company).toBe("MindCare Pharmaceuticals"));
        });

        it("should return empty array for non-existent company", async () => {
            const resp = await request(server.app).get("/drug?company=NonExistentCompany");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBe(0);
            expect(resp.body.totalItems).toBe(0);
        });

        it("should combine company filter with pagination", async () => {
            const resp = await request(server.app).get("/drug?company=CardioMed Pharmaceuticals&limit=2");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBeLessThanOrEqual(2);
            expect(resp.body.totalItems).toBe(DRUGS_COMPANY_CARDIOMED.length);
            resp.body.items.forEach((d: any) =>
                expect(d.company).toBe("CardioMed Pharmaceuticals")
            );
        });
    });

    describe("GET /drug - Search functionality", () => {
        it('should search for "amox" across fields', async () => {
            const resp = await request(server.app).get("/drug?search=amox&limit=9999");
            expect(resp.status).toBe(200);
            const normalizedItems = stripRuntimeFields(resp.body.items);
            expect(normalizedItems).toEqual(DRUGS_SEARCH_AMOX);
        });

        it('should search for "Metformin" (case-insensitive)', async () => {
            const resp = await request(server.app).get("/drug?search=Metformin&limit=9999");
            expect(resp.status).toBe(200);
            const normalizedItems = stripRuntimeFields(resp.body.items);
            expect(normalizedItems).toEqual(DRUGS_SEARCH_METFORMIN);
        });

        it("should return empty array for no matches", async () => {
            const resp = await request(server.app).get("/drug?search=XYZ999NotFound");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBe(0);
        });

        it("should combine search with pagination", async () => {
            const resp = await request(server.app).get("/drug?search=a&limit=5&page=1");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBeLessThanOrEqual(5);
        });
    });

    describe("GET /drug - Combined filters", () => {
        it("should combine company filter and search", async () => {
            const resp = await request(server.app).get("/drug?company=CardioMed Pharmaceuticals&search=l&limit=9999");
            expect(resp.status).toBe(200);
            resp.body.items.forEach((drug: any) => {
                expect(drug.company).toBe("CardioMed Pharmaceuticals");
            });
        });

        it("should combine sorting, filtering, and pagination", async () => {
            const resp = await request(server.app)
                .get("/drug?company=CardioMed Pharmaceuticals&sortBy=genericName&sortOrder=asc&limit=2&page=1");
            expect(resp.status).toBe(200);
            expect(resp.body.items.length).toBeLessThanOrEqual(2);
            resp.body.items.forEach((drug: any) => {
                expect(drug.company).toBe("CardioMed Pharmaceuticals");
            });
            // Optional: verify ascending by genericName within this page
            const list = resp.body.items;
            for (let i = 0; i < list.length - 1; i++) {
                expect(list[i].genericName.localeCompare(list[i + 1].genericName)).toBeLessThanOrEqual(0);
            }
        });
    });

    describe("GET /drug - Error handling", () => {
        it("should handle invalid limit gracefully", async () => {
            const resp = await request(server.app).get("/drug?limit=invalid");
            expect(resp.status).toBe(400);
        });

        it("should handle invalid page gracefully", async () => {
            const resp = await request(server.app).get("/drug?page=invalid");
            expect(resp.status).toBe(400);
        });

        it("should handle negative limit", async () => {
            const resp = await request(server.app).get("/drug?limit=-5");
            expect(resp.status).toBe(400);
        });

        it("should handle negative page", async () => {
            const resp = await request(server.app).get("/drug?page=-1");
            expect(resp.status).toBe(400);
        });
    });
});