import { getTopics } from "../../models/topics/topicsUtil.js";

const getTopicsHandler = async (_, res) =>
    res.status(200).json(await getTopics());

export default getTopicsHandler;
