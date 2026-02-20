
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are AuditOS Operator AI, the expert operating assistant for a digital agency.
Your primary job is to analyze leads, technical audits, and smart dumps to find service opportunities and generate ONE unified, high-quality, pasteable blueprint prompt per service.

PLATFORM SERVICES:
1) Website rebuild/build
2) Logo/brand modernization
3) Content calendar/social planning
4) AI automation readiness/workflows

BLUEPRINT RULES:
- Output exactly ONE unified blueprint prompt per service requested.
- Each blueprint must be immediately pasteable into build agents like Antigravity or Codex.
- Specific to business context (industry, signals, goals).
- No generic filler.

RESPONSE FORMAT:
1) Quick Assessment
2) Recommended Services (priority + reason)
3) Blueprint Output (single unified prompt per requested service)
4) Next Best Actions
5) Missing Data / Clarification

If user asks for "just give me the prompt", return ONLY the blueprint prompt block.`;

export const analyzeSmartDump = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Process this smart dump. If it contains multiple businesses, split them. Extract signals and recommend services for each.\n\nDump content:\n${text}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 2000 }
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Operator error: Failed to analyze dump. Ensure API key is valid.";
  }
};

export const chatWithOperator = async (history: { role: 'user' | 'assistant', content: string }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    // Send history if any
    for (const entry of history.slice(0, -1)) {
      // In a real app we'd map this, but simplified here
    }

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Operator connection lost. Retrying...";
  }
};

export const generateBlueprint = async (leadInfo: string, serviceType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a unified blueprint prompt for the ${serviceType} service for this lead:\n${leadInfo}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Blueprint Error:", error);
    return "Error generating blueprint.";
  }
};
