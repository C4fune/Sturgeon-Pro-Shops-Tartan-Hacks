"use client"

import Image from "next/image";
import LoginButton from "./Components/LoginButton";

export default function Home() {
  return (
      <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <p className="text-3xl">Welcome to the</p>
          <p>CMU Study Group Finder.</p>
          <p className="text-3xl">Sign up to find your new smartest friends.</p>
        </header>
        <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <LoginButton />
        </div>
      </main>
    );
}
