import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { queueId, authorPrompt } = body;
  const responseText = "This is a dummy response for queue item " + queueId + " with prompt: " + authorPrompt;
  return NextResponse.json({ response: responseText });
}
