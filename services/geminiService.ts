import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

// Initialize Gemini Client
// CRITICAL: The API key is obtained exclusively from the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const createChatSession = (systemInstruction: string) => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: systemInstruction,
    },
    history: [],
  });
};

export const sendMessageStream = async (
  chat: Chat,
  message: string,
  onChunk: (text: string) => void
) => {
  try {
    const result = await chat.sendMessageStream({ message });
    
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    onChunk("\n[Error: Unable to connect to ActAs AI. Please check your network connection.]");
  }
};