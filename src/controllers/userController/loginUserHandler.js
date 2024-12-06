import bcrypt from "bcryptjs";
import { getUserByUsername } from "../../models/userDao.js";

const loginUserHandler = async (req, res) => {
    const { username, password } = req.body;
    try {
        // get the user by username
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: "Invalid loginId" });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({ message: "Invalid password" });
        }

        // Send response with existing token, success message, storyList, and chats
        res.json({
            message: "Login successful",
            token: user.token,
            username,
        });
    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        res.status(500).json({ message: "An error occurred" });
    }
};

export default loginUserHandler;
