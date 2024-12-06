import express from "express";
import registerUserHandler from "../controllers/userController/registerUserHandler.js";
import loginUserHandler from "../controllers/userController/loginUserHandler.js";
import getUserHandler from "../controllers/userController/getUserHandler.js";
import verifyToken from "../middleware/authHandler.js";
// import generateToken from "../utils/generateToken.js";

const router = express.Router();

// User registration
router.post("/register", registerUserHandler);

// User login
router.post("/login", loginUserHandler);

// Fetch user data from token
router.get("/data", verifyToken, getUserHandler);

/* Web PubSub token negotiation
const negotiate = async (req, userId) => {
    const serviceClient = req.app.get("serviceClient");
    try {
        return await serviceClient.getClientAccessToken({
            userId,
        });
    } catch (error) {
        console.error(`Error negotiating token: ${error}`);
        return null;
    }
};
*/

const userRoutes = router;
export default userRoutes;
