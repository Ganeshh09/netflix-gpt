// geminiapi.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./constants";

// For learning/demo purposes, this is a placeholder.
// In production, your API key should be securely handled on a backend server.
const genAI = new GoogleGenerativeAI("AIzaSyB_rnCww1bvBXTVNRNK87tIJlrYAylykW0");

export const fetchFromGemini = async (movieName) => {
  try {
    // Specify the model to ensure a consistent, supported version.
    // 'gemini-2.5-flash' is a good choice for low-latency tasks.
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // The prompt is simplified because the response schema handles the format.
    const prompt = `Recommend 5 movies that are similar to "${movieName}" based on genre, plot, and overall tone.`;

    // Define the schema for a JSON array of strings.
    // This tells Gemini exactly what structure to return.
    const responseSchema = {
      type: "ARRAY",
      items: {
        type: "STRING",
      },
    };

    // Make the API call with the generation configuration.
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        // Enforce JSON output.
        responseMimeType: "application/json",
        // Enforce the specific structure using the defined schema.
        responseSchema: responseSchema,
      },
      // You can also add safety settings to block harmful content.
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    // The SDK's response object contains the structured content directly.
    // No need for manual JSON.parse() or string manipulation.
    const movies = result.response.candidates[0].content.parts[0].text;

    return JSON.parse(movies);
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return [];
  }
};