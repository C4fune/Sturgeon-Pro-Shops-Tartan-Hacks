import { GenreRatings } from "@/lib/user";
import { Dispatch, SetStateAction, useState } from "react";

export default function CustomInput(props: {
  customInput: string;
  setCustomInput: Dispatch<SetStateAction<string>>;
  previousPage: () => void;
  nextPage: () => void;
}) {
  return (
    <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
          Find Your Perfect Author
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <p className="text-xl text-slate-700 text-center mb-8">
            Tell us anything else about your preferences
          </p>

          <input
            type="text"
            placeholder="Enter your preferences here..."
            value={props.customInput}
            onChange={(e) => props.setCustomInput(e.target.value)}
            className="m-0 w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-battleship"
          />

          <div className="flex gap-5">
            <button
              onClick={props.previousPage}
              className="w-full bg-battleship hover:bg-eggshell hover:text-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Previous Step
            </button>
            <button
              onClick={props.nextPage}
              className="w-full bg-battleship hover:bg-eggshell hover:text-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
