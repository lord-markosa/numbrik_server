import generateUniqueId from "../../utils/generateUniqueId.js";
import { readData, writeData } from "./localDataHandler.js";

export const __getAllQuestions = async () => (await readData()).questions;

export const __getQuestionById = async (qId) =>
    (await __getAllQuestions()).find((question) => question.id === qId);

export const __getQuestions = async (topicId, startIdx, limit) =>
    (await __getAllQuestions())
        .filter((question) => question.topicId === topicId)
        .slice(startIdx, startIdx + limit);

export async function __createQuestion(q) {
    const data = await readData();

    const inputQuestions = q.map((question) => ({
        id: generateUniqueId(),
        ...question,
    }));

    data.questions.push(...inputQuestions);
    await writeData(data);
    return inputQuestions;
}

export async function __updateQuestion(q) {
    const data = await readData();
    data.questions = data.questions.map((question) =>
        question.id === q.id ? q : question
    );
    await writeData(data);
    return q;
}

export async function __deleteQuestion(qId) {
    const data = await readData();
    data.questions = data.questions.filter((question) => question.id !== qId);
    await writeData(data);
}
