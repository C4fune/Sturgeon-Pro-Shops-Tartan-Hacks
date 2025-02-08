import { NextResponse } from "next/server";

// Sample bookshelf data
const bookshelf = [
  { id: "1", title: "Harry Potter" },
  { id: "2", title: "Lord of the Rings" },
];

export async function GET() {
  return NextResponse.json(bookshelf);
}