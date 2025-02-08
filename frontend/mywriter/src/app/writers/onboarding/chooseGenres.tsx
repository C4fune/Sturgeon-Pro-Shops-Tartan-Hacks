import { GenreRatings, GenreSelection } from "@/lib/user"
import { Dispatch, SetStateAction, useState } from "react"

export default function ChooseGenres(props: {genreSelection: GenreRatings, setGenreSelection: Dispatch<SetStateAction<GenreRatings>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Complete your Profile
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-xl text-slate-700 text-center mb-8">
                        Tell us which genres you enjoy writing.
                    </p>
                    
                    <div className="space-y-8">
                        <GenreSlider genre="scifi" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="fantasy" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="dystopia" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="mystery" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="horror" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="action" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="adventure" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="teen" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="romance" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="historical" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="thriller" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSlider genre="children" value={props.genreSelection} setValue={props.setGenreSelection} />
                    </div>

                    <div className="flex gap-5">
                        <button onClick={props.previousPage} className="w-full bg-battleship hover:bg-eggshell text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Previous Step
                        </button>
                        <button onClick={props.nextPage} className="w-full bg-battleship hover:bg-eggshell text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
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