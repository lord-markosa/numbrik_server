import path from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "../../utils/fileUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, "localData.json");

export const readData = async () => await readFile(dataFilePath);

export const writeData = async (data) => await writeFile(dataFilePath, data);
