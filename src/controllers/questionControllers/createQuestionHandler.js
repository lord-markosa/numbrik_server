import { createQuestion } from "../../models/questionDao.js";

const createQuestionHandler = async (req, res) => {
    const { tags, lod, problemStatement, options, hint, solution, answer } =
        req.body;

    try {
        res.status(201).json(
            await createQuestion({
                tags,
                lod,
                problemStatement,
                options,
                hint,
                solution,
                answer,
                createdAt: new Date(),
                createdBy: req.user.id,
            })
        );
    } catch (error) {
        res.status(500).json({ message: "Error creating question", error });
    }
};

export default createQuestionHandler;
