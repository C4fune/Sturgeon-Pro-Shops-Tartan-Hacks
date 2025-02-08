"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import { FormEvent, useState } from "react";

export default function Account({ params }: { params: { studentId: string } }) {
  return (
      <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <p className="text-3xl">Information for</p>
          <p>{params.studentId}.</p>
        </header>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">Study groups:</p>
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">Schedule:</p>
          </div>
        </div>
      </main>
    );
}
