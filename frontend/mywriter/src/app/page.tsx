"use client";

import Image from "next/image";
import LoginButtonRow from "./Components/LoginButtonRow";
require("dotenv").config();

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-eggshell">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">MyWriter</h1>
        <p className="text-xl mb-8">
          Personalized Storytelling From Your Favorite Authors
        </p>
        <LoginButtonRow />
      </div>
    </main>
  );
}
