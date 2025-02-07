import express from "express";
import adminAuthHandler from "../middleware/adminAuthHandler.js";
import setRequestedUser from "../controllers/adminControllers/setRequestedUser.js";
import getUserHandler from "../controllers/userController/getUserHandler.js";
import getQuestionsHandler from "../controllers/questionControllers/getQuestionsHandler.js";
import createQuestionHandler from "../controllers/questionControllers/createQuestionHandler.js";
import getGeneratedQuestions from "../controllers/aiControllers/getGeneratedQuestions.js";

const router = express.Router();

// Admin authentication middleware
router.use(adminAuthHandler);

// Get questions for a topic
router.get("/get-questions/:topicId", getQuestionsHandler);

// Get user details
router.post("/get-user", setRequestedUser, getUserHandler);

// Add a new question
router.post("/create-question", createQuestionHandler);

// Generate questions using AI
router.post("/generate-questions", getGeneratedQuestions);

const adminRoutes = router;
export default adminRoutes;
