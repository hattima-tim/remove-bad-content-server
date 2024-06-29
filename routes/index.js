var express = require("express");
var router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: { responseMimeType: "application/json" },
});

router.post("/ai", async function (req, res) {
  const prompt = `Act as a software which takes in an array of news headlines and returns only the negative news headlines. 
  Give me all the negative news headlines from the following headline list: ${req.body.text}.
  For example if I give the following headlines:
  ['someone is dead','someone won something','someone did something good','someone got raped','someone did suicide']
  you will give me the following json without giving any other text or anything:
  ['someone is dead','someone got raped','someone did suicide']
  Follow the above format in json. If there is no negative news give me an empty array (e.g., []). 
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json(JSON.parse(text));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
