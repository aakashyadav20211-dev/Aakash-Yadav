import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Create Gemini AI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

const app = express();
app.use(express.json());

// API route for Gemini Property Recommendations
app.post("/api/gemini/recommend", async (req, res) => {
  try {
    const { message, history, userPreferences } = req.body;
    
    if (!ai) {
      return res.status(503).json({ 
        error: "AI Advisor is currently unavailable. Please check your Gemini API key in Settings > Secrets." 
      });
    }

    const systemInstruction = `You are the Chief AI Real Estate Advisor for "Aura Luxury Estates", an ultra-premium real estate agency catering to elite clients globally.
Your tone is sophisticated, expert, warm, and highly persuasive.

Key Contact Details for Private Consultations:
- Contact Agent: Aakash Yadav (Creative Director & Senior Advisor)
- Phone/WhatsApp: +91 8340650759
- Email: aakashyadav2024@gmail.com

When responding, incorporate elite luxury architectural and design details: biophilic landscaping, double-height thermal-pane glass, brutalist travertine walls, bespoke Italian marble, infinity-edge pools, smart automation, and private helipads. Reference elite locations like Bel Air, Monaco, Palm Jumeirah, Knightsbridge, Malibu, Aspen, and South Mumbai Malabar Hill.
Always discuss pricing, asset valuations, and rentals in Indian Rupees (INR, formatted as ₹, Crore, Lakh) rather than US Dollars or other currencies.
Keep your answer structured, elegant, concise (under 200 words), and end with an exclusive CTA to contact Aakash Yadav for a private digital viewing or scheduled walkthrough. Use markdown formatting beautifully (bolding, lists) to emphasize pricing and features.`;

    let contextPrompt = ``;
    if (userPreferences) {
      contextPrompt += `Client Criteria:\n`;
      contextPrompt += `- Acquisition Type: ${userPreferences.mode || 'Flexible'}\n`;
      contextPrompt += `- Selected Typology: ${userPreferences.type || 'Any'}\n`;
      contextPrompt += `- Location of Interest: ${userPreferences.location || 'Global'}\n`;
      contextPrompt += `- Budget Threshold: ${userPreferences.budget ? `₹${(userPreferences.budget / 10000000).toFixed(2)} Crore` : 'Ultra High Net Worth (Flexible)'}\n\n`;
    }
    contextPrompt += `Client Message: "${message}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Advisor Error:", error);
    res.status(500).json({ error: "Failed to consult our elite AI advisor: " + error.message });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

const PORT = 3000;

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aura Estates Server] Running on http://0.0.0.0:${PORT}`);
  });
}

start();
