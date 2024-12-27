import { updateTopics } from "../../models/topics/topicsUtil.js";

const updateTopicsHandler = async (req, res) => {
    const { topics } = req.body;

    if (!Array.isArray(topics)) {
        return res.status(400).json({ message: "Invalid topics format" });
    }

    res.status(200).json(await updateTopics(topics));
};

export default updateTopicsHandler;
