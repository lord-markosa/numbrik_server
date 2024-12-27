import jwt from "jsonwebtoken";
import config from "../config.js";

export default function adminAuthHandler(req, res, next) {
    const adminToken = req.headers["x-admin-token"]?.split(" ")[1];

    try {
        // Check if the user is an admin and if the x-admin-token header is valid
        const decoded = jwt.verify(adminToken, config.adminKey);
        // double check if the admin token has the same user id and role as admin
        if (
            req.user &&
            req.user.role === "admin" &&
            decoded.id === req.user.id
        ) {
            req.isAdminCall = true;
            next();
        } else {
            throw new Error(
                "Access denied. Invalid admin key or not an admin."
            );
        }
    } catch (err) {
        res.status(401).json({ message: `Token is not valid. ${err}` });
    }
}
