
import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.Gemini_API_Key;
if (!api_key) {
    throw new Error("Gemini_API_Key is not set in environment variables");
}
// بجهز الاتصال مع Gemini.
const genAi = new GoogleGenerativeAI(api_key);


export async function analyzeWithGemini(
    text: string,
    analysisType: "summary" | "qa" | "sentiment" | "entities" | "extract",
) {
    try {
        // getGenerativeModel : بختار موديل الجيمناي
        const model = genAi.getGenerativeModel({ model: "gemini-3.8-flash" });
        const prompts = {
            summary: `Please provide a comprehensive summary of the following document. Include main points, key findings, and conclousion:\n\n${text}`,
            qa: `Based on the following document, generate 5 important questions and their answers:\n\n${text}`,
            sentiment: `Analyze the sentiment and tone of the following document. Provide overall sentiment (positive/negative/neutral)and key emotional tones detected:\n\n${text}`,
            entities: `Extract all named entities (people, organizations, locations, dates, etc.) from the following document:\n\n${text}`,
            extract: `Extract key information from the following document in structured format:\n\n${text}`,
        };
        const prompt = prompts[analysisType];
        const result = await model.generateContent(prompt);//ببعت الطلب للـAI.
        const response = result.response;
        return response.text();
    } catch (error) {   
        console.log("Gemini error: ", error);
        return `could not analyze for ${analysisType}`;
    }

}