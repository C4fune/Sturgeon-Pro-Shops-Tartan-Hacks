"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface QueueItem {
  id: string;
  followerName: string;
  followerEmail: string;
  prompt: string;
  analysis: string;
}

export default function AuthorBookshelf() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queueId = searchParams.get("queueId");

  const [queueItem, setQueueItem] = useState<QueueItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorPrompt, setAuthorPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!queueId) {
      router.push("/writer/dashboard");
      return;
    }

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
        setLoading(false);
      }
    }

    fetchQueueItem();
  }, [queueId, router]);

  async function handleSubmit() {
    if (!authorPrompt) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/author/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          queueId,
          authorPrompt,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        // Assume the API returns { response: string }
        router.push(`/reader/letterbox?content=${encodeURIComponent(data.response)}`);
      } else {
        console.error("Failed to submit response");
      }
    } catch (err) {
      console.error("Error submitting response:", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!session) {
    return <p>Please log in to access this page.</p>;
  }

  if (loading) {
    return <p>Loading queue item...</p>;
  }

  if (!queueItem) {
    return <p>No queue item found.</p>;
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <button
        className="mb-4 bg-black rounded hover:bg-eggshell hover:text-black border-transparent hover:border-battleship border-2 text-white px-3 py-1"
        onClick={() => router.push("/writer/dashboard")}
      >
        Back to Dashboard
      </button>
      <div className="bg-white rounded-md p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Respond to Prompt</h1>
        <p className="mb-2">
          <span className="font-semibold">Follower:</span> {queueItem.followerName} ({queueItem.followerEmail})
        </p>
        <p className="mb-2">
          <span className="font-semibold">User Prompt:</span> {queueItem.prompt}
        </p>
        <p className="mb-4">
          <span className="font-semibold">GPT Analysis:</span> {queueItem.analysis}
        </p>

        <textarea
          value={authorPrompt}
          onChange={(e) => setAuthorPrompt(e.target.value)}
          placeholder="Enter your response prompt here..."
          className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-battleship hover:bg-eggshell hover:text-black text-white font-semibold py-3 px-6 rounded transition-colors duration-200"
        >
          {submitting ? "Submitting..." : "Submit Response"}
        </button>
      </div>
    </main>
  );
}


