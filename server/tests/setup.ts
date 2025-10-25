import {MongoMemoryServer} from "mongodb-memory-server"
import {beforeAll, afterAll, it, expect} from "@jest/globals";
// @ts-ignore
import path from 'path';

import {AppConfig, loadConfig} from "../src/config/config";
import server from "../src/app/server";
import mongoose from "mongoose";
import {importData} from "../src/utils/import-data";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    // Create in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Load test config with in-memory MongoDB URI
    const cfg: AppConfig = loadConfig({...process.env, MONGODB_SRV: mongoUri, NODE_ENV: 'test'});

    // Update singleton with test config
    server.updateConfig(cfg);

    // Connect to the in-memory database
    await server.connectToDatabase();

    // Import test data from tests/mock/data.json using an absolute path and reuse the existing connection
    const dataPath = path.resolve(__dirname, 'mock', 'data.json');
    await importData({filePath: dataPath, reuseConnection: true});
});

afterAll(async () => {
    // drops Disconnect from database
    await mongoose.connection.dropDatabase();
    await server.disconnectFromDatabase();

    // Stop the in-memory MongoDB
    if (mongoServer) {
        await mongoServer.stop();
    }

    // Reset for next test run
    server.resetForTesting();
});
