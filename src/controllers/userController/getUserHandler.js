const getUserHandler = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            message: "User data fetched successfully",
            token: user.token,
            username: user.username,
        });
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        res.status(500).json({ message: "An error occurred" });
    }
};

export default getUserHandler;
