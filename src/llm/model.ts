import { ChatOllama } from "@langchain/ollama";

export const model = new ChatOllama({
    model : 'deepseek-coder:6.7b',
    temperature : 0.2
})