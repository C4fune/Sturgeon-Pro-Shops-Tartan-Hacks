import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LearnMoreButton from "./LearnMoreButton";

export default function LoginButtonRow() {
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
      <>
        <div className="text-center my-1 py-1">
          Signed in as {session.user.email}
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            href="account/bookshelf/"
            className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
          >
            Go to Profile
          </Link>
          <button
            className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
          <LearnMoreButton />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="text-center my-1 py-1">Not signed in</div>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-battleship text-eggshell px-4 py-2 rounded-lg hover:bg-eggshell hover:text-battleship border-2 border-battleship"
          onClick={() => signIn()}
        >
          Login
        </button>
        <LearnMoreButton />
      </div>
    </>
  );
}
