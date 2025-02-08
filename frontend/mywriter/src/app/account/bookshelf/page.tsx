"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Book {
  title: string
}

export default function BookshelfPage() {
  const router = useRouter()
  const [books] = useState<Book[]>(() => {
    const example = Array(5).fill({ title: "Sample Book" })
    return example
  })

  function handlePlusClick() {
    router.push("/account/mywriter")
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-sans">
      <h1 className="text-3xl mb-8">My BookShelf</h1>
      <div className="grid grid-cols-24 grid-rows-2 gap-4">
        {books.map((book, i) => (
          <div
            key={i}
            className="border border-gray-300 bg-yellow-100 shadow-sm flex items-center justify-center text-center h-40"
          >
            <p className="rotate-90">{book.title}</p>
          </div>
        ))}
        <div
          className="border border-gray-300 bg-white shadow-sm flex items-center justify-center text-center h-40 cursor-pointer hover:bg-green-50"
          onClick={handlePlusClick}
        >
          <p className="text-4xl font-bold">+</p>
        </div>
        {Array.from({ length: 48 - (books.length + 1) }, (_, i) => (
          <div
            key={`filler_${i}`}
            className="border border-gray-100 bg-gray-50 h-40"
          />
        ))}
      </div>
    </main>
  )
}
