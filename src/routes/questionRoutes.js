import express from "express";
import deleteQuestionHandler from "../controllers/questionControllers/deleteQuestionHandler.js";
import updateQuestionHandler from "../controllers/questionControllers/updateQuestionHandler.js";
import getQuestionsHandler from "../controllers/questionControllers/getQuestionsHandler.js";
import submitResponseHandler from "../controllers/questionControllers/submitResponseHandler.js";
import reviewQuestionsHandler from "../controllers/questionControllers/reviewQuestionsHandler.js";

const router = express.Router();

// DISABLED
// get all questions is for admins and not yet implemented
// router.get("/", getAllQuestionsHandler);

// get questions for a topic (to solve)
router.get("/:topicId", getQuestionsHandler);

// Review (fetch previously solved questions)
router.get("/review/:topicId", reviewQuestionsHandler);

// Record response for a set of questions
router.post("/response/:topicId", submitResponseHandler);

// Update a question
router.patch("/:id", updateQuestionHandler);

// Delete a question
router.delete("/:id", deleteQuestionHandler);

const questionRoutes = router;
export default questionRoutes;
