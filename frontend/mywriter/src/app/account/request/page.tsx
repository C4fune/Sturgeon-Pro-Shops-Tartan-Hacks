"use client";

import { User } from "@/lib/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StoryRequestForm: React.FC = () => {
  const router = useRouter();
  
  const [ textInput, setTextInput ] = useState("");

  const [userData, setUserData] = useState<User | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      return;
    }
    async function fetchData() {
      const res = await fetch("/api/user/" + session?.user?.email);
      const data = await res.json();
      setUserData(data);
    }
    fetchData();
  }, [session]);

  if (!userData) {
    return <p>loading...</p>;
  }


  function submit() {
    if (textInput == "") { return; }

    fetch("/api/writers/" + userData?.matchedAuthor  + "/queue", {
      method: "PUT",
      body: JSON.stringify({
        fromName: session?.user?.name,
        fromID: session?.user?.email,
        body: textInput
      })
    })

    returnToBookshelf()
  }

  function returnToBookshelf() {
    router.push("/account/bookshelf");
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Request a Story</h1>
        <div className="w-full max-w-lg flex flex-col items-center">
          <label htmlFor="storyRequest" className="mb-4 text-xl">
            Your Story Request:
          </label>
          <textarea
            id="storyRequest"
            placeholder="Type your ideas"
            required
            cols={40}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full p-4 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-battleship min-h-[200px] min-w-[300px] resize-y overflow-y-auto"
          ></textarea>

          <button
            className="bg-battleship text-white p-4 rounded-lg w-full text-xl"
            onClick={submit}
          >
            Submit Request
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 left-3 flex gap-2">
        <button
          className="bg-battleship shadow-sm flex items-center justify-center text-center hover:bg-eggshell hover:text-battleship text-white px-3 py-1"
          onClick={returnToBookshelf}
        >
          Return to Bookshelf
        </button>
      </div>
    </main>
  );
};

export default StoryRequestForm;
