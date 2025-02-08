"use client";

import Image from "next/image";
import LoginButtonRow from "./Components/LoginButtonRow";
import logo from "@/app/logo.svg";
import Link from "next/link";
require("dotenv").config();

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-eggshell">
      <div className="flex flex-col justify-center items-center flex-1">
        <Image src={logo} alt="logo" width={100} height={100} />
        <div className="text-center">
          <h1 className="text-6xl font-bold my-4">MyWriter</h1>
          <p className="text-xl mb-8">
            Personalized Storytelling From Your Favorite Authors
          </p>
          <LoginButtonRow />
        </div>
      </div>
      <div className="py-1 flex justify-center items-center gap-5">
        <div className="">
          Are you a Writer?
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            href="writers/onboarding"
            className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
          >
            Go to Writer Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
