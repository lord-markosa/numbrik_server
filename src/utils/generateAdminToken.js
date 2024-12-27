import jwt from "jsonwebtoken";
import config from "../config.js";

export default function generateAdminToken(id) {
    return jwt.sign({ id }, config.adminKey, { expiresIn: "12h" });
}
