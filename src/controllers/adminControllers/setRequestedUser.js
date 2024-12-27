import { getUserByUsername } from "../../models/userDao.js";

const setRequestedUser = async (req, res, next) => {
    const { username } = req.body;
    const user = await getUserByUsername(username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
};

export default setRequestedUser;
