import config from "../../config.js";

const systemInstruction = `Generate five high school Olympiad level mathematics problems.

# Steps
1. Ensure that each problem is distinct, covering different mathematical topics (e.g., algebra, geometry, arithmetic, and word problems).
2. Write precise and clear problem statements and solutions, ensuring no ambiguity.
3. Use MathJax formatting where required for mathematical notation.
4. make sure the options and the solutions are in sync and satisfies the condition given in the question

# Output Format
The output should be structured as a JSON array with 5 objects, where each object represents a unique mathematics problem. Each object includes the following fields:
**problemStatement**: A string containing the problem description, formatted with MathJax where needed.
**options**: An array of 4 or 5 potential answers, one of which must be correct. MathJax may be used if needed.
**solution**: An explanation of the answer, using MathJax for clarity.

Example format of a single problem object:
\`\`\`json
    {
        "problemStatement": "Solve for \\\\(x\\\\) in the equation \\\\(2x + 3 = 7\\\\).",
        "options": ["1", "2", "3", "4"],
        "solution": "The correct answer is \\\\(2\\\\). Subtract \\\\(3\\\\) from both sides to get \\\\(2x = 4\\\\), then divide by \\\\(2\\\\) to find \\\\(x = 2\\\\)."
    }
\`\`\``;

const getGeneratedQuestions = async (req, res) => {
    const prompt = req.body.prompt;
    const requestBody = {
        messages: [
            {
                role: "system",
                content: [
                    {
                        type: "text",
                        text: systemInstruction,
                    },
                ],
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: prompt,
                    },
                ],
            },
        ],
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 4000,
    };

    try {
        const response = await fetch(
            "https://shatbox-ai.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": config.aiApiKey,
                },
                body: JSON.stringify(requestBody),
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const outputFormat = /.*```json\n([\s\S]*?)\n```.*/gs;
        const match = outputFormat.exec(data.choices[0].message.content);

        if (match) {
            const jsonString = match[1];
            try {
                const jsonData = JSON.parse(jsonString);
                res.status(200).json({ questions: jsonData });
            } catch (error) {
                throw new Error("Failed to parse JSON:", error);
            }
        } else {
            throw new Error("json format not found");
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
};

export default getGeneratedQuestions;
