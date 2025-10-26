import {describe, expect, it} from "@jest/globals";
import server from "../../src/app/server";
import request from "supertest";

describe("Health API", () => {
    it('GET /api/health', async () => {
        const res = await request(server.app).get('/api/health');
        expect(res.status).toBe(200);
    });
})
