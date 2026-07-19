import mongoose from "mongoose";
// import { setServers } from "node:dns/promises";

// setServers(["1.1.1.1", "8.8.8.8"]);

export async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }

        const conn = await mongoose.connect(mongoURI);

        console.log("Connected to MongoDB", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit the process with failure (1: failed 0: success)
    }
}