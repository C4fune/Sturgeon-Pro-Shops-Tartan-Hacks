"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface QueueItem {
  id: string;
  followerName: string;
  followerEmail: string;
  prompt: string;
  analysis: string;
}



export default function WriterDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  function returnToHome() {
    router.push("/");
  }

  useEffect(() => {
    if (!session) return;
    
    async function fetchQueue() {
      try {
        const res = await fetch("/api/writer/queue", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setQueue(data);
        } else {
          console.error("Failed to fetch queue");
        }
      } catch (err) {
        console.error("Error fetching queue:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQueue();

    // Optionally poll for new items every 10 seconds
    const interval = setInterval(fetchQueue, 10000);
    return () => clearInterval(interval);
  }, [session]);

  if (!session) {
    return <p>Please log in to view the dashboard.</p>;
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Writer Dashboard</h1>
        <Link href="/writers/followers">
          <button className="bg-black rounded hover:bg-eggshell hover:text-black border-transparent hover:border-battleship border-2 text-white px-3 py-1">
            View Followers
          </button>
        </Link>
      </div>
      <button
            className="bg-black rounded hover:bg-eggshell hover:text-black border-transparent hover:border-battleship border-2 text-white px-3 py-1 mb-4"
            onClick={returnToHome}
          >
            Return to Home
          </button>
    
      <section>
        <h2 className="text-2xl mb-4">Prompt Queue</h2>
        {loading ? (
          <p>Loading queue...</p>
        ) : queue.length === 0 ? (
          <p>No new prompts in the queue.</p>
        ) : (
          <div className="space-y-4">
            {queue.map((item) => (
              <div
                key={item.id}
                className="border border-battleship rounded-md p-4 bg-white hover:bg-eggshell cursor-pointer"
                onClick={() => router.push(`/writer/authorbookshelf?queueId=${item.id}`)}
              >
                <p className="font-semibold">From: {item.followerName}</p>
                <p className="italic">Prompt: {item.prompt}</p>
                <p className="text-sm text-gray-600">Analysis: {item.analysis}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
