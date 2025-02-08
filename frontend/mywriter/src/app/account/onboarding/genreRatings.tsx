import { GenreRatings } from "@/lib/user";
import { Dispatch, SetStateAction, useState } from "react";

export default function ChooseGenres(props: {genreRatings: GenreRatings, setGenreRatings: Dispatch<SetStateAction<GenreRatings>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Find Your Perfect Author
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-xl text-slate-700 text-center mb-8">
                        Rate the following genres to help us match you with authors you'll love
                    </p>
                    
                    <div className="space-y-8">
                        <GenreSlider genre="scifi" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="fantasy" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="dystopia" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="mystery" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="horror" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="action" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="adventure" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="teen" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="romance" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="historical" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="thriller" value={props.genreRatings} setValue={props.setGenreRatings} />
                        <GenreSlider genre="children" value={props.genreRatings} setValue={props.setGenreRatings} />
                    </div>

                    <div className="flex gap-5">
                        <button onClick={props.previousPage} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Previous Step
                        </button>
                        <button onClick={props.nextPage} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Next Step
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function GenreSlider(props: {
  genre: string;
  value: any;
  setValue: Dispatch<SetStateAction<GenreRatings>>;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">
          {props.genre.charAt(0).toUpperCase() + props.genre.slice(1)}
        </span>
        <span className="text-sm font-semibold text-battleship w-8 text-center">
          {props.value[props.genre]}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="10"
        value={props.value[props.genre]}
        onChange={(e) =>
          props.setValue((old) => {
            return {
              ...old,
              [props.genre]: parseInt(e.target.value),
            };
          })
        }
        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer range-lg 
                    [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:bg-battleship [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
      />

      <div className="flex justify-between text-sm text-eggshell0">
        <span>Not for me</span>
        <span>Love it!</span>
      </div>
    </div>
  );
}
