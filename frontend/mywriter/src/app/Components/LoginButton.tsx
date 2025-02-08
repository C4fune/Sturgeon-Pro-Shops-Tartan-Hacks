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
    <div>
        {/* Signed in as {session.user.email} <br /> */}
                <Link
        href="account/bookshelf/"
        className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
        >
        Go to Profile
        </Link>
    <div className="flex gap-16">
        <button
        className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
        onClick={() => signOut()}
        >
        Sign Out
        </button>
    </div>
    </div>
    );
  }
  return (
    <button
    className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
    onClick={() => signIn()}
    >
    Login
    </button>
  );
}
