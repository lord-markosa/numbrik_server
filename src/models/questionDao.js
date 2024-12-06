import {
    _createQuestion,
    _deleteQuestion,
    _getAllQuestion,
    _getQuestionById,
    _getQuestions,
    _updateQuestion,
} from "./cosmosDb/_questionDao.js";
import {
    __createQuestion,
    __deleteQuestion,
    __getAllQuestions,
    __getQuestionById,
    __getQuestions,
    __updateQuestion,
} from "./localDb/__questionDao.js";

const isDevelopment = process.env.NODE_ENV === "development";

export const getAllQuestion = isDevelopment
    ? __getAllQuestions
    : _getAllQuestion;

export const getQuestions = isDevelopment ? __getQuestions : _getQuestions;

export const createQuestion = isDevelopment
    ? __createQuestion
    : _createQuestion;

export const getQuestionById = isDevelopment
    ? __getQuestionById
    : _getQuestionById;

export const updateQuestion = isDevelopment
    ? __updateQuestion
    : _updateQuestion;

export const deleteQuestion = isDevelopment
    ? __deleteQuestion
    : _deleteQuestion;
