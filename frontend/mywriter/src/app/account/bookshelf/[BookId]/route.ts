import { NextResponse } from "next/server";

// Define the structure of a book
type BookType = {
  title: string;
  chapters: { id: string; title: string }[];
};

// Ensure `books` is typed correctly
const books: Record<string, BookType> = {
  "1": {
    title: "Harry Potter",
    chapters: [
      { id: "1", title: "The Boy Who Lived" },
      { id: "2", title: "Diagon Alley" },
    ],
  },
  "2": {
    title: "Lord of the Rings",
    chapters: [
      { id: "1", title: "A Long-Expected Party" },
      { id: "2", title: "Shadow of the Past" },
    ],
  },
};

export async function GET(req: Request, { params }: { params: { bookId: string } }) {
  const book = books[params.bookId]; // ✅ No TypeScript error

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
