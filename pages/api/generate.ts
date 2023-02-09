import type { NextRequest } from "next/server";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import { generatePrompt, languages, languageType } from "../../utils/prompt";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { bio, language } = (await req.json()) as GenerateRequestBody;

  if (!bio) {
    return new Response("No bio in the request", { status: 400 });
  }

  if (!language || !languages.includes(language)) {
    return new Response("Invalid language", { status: 400 });
  }

  const prompt = generatePrompt(bio, language);

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
