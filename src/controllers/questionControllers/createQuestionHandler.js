import { createQuestion } from "../../models/questionDao.js";

const createQuestionHandler = async (req, res) => {
    const { questions } = req.body;

    try {
        const final = await createQuestion(
            questions.map((q) => ({
                topicId: q.topicId ?? "Miscellaneous",
                tags: q.tags ?? [],
                lod: q.lod ?? 1,
                problemStatement: q.problemStatement,
                options: q.options,
                hint: q.hint,
                solution: q.solution,
                answer: q.answer,
                correctOption: q.correctOption,
                type: q.type ?? "singleCorrect",
                createdAt: new Date(),
                createdBy: req.user.id,
            }))
        );
        res.status(201).json(final);
    } catch (error) {
        res.status(500).json({ message: "Error creating question", error });
    }
};

export default createQuestionHandler;
