"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Follower {
  email: string;
  name: string;
  prompts: string[]; // List of GPT prompts sent by the follower
}

export default function WriterFollowers() {
  const { data: session } = useSession();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    
    async function fetchFollowers() {
      try {
        const res = await fetch("/api/writer/followers", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setFollowers(data);
        } else {
          console.error("Failed to fetch followers");
        }
      } catch (err) {
        console.error("Error fetching followers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFollowers();
  }, [session]);

  if (!session) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Followers</h1>
        <Link href="/writer/dashboard">
          <button className="bg-black rounded hover:bg-eggshell hover:text-black border-transparent hover:border-battleship border-2 text-white px-3 py-1">
            Back to Dashboard
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading followers...</p>
      ) : followers.length === 0 ? (
        <p>No followers found.</p>
      ) : (
        <div className="space-y-4">
          {followers.map((follower) => (
            <div key={follower.email} className="border border-battleship rounded-md p-4 bg-white">
              <h2 className="font-semibold">{follower.name}</h2>
              <p className="text-sm text-gray-600">Email: {follower.email}</p>
              <div className="mt-2">
                <h3 className="font-semibold">Prompts:</h3>
                {follower.prompts && follower.prompts.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {follower.prompts.map((prompt, index) => (
                      <li key={index} className="text-sm">
                        {prompt}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No prompts yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
