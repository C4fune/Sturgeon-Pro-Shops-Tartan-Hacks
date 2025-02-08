import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session != null) {
    fetch("api/register/" + session.user?.email, {
      method: "PUT",
      body: JSON.stringify({
        username: session.user?.name,
      }),
    });
  }

  if (session != null && session.user != null) {
    return (
      <div className="flex-col">
        Signed in as {session.user.email} <br />
        <div className="flex gap-16">
          <button
            className="text-5xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border"
            onClick={() => signOut()}
          >
            Sign out.
          </button>
          <Link
            href="account/bookshelf/"
            className="text-5xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border"
          >
            Go to profile.
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-col">
      <button
        className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
        onClick={() => signIn()}
      >
        Login
      </button>
    </div>
  );
}
