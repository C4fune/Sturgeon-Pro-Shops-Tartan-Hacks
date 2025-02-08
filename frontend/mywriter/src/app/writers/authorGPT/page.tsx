// writers/authorGPT/page.tsx
"use client";

import { useState, useEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Author, Book, QueueRequest } from "@/lib/user";
import LoadingBar from "@/app/Components/LoadingBar";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function MyWriterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queueId = searchParams.get("queueId");

  const { data: session } = useSession();

  // For the chat part:
  const [input, setInput] = useState("");
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  // State for the queue item (if a queueId is provided)
  const [queueItem, setQueueItem] = useState<QueueRequest | null>(null);
  const [loadingQueue, setLoadingQueue] = useState(!!queueId);

  useEffect(() => {
    if (!queueId) {
      // If no queueId is provided, we stop loading.
      setLoadingQueue(false);
      return;
    }

    if (!session) { return; }

    async function fetchQueueItem() {
      try {
        const res = await fetch(`/api/writers/${session?.user?.email}/queue/${queueId}`, {
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
  }, [queueId, session]);

  function returnToDashboard() {
    router.push("/writers/dashboard");
  }

  async function handleSend() {
    if (!input) return;
    try {

      setLoadingSubmission(true);

      const toUserData = await (await fetch(`/api/user/${queueItem?.fromID}`)).json()
      const fromUserData = await (await fetch(`/api/writers/${session?.user?.email}`)).json() as Author

      let prompt = `Given the following prompt: \n\n${queueItem?.prompt}\n\nA user has asked a writer to come up with a story to match their idea. The author has written the following outline:\n\n${input}\n\nPlease expand on this outline in the style of the author and keeping in mind the original prompt. Here are some writing samples from the original author:\n\n`

      for (const sample of fromUserData.samples) {
        prompt += `Sample:\n${sample}\n\n`
      }

      prompt += "Please respond to this in a 5-paragraph expansion of the given outline. ONLY respond with the fully-written story. Do not say \"sure thing\", \"of course\" or anything else."

      console.log(prompt)

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();

      if (data.error) {
        console.error("API Error:", data.error);
      } else {
        const assistantReply =
          data.choices?.[0]?.message?.content || "No response from API";

        const prompt = `Please title the following story: \n\n${assistantReply}\n\n ONLY reply with the title, and nothing else.`

        const titleRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
        });
        const title = await titleRes.json();
        const titleReply =
          title.choices?.[0]?.message?.content || "No response from API";

        const book: Book = {
          title: titleReply,
          body: assistantReply
        } 

        await fetch(`/api/user/${queueItem?.fromID}/pushBook`, {
          method: "PUT",
          body: JSON.stringify(book)
        })

        await fetch(`/api/writers/${session?.user?.email}/queue/${queueId}`, {
          method: "DELETE"
        })

        setSubmissionComplete(true);

        await delay(1000);

        router.push("/writers/dashboard");
      }
      setInput("");
    } catch (err) {
      console.error("Fetch error:", err);
      setInput("");
    }
  }



  const headerText = loadingQueue
    ? "Loading..."
    : queueItem
    ? queueItem.fromName
    : "Main";

  if (!session) {
    return <p>Please log in to access this page.</p>;
  }

  if (submissionComplete) {
    return <div className="min-h-screen bg-eggshell flex flex-col items-center justify-center space-around">
      <div className="flex-1 bg-eggshell flex items-center justify-center space-around">
        <p className="text-4xl">Submission Complete! Redirecting to dashboard...</p>
      </div>
    </div>
  }

  if (loadingSubmission) {
    return <div className="min-h-screen bg-eggshell flex flex-col items-center justify-center space-around">
      <div className="flex-1 bg-eggshell flex items-center justify-center space-around">
        <LoadingBar />
      </div>
    </div>
  }

  return (
    <div className="bg-eggshell">
      <main className="relative flex min-h-screen">
        <aside className="w-1/4 border-r border-battleship p-4">
          <h1 className="text-2xl mb-4">{headerText}</h1>
          <p className="text-lg mb-2">Choose the prompt mode!</p>

          {/* Gray box for showing current prompt details */}
          <div className="bg-battleship p-2 rounded mb-4">
            {loadingQueue ? (
              <p className="text-sm">Loading prompt...</p>
            ) : queueItem ? (
              <>
                <p className="text-sm">
                  <strong>From:</strong> {queueItem.fromName}
                </p>
                <p className="text-sm">
                  <strong>Prompt:</strong> {queueItem.prompt}
                </p>
              </>
            ) : (
              <p className="text-sm">No follower has been selected currently!</p>
            )}
          </div>

          {/* Prompt mode options */}
          <div className={"border border-battleship rounded p-3 mb-3"}>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="promptMode"
                id="videoMode"
                className="checked:bg-battleship checked:border-battleship"
              />
              <label htmlFor="videoMode" className="ml-2">
                Video Prompts (Future Updates!)
              </label>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              MyStory is working on future implementations (V.1.0.1) revolving around OpenAI Sora alongside a backend that stores videos.
            </p>
          </div>
          <div className="border border-battleship rounded p-3 mb-3">
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
              Text Prompts should be used for cases where you want MyWriter to generate a story!
            </p>
          </div>
        </aside>

        <section className="flex-1 flex flex-col p-4">
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
            {/* ... Examples, Capabilities, Limitations sections ... */}
            <div className="border border-battleship rounded p-4">
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
            <div className="border border-battleship rounded p-4">
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
            <div className="border border-battleship rounded p-4">
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
          <div className="flex-1 border-t border-battleship pt-4 flex flex-col items-stretch gap-5">
            <textarea
              className="flex-1 border border-battleship p-2 mr-2"
              placeholder="Create an outline of the story you want to write..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend} className="border border-battleship px-4 py-2">
              Send to User
            </button>
          </div>
        </section>
        <div className="absolute bottom-4 left-3 flex gap-2">
          <button
            className="bg-battleship shadow-sm flex items-center justify-center text-center hover:bg-eggshell border border-battleship hover:text-battleship text-white px-3 py-1"
            onClick={returnToDashboard}
          >
            Return to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
