"use client";

import { useRouter } from "next/navigation";

const StoryRequestForm: React.FC = () => {
  const router = useRouter();
  function returnToBookshelf() {
    router.push("/account/bookshelf");
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-robotoMono bg-eggshell">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Request a Story</h1>
        <form className="w-full max-w-lg flex flex-col items-center">
          <label htmlFor="storyRequest" className="mb-4 text-xl">
            Your Story Request:
          </label>
          <textarea
            id="storyRequest"
            placeholder="Type your ideas"
            required
            cols={40}
            className="w-full p-4 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-battleship min-h-[200px] min-w-[300px] resize-y overflow-y-auto"
          ></textarea>

          <button
            type="submit"
            className="bg-battleship text-white p-4 rounded-lg w-full text-xl"
          >
            Submit Request
          </button>
        </form>
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
