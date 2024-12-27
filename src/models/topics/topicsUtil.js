import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "../../utils/fileUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const topicsFilePath = path.join(__dirname, "topics.json");

export const getTopics = async () => await readFile(topicsFilePath);

export const updateTopics = async (
    topics /* [{id:"s_no", name:"topic_name", description:"topic_desc"}] */
) => {
    const currentTopics = await getTopics();
    const topicsData = { ...currentTopics, ...topics };

    await writeFile(topicsFilePath, topicsData);
    return topicsData;
};
