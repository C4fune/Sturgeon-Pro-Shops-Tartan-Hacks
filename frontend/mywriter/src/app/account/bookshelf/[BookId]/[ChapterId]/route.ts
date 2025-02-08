import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { bookId: string } }) {
  const book = books[params.bookId]; // ✅ No TypeScript error

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
