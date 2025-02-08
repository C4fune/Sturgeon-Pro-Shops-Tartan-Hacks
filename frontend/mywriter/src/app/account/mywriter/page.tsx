"use client"
import { useState } from "react"

export default function MyWriterPage() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<
    { user: string; assistant: string }[]
  >([])

  async function handleSend() {
    if (!input) return
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: input }] })
    })
    const data = await res.json()
    const assistantReply = data.choices?.[0]?.message?.content || ""
    setHistory([...history, { user: input, assistant: assistantReply }])
    setInput("")
  }

  return (
    <main className="flex min-h-screen">
      <aside className="w-1/4 border-r p-4">
        <h1 className="text-xl mb-4">Main</h1>
        <h2 className="mb-2">Choose the prompt mode!</h2>
        <div className="mb-2">
          <input type="radio" name="promptMode" id="videoMode" />
          <label htmlFor="videoMode"> Video Prompts</label>
        </div>
        <div className="mb-2">
          <input type="radio" name="promptMode" id="textMode" defaultChecked />
          <label htmlFor="textMode"> Text Prompts</label>
        </div>
        <div>
          <input type="checkbox" id="darkMode" />
          <label htmlFor="darkMode"> Dark mode</label>
        </div>
      </aside>
      <section className="flex-1 p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">MyWriter Ver 1.0.0 Feb 7</h1>
          <p className="text-sm">[USERNAME]</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div>
            <h2 className="font-semibold mb-2">Examples</h2>
            <p>Create me a short and funny horror story I can read before I go to bed.</p>
            <p>Can you tell me which authors are currently available?</p>
            <p>I want to change my current preference for text prompts.</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Capabilities</h2>
            <p>Remembers what user said earlier in the conversation.</p>
            <p>Allows user to provide follow-up corrections.</p>
            <p>Trained to decline inappropriate requests.</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Limitations</h2>
            <p>May occasionally generate incorrect information.</p>
            <p>May occasionally produce harmful instructions that might set you back.</p>
            <p>Overwhelming disparity of user-base preferences can lead into prompt return delay.</p>
          </div>
        </div>
        <div className="mb-4">
          {history.map((h, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">You: {h.user}</p>
              <p className="italic">GPT: {h.assistant}</p>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 flex items-center">
          <input
            className="flex-1 border p-2 mr-2"
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className="border px-4 py-2">
            Send
          </button>
        </div>
      </section>
    </main>
  )
}
