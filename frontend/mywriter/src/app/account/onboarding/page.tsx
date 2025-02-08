"use client"

import { GenreRatings } from "@/lib/user";
import { Dispatch, SetStateAction, useState } from "react"
import ChooseGenres from "./genreRatings";
import { WritingReviewOne, WritingReviewTwo, WritingReviewThree, WritingReviewFour } from "./writingRatings";
import MatchInProgress from "./matchingInProgress";
import { useSession } from "next-auth/react";
import CustomInput from "./customInput";

type Page = "Genres" | "Writing Rating 1" | "Writing Rating 2" | "Writing Rating 3" | "Writing Rating 4" | "Custom Input" | "Match In Progress" | "Matched"

export default function Onboarding() {
    const {data: session} = useSession();
    const [page, setPage] = useState<Page>("Genres")

    const [writingOneScore, setWritingOneScore] = useState<number>(5)
    const [writingTwoScore, setWritingTwoScore] = useState<number>(5)
    const [writingThreeScore, setWritingThreeScore] = useState<number>(5)
    const [writingFourScore, setWritingFourScore] = useState<number>(5)

    const [customInput, setCustomInput] = useState<string>("")

    const [genreRatings, setGenreRatings] = useState<GenreRatings>({
        scifi: 5,
        fantasy: 5,
        dystopia: 5,
        mystery: 5,
        horror: 5,
        action: 5,
        adventure: 5,
        teen: 5,
        romance: 5,
        historical: 5,
        thriller: 5,
        children: 5,
    });

    function beginMatch() {
        fetch("/api/user/" + session?.user?.email + "/onboardingComplete", {
            method: "PUT",
            body: JSON.stringify({
              genres: genreRatings,
              writingOneScore: writingOneScore,
              writingTwoScore: writingTwoScore,
              writingThreeScore: writingThreeScore,
              writingFourScore: writingFourScore,
              custom: customInput
            })
          })
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
            {
                {
                    "Genres": <ChooseGenres 
                        genreRatings={genreRatings}
                        setGenreRatings={setGenreRatings}
                        nextPage={() => {setPage("Writing Rating 1")}}/>,
                    "Writing Rating 1" : <WritingReviewOne 
                        writingScore={writingOneScore}
                        setWritingScore={setWritingOneScore}
                        previousPage={() => {setPage("Genres")}}
                        nextPage={() => {setPage("Writing Rating 2")}}/>,
                    "Writing Rating 2" : <WritingReviewTwo 
                        writingScore={writingTwoScore}
                        setWritingScore={setWritingTwoScore}
                        previousPage={() => {setPage("Writing Rating 1")}}
                        nextPage={() => {setPage("Writing Rating 3")}}/>,
                    "Writing Rating 3" : <WritingReviewThree 
                        writingScore={writingThreeScore}
                        setWritingScore={setWritingThreeScore}
                        previousPage={() => {setPage("Writing Rating 2")}}
                        nextPage={() => {setPage("Writing Rating 4")}}/>,
                    "Writing Rating 4" : <WritingReviewFour 
                        writingScore={writingFourScore}
                        setWritingScore={setWritingFourScore}
                        previousPage={() => {setPage("Writing Rating 3")}}
                        nextPage={() => {setPage("Custom Input")}}/>,
                    "Custom Input" : <CustomInput 
                        customInput={customInput}
                        setCustomInput={setCustomInput}
                        previousPage={() => setPage("Writing Rating 4")}
                        nextPage={() => {setPage("Match In Progress") ; beginMatch()}}/>,
                    "Match In Progress" : <MatchInProgress />,
                    "Matched" : <MatchInProgress />,
                }[page]
            }
        </div>
    )
}


