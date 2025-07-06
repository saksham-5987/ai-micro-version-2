import  express from "express";
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  console.log("Received POST on /");


  const input = req.body.message; 


  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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",
        "HTTP-Referer": "http://127.0.0.1:5500",
        "X-Title": "my-ai-test"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-70b-instruct",
        messages: [
          { role: "user", content: input }
        ]
      })
    });
   

    const res2 = await response.json();
    console.log("AI Response:", res2.choices[0].message.content);

    console.log("AI raw response: ", JSON.stringify(res2, null, 2));

    if (res2 && res2.choices && res2.choices.length > 0) {
      const aiOutput = res2.choices[0].message.content;
      console.log("AI Response:", aiOutput);
      res.send(aiOutput)
    } else {
      console.log("Invalid AI response:", res2);
      res.status(500).json({ error: "Invalid AI response", raw: res2 });
    }
      
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "AI API request failed." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
