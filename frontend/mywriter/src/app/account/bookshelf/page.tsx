// File: app/account/bookshelf/page.tsx
"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Book } from "../../../lib/user";
import { useSession } from "next-auth/react";
export default function BookshelfPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  function handlePlusClick() {
    router.push("/account/mywriter");
  }
  function handleNewStory() {
    router.push("/account/request");
  }
  function returnToHome() {
    router.push("/");
  }

  function openBook(book: Book) {
    router.push(`/account/book/${book.id}`)
  }
  
  

  const [userData, setUserData] = useState<User | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      return;
    }
    async function fetchData() {
      const res = await fetch("/api/user/" + session?.user?.email);
      const data = await res.json();
      setUserData(data);
      setBooks(data.books)
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
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-3xl font-bold">My BookShelf</h1>
        <div className="flex gap-4">
          <button
            className="bg-black rounded hover:bg-eggshell hover:text-black border-transparent hover:border-battleship border-2 text-white px-3 py-1"
            onClick={returnToHome}
          >
            Return to Home
          </button>
        </div>
      </div>
      <div className="grid grid-cols-24 grid-rows-2 gap-4">
        <div className="flex gap-4">
          <div
            className="rounded-md hover:bg-white shadow-sm flex-1 flex items-center justify-center text-center h-40 cursor-pointer bg-accept"
            onClick={handleNewStory}
          >
            <p className="lg:text-4xl md:text-3xl text-xl font-bold">
              Request a new story
            </p>
          </div>
          <div
            className="rounded-md shadow-sm flex-1 flex flex-col items-center justify-center text-center h-40 cursor-pointer bg-accept"
            // onClick={handlePlusClick}
          >
            <p className="lg:text-4xl md:text-3xl text-xl font-bold">
              Upload a book
            </p>
            <p className="lg:text-xl md:text-3xl text-xl font-bold">
              (coming soon!)
            </p>
          </div>
        </div>
        {books.map((book, i) => (
          <div
            key={i}
            className="border-battleship rounded-md border-4 bg-battleship shadow-sm flex items-center justify-center text-center h-40 hover:bg-eggshell"
            onClick={() => openBook(book)}
          >
            <div className="text-4xl text-black">{book.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
