import { deleteQuestion, getQuestionById } from "../../models/questionDao.js";

const deleteQuestionHandler = async (req, res) => {
    const questionId = req.params.id;
    try {
        // get the question
        const question = await getQuestionById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // check if the user is the creator of the question
        if (question.createdBy !== req.user.username) {
            return res
                .status(403)
                .json({ message: "You are not the creator of this question" });
        }

        // delete the question
        await deleteQuestion(questionId);
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting question", error });
    }
};

export default deleteQuestionHandler;
