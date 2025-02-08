"use client";

import Image from "next/image";
import LoginButton from "./Components/LoginButton";
require("dotenv").config();

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primaryBg">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyWriter</h1>
        <p className="text-xl mb-8">
          Personalized Storytelling Tailored to Your Unique Literary Taste
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-secondaryText text-primary px-4 py-2 rounded-lg hover:bg-blue-700">
            Get Started
          </button>
          <button className="bg-gray-500 text-primaryText px-4 py-2 rounded-lg hover:bg-gray-700">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
