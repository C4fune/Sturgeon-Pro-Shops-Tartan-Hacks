export async function POST(req: Request) {
    const body = await req.json()
    const messages = body.messages
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages
      })
    })
    const data = await response.json()
    return new Response(JSON.stringify(data))
  }
  