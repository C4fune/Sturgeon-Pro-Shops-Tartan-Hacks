"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { QueueRequest } from "@/lib/user";

export default function WriterDashboard({ params }: {params: { id: string }}) {
  const { data: session } = useSession();
  const router = useRouter();
  function returnToHome() {
    router.push("/");
  }

  const [bookText, setBookText] = useState("")
  const [bookTitle, setBookTitle] = useState("")

  useEffect(() => {
    if (!session) return;

    async function fetchData() {
      const res = await fetch(`/api/user/${session?.user?.email}/book/${params.id}`);
      const data = await res.json();
      setBookText(data.content);
      setBookTitle(data.title);
    }
    fetchData();
    
  }, [session]);

  if (!session) {
    return <p>Please log in to view the dashboard.</p>;
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{bookTitle}</h1>
      </div>
      <p>{bookText}</p>
    </main>
  );
}
