import { getQuestionItemById, getQuestionItems } from "./_db.js";

export async function _getAllQuestion() {
    const { resources } = await getQuestionItems().readAll().fetchAll();
    return resources;
}

export async function _getQuestions(topicId, startIdx, limit) {
    const querySpec = {
        query: "SELECT * FROM c WHERE c.topicId = @topicId OFFSET @startIdx LIMIT @limit",
        parameters: [
            { name: "@topicId", value: topicId },
            { name: "@startIdx", value: startIdx },
            { name: "@limit", value: limit },
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
