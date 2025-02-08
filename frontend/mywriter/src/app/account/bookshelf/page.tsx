"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Book } from "../../../lib/user";
import { useSession } from "next-auth/react";

export default function BookshelfPage() {
  const router = useRouter();
  const [books] = useState<Book[]>(() => {
    const example = Array(5).fill({ title: "Sample Book" });
    return example;
  });

  function handlePlusClick() {
    router.push("/account/mywriter");
  }

  function returnToHome() {
    router.push("/");
  }

  const [userData, setUserData] = useState<User | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    async function fetchData() {
      let res = await fetch("/api/user/" + session?.user?.email);
      let data = await res.json();
      setUserData(data);
    }
    fetchData();
  }, [session]);

  if (!userData) {
    return <p>loading...</p>;
  }

  if (!userData.onboarding) {
    redirect("/account/onboarding");
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <h1 className="text-3xl mb-8">My BookShelf</h1>
      <button
        className="bg-battleship shadow-sm hover:bg-eggshell hover:text-black border bg-black text-white px-3 py-1 mb-4"
        onClick={returnToHome}
      >
        Return to Home
      </button>

      <div className="grid grid-cols-24 grid-rows-2 gap-4">
        {books.map((book, i) => (
          <div
            key={i}
            className="border-battleship border-4 bg-battleship shadow-sm flex items-center justify-center text-center h-40 hover:bg-eggshell"
            onClick={handlePlusClick}
          >
            <div className="text-4xl text-black">{book.title} </div>
          </div>
        ))}
        <div
          className="border border-battleship bg-white shadow-sm flex items-center justify-center text-center h-40 cursor-pointer hover:bg-accept"
          onClick={handlePlusClick}
        >
          <p className="text-6xl font-bold">+</p>
        </div>
        {Array.from({ length: 1 }, (_, i) => (
          <div
            key={`filler_${i}`}
            className="border border-battleship bg-gray-50 h-40"
          />
        ))}
      </div>
    </main>
  );
}
