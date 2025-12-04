// server.js (example)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config"; // loads .env
import OpenAI from "openai";

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    // Convert frontend history into OpenAI message format (optional)
    const historyMessages = Array.isArray(history)
      ? history.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text || "",
        }))
      : [];

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // or gpt-4o-mini / any chat model you prefer
      messages: [
        {
          role: "system",
          content:
            "You are Plantly AI, a friendly assistant that helps users with plant care, reminders, and this Plantly web app. Be concise and clear.",
        },
        ...historyMessages,
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a reply.";

    res.json({ reply });
  } catch (err) {
    console.error("OpenAI /api/chat error:", err);
    res
      .status(500)
      .json({ error: "AI backend error. Check server logs for details." });
  }
});

app.listen(8081, () => {
  console.log("Backend running on http://localhost:8081");
});
