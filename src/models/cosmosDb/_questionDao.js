import { QUESTIONS_LIMIT_PER_REQUEST } from "../../constants.js";
import { getQuestionItemById, getQuestionItems } from "./_db.js";

export async function _getAllQuestion() {
    const { resources } = await getQuestionItems().readAll().fetchAll();
    return resources;
}

export async function _getQuestions(topic, currentCount) {
    const querySpec = {
        query: "SELECT * FROM c WHERE c.topic = @topic OFFSET @currentCount LIMIT @limit",
        parameters: [
            { name: "@topic", value: topic },
            { name: "@currentCount", value: currentCount },
            { name: "@limit", value: QUESTIONS_LIMIT_PER_REQUEST },
        ],
    };

    const { resources } = await getQuestionItems().query(querySpec).fetchAll();
    return resources;
}

export async function _createQuestion(q) {
    const { resource } = await getQuestionItems().create(q);
    return resource;
}

export async function _getQuestionById(qId) {
    const { resource } = await getQuestionItemById(qId).read();
    return resource;
}

export async function _updateQuestion(q) {
    const { resource } = await getQuestionItems().upsert(q);
    return resource;
}

export async function _deleteQuestion(qId) {
    return await getQuestionItemById(qId).delete();
}
