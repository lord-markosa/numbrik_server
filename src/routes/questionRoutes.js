import express from "express";
import createQuestionHandler from "../controllers/questionControllers/createQuestionHandler.js";
import deleteQuestionHandler from "../controllers/questionControllers/deleteQuestionHandler.js";
import updateQuestionHandler from "../controllers/questionControllers/updateQuestionHandler.js";
import getQuestionsHandler from "../controllers/questionControllers/getQuestionsHandler.js";
import getAllQuestionsHandler from "../controllers/questionControllers/getAllQuestionsHandler.js";

const router = express.Router();

// get all questions is for admins and not yet implemented
router.get("/", getAllQuestionsHandler);

router.get("/:topic", getQuestionsHandler);

// Add a new question
router.post("/", createQuestionHandler);

// Update a question
router.patch("/:id", updateQuestionHandler);

// Delete a question
router.delete("/:id", deleteQuestionHandler);

const questionRoutes = router;
export default questionRoutes;
