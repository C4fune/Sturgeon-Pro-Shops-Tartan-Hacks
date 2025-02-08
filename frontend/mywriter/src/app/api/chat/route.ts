export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages;

  if (!Array.isArray(messages) || messages.some(msg => !msg.role || !msg.content)) {
    return new Response(
      JSON.stringify({ error: "Invalid message format" }),
      { status: 400 }
    );
  }

  try {
    const data = await openaiRequest(messages)
    return new Response(JSON.stringify(data), { status: 200 });

  } catch(error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

}

export async function openaiRequest(messages: any) {
  try {
    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    if (!response.ok) {
      // throw Error("Not ok!")
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return Error(errorData)
    }

    return await response.json();
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}