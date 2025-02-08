import { GenreRatings } from "@/lib/user"
import { Dispatch, SetStateAction, useState } from "react"

export default function CustomInput(props: {samples: string[], addSample: (_: string) => void, removeSample: (_: number) => void, previousPage: () => void, nextPage: () => void}) {
    const [customInput, setCustomInput] = useState<string>("")
    
    function submitCustomInput() {
        props.addSample(customInput)
        setCustomInput("")
    }

    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                Complete your Profile
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 text-xs">
                    <p className="text-xl text-slate-700 text-center mb-8">
                        Give us some samples of your writing. Ideally, one to two paragraphs for each sample that clearly shows your distinct style.
                    </p>

                    <div className="flex gap-8 items-center">
                        <textarea
                            placeholder="Enter a sample..."
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                            className="m-0 w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button onClick={submitCustomInput} className="text-3xl bg-battleship hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            ➠
                        </button>
                    </div>

                    {props.samples.map((sample, idx) => (
                        <div className="flex gap-8 w-full items-center">
                            <p className="w-full min-w-0 break-words border border-slate-300 py-3 px-6 rounded-lg transition-colors duration-200">{sample}</p>
                            <button onClick={() => props.removeSample(idx)} className="text-base bg-battleship hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                ✗
                            </button>
                        </div>
                    ))}
                    

                    <div className="flex gap-5 text-base">
                        <button onClick={props.previousPage} className="w-full bg-battleship hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Previous Step
                        </button>
                        <button onClick={props.nextPage} className="w-full bg-battleship hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Next Step
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
