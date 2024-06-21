var express = require("express");
var router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

router.post("/ai", async function (req, res) {
  const prompt = `Give the news headlines which includes story about rape, death, suicide, killing from the following headline list: ${req.body.text}.
  Give me only the headlines in return. For example if I give the following headlines:
  ['someone is dead','someone won something','someone did something good','someone got raped','someone did suicide']
  you will give me the following json without giving any other text or anything:
  ['someone is dead','someone got raped','someone did suicide']
  Follow the above format in json.
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
