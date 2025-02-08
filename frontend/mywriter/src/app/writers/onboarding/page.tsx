"use client"

import { GenreSelection } from "@/lib/user";
import { useState } from "react"
import { useSession } from "next-auth/react";
import Samples from "./samples";
import ChooseGenres from "./chooseGenres";
import MatchInProgress from "./matchingInProgress";
import MatchComplete from "./matchComplete";
import Welcome from "./welcome";
import CustomInput from "./customInput";

type Page = "Welcome" | "Genres" | "Writing Sample" | "Custom Input" | "Match In Progress" | "Matched"

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default function Onboarding() {
    const {data: session} = useSession();
    const [page, setPage] = useState<Page>("Welcome")

    const [samples, setSamples] = useState<string[]>([])
    const [customInput, setCustomInput] = useState<string>("")

    function addSample(sample: string) {
        setSamples((old) => {
            return [...old, sample]
        })
    }

    function removeSample(idx: number) {
        setSamples((old) => {
            old.splice(idx, 1)
            return [...old]
        })
    }

    const [genreSelection, setGenreRatings] = useState<GenreSelection>({
        scifi: true,
        fantasy: true,
        dystopia: true,
        mystery: true,
        horror: true,
        action: true,
        adventure: true,
        teen: true,
        romance: true,
        historical: true,
        thriller: true,
        children: true,
    });

    async function beginMatch() {
        await fetch("/api/writers/" + session?.user?.email + "/onboardingComplete", {
            method: "PUT",
            body: JSON.stringify({
                name: session?.user?.name,
                genres: genreSelection,
                samples: samples,
                customInput: customInput,
            })
        })

        await delay(5000);

        setPage("Matched")
    }

    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8 text-black">
            {
                {
                    "Welcome" : <Welcome nextPage={() => setPage("Genres")}/>,
                    "Genres": <ChooseGenres 
                        genreSelection={genreSelection}
                        setGenreSelection={setGenreRatings}
                        previousPage={() => {setPage("Welcome")}}
                        nextPage={() => {setPage("Writing Sample")}}/>,
                    "Writing Sample" : <Samples 
                        samples={samples}
                        addSample={addSample}
                        removeSample={removeSample}
                        previousPage={() => setPage("Genres")}
                        nextPage={() => setPage("Custom Input")}/>,
                    "Custom Input" : <CustomInput
                        customInput={customInput}
                        setCustomInput={setCustomInput}
                        previousPage={() => setPage("Writing Sample")}
                        nextPage={() => { setPage("Match In Progress") ; beginMatch() }} />,
                    "Match In Progress" : <MatchInProgress />,
                    "Matched" : <MatchComplete />,
                }[page]
            }
        </div>
    )
}


