"use client";

import Image from "next/image";
import LoginButton from "./Components/LoginButton";
require("dotenv").config();

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-eggshell">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 font-robotoMono">MyWriter</h1>
        <p className="text-xl mb-8">
          Personalized Storytelling Tailored to Your Unique Literary Taste
        </p>
        <div className="flex justify-center space-x-4">
          <LoginButton />
          <button className="bg-black text-eggshell px-4 py-2 rounded-lg hover:bg-battleship">
            <a href="https://docs.google.com/presentation/d/1lMtLE8DsY-DJqViKbghTCm6WyT0A7UI5MA8Kp7G8JcI/edit?usp=sharing">
              Learn More
            </a>
          </button>
        </div>
      </div>
    </main>
  );
}
