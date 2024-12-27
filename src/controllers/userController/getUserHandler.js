const getUserHandler = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            username: user.username,
            progressInfo: user.progressInfo,
        });
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        res.status(500).json({ message: "An error occurred" });
    }
};

export default getUserHandler;
