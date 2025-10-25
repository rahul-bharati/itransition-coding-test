import express from "express";
import morgan from "morgan";
import cors from 'cors';
import mongoose, {connect, ConnectOptions} from 'mongoose';
import "dotenv/config";
import {AppConfig, loadConfig} from "../config/config";
import tableConfigRoutes from "../routes/table-config.routes";
import drugRoutes from "../routes/drug.routes";

class Server {
    public app: express.Application;
    private cfg: AppConfig;

    constructor() {
        this.cfg = loadConfig();
        this.app = express();
        this.setupMiddlewares();
        this.setUpRoutes();
    }

    public updateConfig(cfg: AppConfig): void {
        this.cfg = cfg;
    }

    public resetForTesting(): void {
        // Reset mongoose connection state if needed
        if (mongoose.connection.readyState !== 0) {
            console.warn('Warning: Database connection still active. Call disconnectFromDatabase() first.');
        }
    }

    setupMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(morgan("dev"));
    }

    setUpRoutes(): void {
        // Define your routes here
        this.app.get('/health', (req, res) => {
            console.log("Health check requested");
            res.status(200).send({status: 'OK'});
        })

        // Mount table-config routes
        this.app.use('/table-config', tableConfigRoutes);
        this.app.use('/drug', drugRoutes);
    }

    async connectToDatabase(): Promise<void> {
        try {
            // If there's already an active connection, don't call connect again.
            // In test runs we may reuse an in-memory MongoDB connection, so avoid openUri conflicts.
            if (mongoose.connection.readyState !== 0) {
                console.info('Mongoose already has an active connection (readyState=', mongoose.connection.readyState, '). Skipping connect.');
                // Ensure the connection is alive
                try {
                    await mongoose.connection.db?.admin().command({ping: 1});
                    console.info("Existing MongoDB connection is healthy");
                    return;
                } catch (err) {
                    console.warn('Existing mongoose connection ping failed, attempting reconnect:', err);
                    // fallthrough to attempt connect
                }
            }

            console.log("Connecting to database...");
            const clientOptions: ConnectOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};
            await connect(this.cfg.MONGODB_SRV, clientOptions);
            await mongoose.connection.db?.admin().command({ping: 1});
            console.info("Connected to MongoDB Successfully");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    async disconnectFromDatabase(): Promise<void> {
        try {
            if (mongoose.connection.readyState === 0) {
                console.info('Mongoose connection already disconnected.');
                return;
            }
            await mongoose.disconnect();
            console.info("Disconnected from MongoDB Successfully");
        } catch (err) {
            console.warn('Error while disconnecting mongoose:', err);
        }
    }

    public start(): void {
        this.app.listen(this.cfg.PORT, () => {
            console.log(`Server is running on http://localhost:${this.cfg.PORT}`);
        });
    }
}

export default new Server();
