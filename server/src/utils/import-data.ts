import fs from 'fs/promises';
import path from 'path';
import "dotenv/config";
import mongoose, {ConnectOptions} from "mongoose";
import {IDrug} from "../interface/drug";
import Drug from "../model/drug";

const DEFAULT_BATCH_SIZE = 500; // number of operations per bulkWrite
const DEFAULT_PAUSE_MS = 50; // small pause between batches to reduce DB load

const connectToDatabase = async (): Promise<void> => {
    try {
        const clientOptions: ConnectOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};
        const mongo_url = process.env.MONGODB_SRV || "mongodb://localhost:27017/mydatabase";
        await mongoose.connect(mongo_url, clientOptions);
        console.info("Connected to MongoDB");
    } catch (err) {
        console.error('DB connect error:', err);
        throw err;
    }
};

const DEFAULT_DATA_PATH = path.resolve(__dirname, '..', 'data', 'data.json');

type ImportOptions = {
    filePath?: string;
    batchSize?: number;
    pauseMs?: number;
    upsert?: boolean;
}

const loadDataFromFile = async (filePath: string): Promise<IDrug[]> => {
    const raw = await fs.readFile(filePath, 'utf-8');
    let parsed: any;
    try {
        parsed = JSON.parse(raw);
    } catch (err) {
        throw new Error(`Failed to parse JSON ${filePath}: ${(err as Error).message}`);
    }
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.data)) return parsed.data;
    if (Array.isArray(parsed.drugs)) return parsed.drugs;
    throw new Error('JSON does not contain an array of records');
}

export const importData = async (options: ImportOptions = {}): Promise<void> => {
    const filePath = options.filePath || DEFAULT_DATA_PATH;
    const batchSize = options.batchSize || DEFAULT_BATCH_SIZE;
    const pauseMs = typeof options.pauseMs === 'number' ? options.pauseMs : DEFAULT_PAUSE_MS;
    const upsert = !!options.upsert;

    await connectToDatabase();

    try {
        const data = await loadDataFromFile(filePath);
        console.log(`Loaded ${data.length} records from ${filePath}`);
        if (data.length === 0) return;

        // Group by code and keep only the one with the latest launch date
        const latestByCode = new Map<string, any>();
        let skipped = 0;
        let duplicates = 0;

        for (const r of data) {
            if (!r || !r.code) {
                skipped++;
                continue;
            }

            const launchDate = new Date(r.launchDate);
            const existing = latestByCode.get(r.code);

            if (!existing) {
                latestByCode.set(r.code, r);
            } else {
                const existingDate = new Date(existing.launchDate);
                if (launchDate > existingDate) {
                    console.log(`Duplicate code "${r.code}": replacing ${existingDate.toISOString().split('T')[0]} with later date ${launchDate.toISOString().split('T')[0]}`);
                    latestByCode.set(r.code, r);
                    duplicates++;
                } else {
                    console.log(`Duplicate code "${r.code}": keeping ${existingDate.toISOString().split('T')[0]}, ignoring ${launchDate.toISOString().split('T')[0]}`);
                    duplicates++;
                }
            }
        }

        console.log(`Found ${latestByCode.size} unique drugs; ${duplicates} duplicates resolved; skipped ${skipped} invalid records`);

        const operations: any[] = [];
        for (const r of latestByCode.values()) {
            const doc = {
                code: r.code,
                genericName: r.genericName,
                company: r.company,
                brandName: r.brandName,
                launchDate: new Date(r.launchDate)
            };

            if (upsert) {
                operations.push({updateOne: {filter: {code: r.code}, update: {$set: doc}, upsert: true}});
            } else {
                operations.push({insertOne: {document: doc}});
            }
        }

        console.log(`Prepared ${operations.length} operations`);

        let completed = 0;
        for (let i = 0; i < operations.length; i += batchSize) {
            const batch = operations.slice(i, i + batchSize);
            try {
                await Drug.bulkWrite(batch, {ordered: false});
                completed += batch.length;
                console.info(`Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} ops (progress ${completed}/${operations.length})`);
            } catch (err) {
                console.error(`Batch ${Math.floor(i / batchSize) + 1} error:`, err);
            }
            if (pauseMs > 0) await new Promise(res => setTimeout(res, pauseMs));
        }

        console.log(`Import finished. Executed ${completed} ops. Skipped ${skipped}.`);
    } catch (err) {
        console.error('Import failed:', err);
        throw err;
    } finally {
        try {
            await mongoose.disconnect();
        } catch (e) {
            console.warn('Disconnect error:', e);
        }
    }
};

(async () => {
    try {
        await importData();
        console.log("Data import completed successfully.");
    } catch (err) {
        console.error("Data import failed:", err);
    }
})()
