import bcrypt from "bcryptjs";
import { createUser, getUserByUsername } from "../../models/userDao.js";
import generateToken from "../../utils/generateToken.js";

const registerUserHandler = async (req, res) => {
    const { username, password, phoneNumber, email } = req.body;

    try {
        // Check if username already exists
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user

        const newUser = await createUser({
            username,
            password: hashedPassword,
            phoneNumber,
            email,
            topicwiseProgressInfo: {},
        });

        const userId = newUser.id;

        // Generate JWT token
        const token = generateToken(userId);

        // Send response with token, success message
        res.status(201).json({
            message: "User registered successfully",
            token,
            username: newUser.username,
        });
    } catch (error) {
        console.error(`Error registering user: ${error}`);
        res.status(500).json({ message: "An error occurred" });
    }
};

export default registerUserHandler;
