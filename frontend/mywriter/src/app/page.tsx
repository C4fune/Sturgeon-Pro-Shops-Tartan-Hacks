"use client";

import Image from "next/image";
import LoginButton from "./Components/LoginButton";
require("dotenv").config();

export default function Home() {
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-inter">
      <header>
        <h1 className="font-robotoMono font-bold text-4xl">My Writer</h1>
        <p>Personalized Storytelling Tailored to Your Unique Literary Taste</p>
      </header>
      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <LoginButton />
      </div>
    </main>
  );
}
