import {
    ADMINS_LIMIT_PER_REQUEST,
    QUESTIONS_LIMIT_PER_REQUEST,
} from "../../constants/constants.js";
import { getQuestions } from "../../models/questionDao.js";

const getQuestionsHandler = async (req, res) => {
    const { topicId } = req.params;
    const startIndex = req.query.startIndex ?? 0;

    const user = req.user;
    const isAdminCall = req.isAdminCall;

    // Initialize or retrieve the progressInfo for the given topicId
    const progressInfo = user.progressInfo[topicId] || {
        responses: {},
        solvedCount: 0,
        correctCount: 0,
    };

    try {
        // Fetch questions from the database based on the topicId and user's progress
        const questions = await getQuestions(
            topicId,
            isAdminCall ? parseInt(startIndex, 0) : progressInfo.solvedCount,
            isAdminCall ? ADMINS_LIMIT_PER_REQUEST : QUESTIONS_LIMIT_PER_REQUEST
        );

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found" });
        }

        // Return the questions in the response
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};

export default getQuestionsHandler;
