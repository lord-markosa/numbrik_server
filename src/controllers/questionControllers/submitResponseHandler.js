import { updateUser } from "../../models/userDao.js";

const submitResponseHandler = async (req, res) => {
    const { topicId } = req.params;
    const { responses, correctCount, solvedCount } = req.body;

    try {
        // Find the user by ID
        const user = req.user;

        // Initialize or retrieve the progressInfo for the given topicId
        const progressInfo = user.progressInfo[topicId] || {
            responses: {},
            solvedCount: 0,
            correctCount: 0,
        };

        // Update the responses and counts
        Object.entries(responses).forEach(([questionId, response]) => {
            progressInfo.responses[questionId] = response;
        });

        // Update the counts
        progressInfo.correctCount += correctCount;
        progressInfo.solvedCount += solvedCount;

        // Update the progressInfo in the user object
        user.progressInfo[topicId] = progressInfo;

        // increment the diamonds count
        user.diamonds += correctCount;

        // Update the user in the database
        await updateUser(user);

        res.status(200).json({ message: "Response submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export default submitResponseHandler;
