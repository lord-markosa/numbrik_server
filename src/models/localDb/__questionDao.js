import { QUESTIONS_LIMIT_PER_REQUEST } from "../../constants.js";
import generateUniqueId from "../../utils/generateUniqueId.js";
import { readData, writeData } from "./localDataHandler.js";

export const __getAllQuestions = async () => (await readData()).questions;

export const __getQuestionById = async (qId) =>
    (await __getAllQuestions()).find((question) => question.id === qId);

export const __getQuestions = async (topic, currentCount) =>
    (await __getAllQuestions())
        .filter((question) => question.topic === topic)
        .slice(currentCount, currentCount + QUESTIONS_LIMIT_PER_REQUEST);

export async function __createQuestion(q) {
    const data = await readData();
    data.questions.push({ id: generateUniqueId(), ...q });
    await writeData(data);
    return data.questions[data.questions.length - 1];
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
