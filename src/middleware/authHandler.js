import jwt from "jsonwebtoken";
import config from "../config.js";
import { getUserById } from "../models/userDao.js";

export default async function (req, res, next) {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token is defined
    if (!token) {
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        // Get user by id extracted from token
        const user = await getUserById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Set user to request
        req.user = user;

        // send to the next handler
        next();
    } catch (err) {
        res.status(401).json({ message: `Token is not valid\n${err}` });
    }
}
