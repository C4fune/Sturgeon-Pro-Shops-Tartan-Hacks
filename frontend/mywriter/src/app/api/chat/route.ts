export async function POST(req: Request) {
    try {
      const body = await req.json();
      const messages = body.messages;
  
      // Ensure 'messages' is correctly formatted
      if (!Array.isArray(messages) || messages.some(msg => !msg.role || !msg.content)) {
        return new Response(JSON.stringify({ error: "Invalid message format" }), { status: 400 });
      }
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Ensure the model is correct
          messages
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData }), { status: response.status });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: unknown) {
      // Handle error: type assertion
      if (error instanceof Error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
      
      // Fallback for unknown errors
      return new Response(JSON.stringify({ error: "An unknown error occurred" }), { status: 500 });
    }
  }
  