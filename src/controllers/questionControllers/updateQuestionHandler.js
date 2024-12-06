import { getQuestionById, updateQuestion } from "../../models/questionDao.js";

const updateQuestionHandler = async (req, res) => {
    const { tags, lod, problemStatement, options, hint, solution, answer } =
        req.body;

    try {
        // get the question
        let question = await getQuestionById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // check if the user is the creator of the question
        if (question.createdBy !== req.user.username) {
            return res
                .status(403)
                .json({ message: "You are not the creator of this question" });
        }

        question = {
            ...question,
            tags,
            lod,
            problemStatement,
            options,
            hint,
            solution,
            answer,
        };

        // update the question
        await updateQuestion(question);
        res.status(200).json({ message: "Question updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating question", error });
    }
};

export default updateQuestionHandler;
