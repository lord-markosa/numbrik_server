import { QUESTIONS_LIMIT_PER_REQUEST } from "../../constants.js";
import { getQuestions } from "../../models/questionDao.js";
import { updateUser } from "../../models/userDao.js";

const getQuestionsHandler = async (req, res) => {
    const { topic } = req.query;
    const user = req.user;
    const currentCount = user.topicwiseProgressInfo[topic];
    try {
        const questions = await getQuestions(topic, currentCount);
        user.topicwiseProgressInfo[topic] += QUESTIONS_LIMIT_PER_REQUEST;
        await updateUser(user);

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Question", error });
    }
};

export default getQuestionsHandler;
