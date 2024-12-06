import { _initializeDb } from "./cosmosDb/_db.js";

const isDevelopment = process.env.NODE_ENV === "development";

export const initializeDb = () =>
    new Promise((resolve, reject) => {
        if (isDevelopment) {
            console.log("Skipping database initialization in development mode");
            resolve();
        } else {
            console.log("Initializing database");
            try {
                _initializeDb();
            } catch (error) {
                console.error("Error initializing database", error);
                reject(error);
            }
        }
    });
