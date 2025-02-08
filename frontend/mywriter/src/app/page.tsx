"use client";

import Image from "next/image";
import LoginButtonRow from "./Components/LoginButtonRow";
import logo from "@/app/logo.svg";
require("dotenv").config();

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-eggshell">
      <Image src={logo} alt="logo" width={100} height={100} />
      <div className="text-center">
        <h1 className="text-6xl font-bold my-4">MyWriter</h1>
        <p className="text-xl mb-8">
          Personalized Storytelling From Your Favorite Authors
        </p>
        <LoginButtonRow />
      </div>
    </main>
  );
}
