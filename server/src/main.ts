import server from "./app/server";
import "dotenv/config";

async function main() {
    await server.connectToDatabase();
    server.start();
}

main().catch((error) => {
    console.error("Unexpected error during server startup:", error);
});