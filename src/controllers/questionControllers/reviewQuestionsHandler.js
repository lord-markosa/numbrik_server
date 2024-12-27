import { getQuestions } from "../../models/questionDao.js";

const reviewQuestionsHandler = async (req, res) => {
    const { topicId } = req.params;

    // Retrieve the user's progress information for the given topicId
    const progressInfo = req.user.progressInfo[topicId];

    // If no progress information is found for the topic, return a 404 response
    if (!progressInfo) {
        res.status(200).json({
            questions: [],
            responses: [],
            correctCount: 0,
            solvedCount: 0,
        });
        return;
    }

    // Destructure responses, correctCount, and solvedCount from the user's progress information
    const { responses, correctCount, solvedCount } = progressInfo;

    try {
        // Fetch questions from the database based on the topicId and solvedCount
        const questions = await getQuestions(topicId, 0, solvedCount);

        res.status(200).json({
            questions,
            responses,
            correctCount,
            solvedCount,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export default reviewQuestionsHandler;
