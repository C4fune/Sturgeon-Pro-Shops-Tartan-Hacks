import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const queue = [
    { id: "1", followerName: "Alice", followerEmail: "alice@example.com", prompt: "Write a new chapter", analysis: "The prompt is creative" },
    { id: "2", followerName: "Bob", followerEmail: "bob@example.com", prompt: "Add a twist to the story", analysis: "Requires dramatic effect" }
  ];
  return NextResponse.json(queue);
}
