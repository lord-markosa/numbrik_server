import { CosmosClient } from "@azure/cosmos";
import config from "../../config.js";

let client;
let database;
let userContainer;
let questionContainer;

export async function _initializeDb() {
    client = new CosmosClient({
        endpoint: config.dbHost,
        key: config.dbAuthKey,
    });
    try {
        const dbResponse = await client.databases.createIfNotExists({
            id: config.databaseId,
        });
        database = dbResponse.database;

        const userConRes = await database.containers.createIfNotExists({
            id: config.userContainer,
        });
        userContainer = userConRes.container;

        const questionConRes = await database.containers.createIfNotExists({
            id: config.questionContainer,
        });
        questionContainer = questionConRes.container;

        console.log("Initialized database");
    } catch (error) {
        console.error("Error initializing database", error);
    }
}

export const getUserItems = () => userContainer.items;
export const getUserItemById = (id) => userContainer.item(id);

export const getQuestionItems = () => questionContainer.items;
export const getQuestionItemById = (id) => questionContainer?.item(id);
