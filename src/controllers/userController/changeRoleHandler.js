import { getUserById, updateUser } from "../../models/userDao.js";

const changeRoleHandler = async (req, res) => {
    const { userId, role } = req.body;
    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await updateUser(user);
    res.status(200).json({ message: "User is now an admin" });
};

export default changeRoleHandler;
