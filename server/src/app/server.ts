import express from "express";
import morgan from "morgan";
import cors from 'cors';
import mongoose, {connect, ConnectOptions} from 'mongoose';
import "dotenv/config";

class Server {
    public app: express.Application;
    private readonly PORT: number | string;
    private readonly MONGODB_URI: string;

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.MONGODB_URI = process.env.MONGODB_SRV || "mongodb://localhost:27017/mydatabase"
        this.setupMiddlewares();
        this.setUpRoutes();
    }

    setupMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(morgan("dev"));
    }

    setUpRoutes(): void {
        // Define your routes here
    }

    async connectToDatabase(): Promise<void> {
        try {
            console.log("Connecting to database...");
            const clientOptions: ConnectOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};
            await connect(this.MONGODB_URI, clientOptions);
            await mongoose.connection.db?.admin().command({ping: 1});
            console.info("Connected to MongoDB Successfully");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        } finally {
            await this.disconnectFromDatabase()
        }
    }

    async disconnectFromDatabase(): Promise<void> {
        await mongoose.disconnect();
        console.info("Disconnected from MongoDB Successfully");
    }

    public start(): void {
        this.app.get("/", (req, res) => {
            res.send("Hello, World!");
        });

        this.app.listen(this.PORT, () => {
            console.log(`Server is running on http://localhost:${this.PORT}`);
        });
    }
}

export default new Server();