import express from "express";

const router = express.Router();

router.get("/hello-world", (_, res) => {
    res.json({ message: "Hello, world!" });
});

const testRoutes = router;
export default testRoutes;
