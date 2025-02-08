import { GenreRatings, GenreSelection } from "@/lib/user"
import { Dispatch, SetStateAction, useState } from "react"

export default function ChooseGenres(props: {genreSelection: GenreSelection, setGenreSelection: Dispatch<SetStateAction<GenreSelection>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Complete your Profile
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-xl text-slate-700 text-center mb-8">
                        Select which genres you would be willing to write.
                    </p>
                    
                    <div className="space-y-8">
                        <GenreSelector genre="scifi" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="fantasy" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="dystopia" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="mystery" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="horror" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="action" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="adventure" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="teen" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="romance" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="historical" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="thriller" value={props.genreSelection} setValue={props.setGenreSelection} />
                        <GenreSelector genre="children" value={props.genreSelection} setValue={props.setGenreSelection} />
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

function GenreSelector(props: {genre: string, value: any, setValue: Dispatch<SetStateAction<GenreSelection>>}) {
    console.log(props.value)
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">
                    {props.genre.charAt(0).toUpperCase() + props.genre.slice(1)}<span className="font-normal">: {props.value[props.genre] ? "Enabled" : "Disabled" }</span>
                </span>
                <label className="relative flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={props.value[props.genre]}
                        onChange={(e) => props.setValue(old => ({
                            ...old,
                            [props.genre]: e.target.checked
                        }))}
                        className="sr-only peer"
                    />
                    <div className="h-5 w-5 border-2 border-slate-300 rounded-md flex items-center justify-center transition-colors
                        peer-checked:bg-indigo-600 peer-checked:border-indigo-600">
                        <svg 
                            className="h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </label>
            </div>
        </div>
    )
}
