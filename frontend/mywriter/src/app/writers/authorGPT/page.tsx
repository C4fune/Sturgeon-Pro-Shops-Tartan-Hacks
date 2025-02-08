"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface QueueItem {
  id: string;
  followerName: string;
  followerEmail: string;
  prompt: string;
  analysis: string;
}

export default function MyWriterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queueId = searchParams.get("queueId");

  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const [history, setHistory] = useState<{ user: string; assistant: string }[]>([]);

  // State for the queue item (if a queueId is provided)
  const [queueItem, setQueueItem] = useState<QueueItem | null>(null);
  const [loadingQueue, setLoadingQueue] = useState(!!queueId);

  // If a queueId exists, fetch the corresponding queue item
  useEffect(() => {
    if (!queueId) return;
    async function fetchQueueItem() {
      try {
        const res = await fetch(`/api/writer/queue/${queueId}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setQueueItem(data);
        } else {
          console.error("Failed to fetch queue item");
        }
      } catch (err) {
        console.error("Error fetching queue item:", err);
      } finally {
        setLoadingQueue(false);
      }
    }
    fetchQueueItem();
  }, [queueId]);

  function returnToBookshelf() {
    router.push("/account/bookshelf");
  }

  async function handleSend() {
    if (!input) return;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: input }] }),
      });
      const data = await res.json();

      // Check if there was an error in the API response.
      if (data.error) {
        console.error("API Error:", data.error);
        setHistory((prev) => [
          ...prev,
          { user: input, assistant: "Error: " + JSON.stringify(data.error) },
        ]);
      } else {
        console.log(data);
        const assistantReply =
          data.choices?.[0]?.message?.content || "No response from API";
        setHistory((prev) => [
          ...prev,
          { user: input, assistant: assistantReply },
        ]);
      }
      setInput("");
    } catch (err) {
      console.error("Fetch error:", err);
      setHistory((prev) => [
        ...prev,
        { user: input, assistant: "Error sending message" },
      ]);
      setInput("");
    }
  }

  // Set the header text:
  // If we're still loading the queue, display "Loading..."
  // If a queue item was fetched, show its followerName; otherwise, default to "Main".
  const headerText = loadingQueue
    ? "Loading..."
    : queueItem
    ? queueItem.followerName
    : "Main";

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white"}>
      <main className="relative flex min-h-screen">
        <aside className="w-1/4 border-r p-4">
          {/* Use the queue’s username (followerName) if available */}
          <h1 className="text-2xl mb-4">{headerText}</h1>
          <p className="text-lg mb-2">Choose the prompt mode!</p>
          <div className="border border-gray-300 rounded p-3 mb-3">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="promptMode"
                id="videoMode"
                className="checked:bg-battleship checked:border-battleship"
              />
              <label htmlFor="videoMode" className="ml-2">
                Video Prompts
              </label>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              “Creative mode” could refer to a chatbot or AI language model designed to assist and inspire creativity. Such a chatbot or AI model might provide prompts, suggest ideas, or even generate content for creative projects.
            </p>
          </div>
          <div className="border border-gray-300 rounded p-3 mb-3">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="promptMode"
                id="textMode"
                defaultChecked
                className="checked:bg-battleship checked:border-battleship"
              />
              <label htmlFor="textMode" className="ml-2">
                Text Prompts
              </label>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              “Balance mode” generally refers to an AI chatbot or language model designed to strike a balance between providing helpful responses and maintaining appropriate boundaries with users.
            </p>
          </div>
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="darkMode"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <label htmlFor="darkMode" className="ml-2">
                Dark mode
              </label>
            </div>
          </div>
        </aside>
        <section className="flex-1 p-4">
          <div className="flex justify-end mb-4">
            <p className="flex items-center font-semibold">
              {session?.user?.name}
            </p>
          </div>
          <div className="text-left mb-6">
            <h1 className="text-3xl font-bold">MyWriter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ver 1.0.0 Feb 7
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-left mb-6">
            <div className="border border-gray-200 rounded p-4">
              <h2 className="font-semibold mb-2">Examples</h2>
              <p className="text-sm mb-1">
                <a href="#">
                  Create me a short and funny horror story I can read before I go to bed. →
                </a>
              </p>
              <p className="text-sm mb-1">
                <a href="#">
                  Can you tell me which authors are currently available? →
                </a>
              </p>
              <p className="text-sm">
                <a href="#">
                  I want to change my current preference for text prompts. →
                </a>
              </p>
            </div>
            <div className="border border-gray-200 rounded p-4">
              <h2 className="font-semibold mb-2">Capabilities</h2>
              <p className="text-sm mb-1">
                Remembers what user said earlier in the conversation.
              </p>
              <p className="text-sm mb-1">
                Allows user to provide follow-up corrections.
              </p>
              <p className="text-sm">
                Trained to decline inappropriate requests.
              </p>
            </div>
            <div className="border border-gray-200 rounded p-4">
              <h2 className="font-semibold mb-2">Limitations</h2>
              <p className="text-sm mb-1">
                May occasionally generate incorrect information.
              </p>
              <p className="text-sm mb-1">
                May occasionally produce harmful instructions that might set you back.
              </p>
              <p className="text-sm">
                Overwhelming disparity of user-base preferences can lead into prompt return delay.
              </p>
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
              placeholder="Please explain what you want to write about..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend} className="border px-4 py-2">
              Send
            </button>
            <span className="ml-4 text-sm text-gray-400 dark:text-gray-500">
              ESC or Click to cancel
            </span>
          </div>
        </section>
        <div className="absolute bottom-4 left-3 flex gap-2">
          <button
            className="bg-battleship shadow-sm flex items-center justify-center text-center hover:bg-eggshell border hover:text-battleship text-white px-3 py-1"
            onClick={returnToBookshelf}
          >
            Return to Bookshelf
          </button>
        </div>
      </main>
    </div>
  );
}
