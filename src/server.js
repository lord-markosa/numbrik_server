import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDb } from "./models/db.js";
import config from "./config.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authHandler from "./middleware/authHandler.js";

const PORT = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* Web PubSub Service (Not being used yet) 
const serviceClient = new WebPubSubServiceClient(
    config.azurePsConnStr,
    config.azurePsHub
);

app.set("serviceClient", serviceClient);
*/

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + "/../public"));

app.use("/test/", testRoutes);
app.use("/api/user", userRoutes);
app.use("/api/question", authHandler, questionRoutes);
app.use("/api/admin", authHandler, adminRoutes);

initializeDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to initialize database", error);
        process.exit(1); // Exit the process with an error code
    });
