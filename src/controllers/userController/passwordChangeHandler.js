import bcrypt from "bcryptjs";
import { getUserById, updateUser } from "../../models/userDao.js";

const passwordChangeHandler = async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user.id;

    try {
        // Retrieve the user by ID
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedNewPassword;
        await updateUser(user);

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error changing password", error });
    }
};

export default passwordChangeHandler;
