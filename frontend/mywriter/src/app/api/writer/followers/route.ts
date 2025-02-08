import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const followers = [
    { email: "alice@example.com", name: "Alice", prompts: ["Write a new chapter", "Continue the suspense"] },
    { email: "bob@example.com", name: "Bob", prompts: ["Add a twist to the story"] }
  ];
  return NextResponse.json(followers);
}
