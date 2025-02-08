import Anthropic from "@anthropic-ai/sdk/index.mjs";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages;

  // Ensure 'messages' is correctly formatted
  if (!Array.isArray(messages) || messages.some(msg => !msg.role || !msg.content)) {
    return new Response(JSON.stringify({ error: "Invalid message format" }), { status: 400 });
  }

  const msg = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    temperature: 0,
    system: "Respond only with short poems.",
    messages: [...messages]
  });

  return Response.json(msg);
}
  