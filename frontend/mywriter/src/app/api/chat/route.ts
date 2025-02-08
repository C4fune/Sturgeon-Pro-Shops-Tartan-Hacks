export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.some(msg => !msg.role || !msg.content)) {
      return new Response(
        JSON.stringify({ error: "Invalid message format" }),
        { status: 400 }
      );
    }

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
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return new Response(JSON.stringify({ error: errorData }), {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: unknown) {
    // Handle unexpected errors.
    if (error instanceof Error) {
      console.error("Server Error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return new Response(
      JSON.stringify({ error: "An unknown error occurred" }),
      { status: 500 }
    );
  }
}
