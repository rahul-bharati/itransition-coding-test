import server from "./app/server";
import "dotenv/config";

async function main() {
    await server.connectToDatabase();
    server.start();
}

main().catch(async (error) => {
    console.error("Unexpected error during server startup:", error);
    await server.disconnectFromDatabase()
});

// All the error handling that don't crash the server goes inside the server class methods\

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
    process.exit(1);
});