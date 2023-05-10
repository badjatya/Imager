import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openAi.createImage({
            prompt,
            n: 1,
            size: "512x512",
            response_format: "b64_json",
        });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).send(
            error?.response.data.error.message || "Something went wrong"
        );
    }
});

export default router;
