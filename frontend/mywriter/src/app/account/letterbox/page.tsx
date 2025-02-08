"use client";
import { useSearchParams, useRouter } from "next/navigation";
export default function Letterbox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const content = searchParams.get("content") || "No content available.";
  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <div className="max-w-3xl mx-auto bg-white rounded-md p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-4">Your Story Update</h1>
        <div className="border-l-4 border-battleship pl-4">
          <p className="text-lg leading-relaxed">{content}</p>
        </div>
        <button onClick={() => router.push("/account/bookshelf")} className="mt-6 bg-battleship hover:bg-eggshell hover:text-black text-white font-semibold py-2 px-4 rounded">
          Return to My Bookshelf
        </button>
      </div>
    </main>
  );
}

