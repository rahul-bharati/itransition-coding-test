import {describe, expect, it} from "@jest/globals";
import {DEFAULT_TABLE_CONFIG} from "../../src/config/table-config.defaults";
import request from "supertest";
import server from "../../src/app/server";
import {ITableConfig} from "../../src/interface/table-config";

describe('Table Config test', () => {

    it("GET /table-config", async () => {
        const tableConfig = DEFAULT_TABLE_CONFIG

        const response = await request(server.app).get("/table-config");
        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.body as ITableConfig).toMatchObject(tableConfig)
    })

    it("GET /table-config - after initial call", async () => {
        const tableConfig = DEFAULT_TABLE_CONFIG

        await request(server.app).get("/table-config");
        const response = await request(server.app).get("/table-config");
        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.body as ITableConfig).toMatchObject(tableConfig)
    })

    it("PATCH /table-config - throws error when config is missing", async () => {
        const response = await request(server.app)
            .patch("/table-config")
            .send(null);

        expect(response.status).toBe(400);
    })

    it("PATCH /table-config", async () => {
        const tableConfigUpdate = JSON.parse(JSON.stringify(DEFAULT_TABLE_CONFIG));
        tableConfigUpdate.columns[3].visible = false;

        const response = await request(server.app)
            .patch("/table-config")
            .send(tableConfigUpdate);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(tableConfigUpdate);
    })
});