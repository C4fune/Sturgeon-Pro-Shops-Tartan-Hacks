import { GenreRatings } from "@/lib/user"
import { Dispatch, SetStateAction, useState } from "react"

export function WritingReviewOne(props: {writingScore: number, setWritingScore: Dispatch<SetStateAction<number>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <WritingReview writing={`
            Under the relentless downpour of midnight rain, Mira darted through the labyrinthine alleyways of the old city, where danger lurked behind every crumbling façade. The city's pulse matched the erratic rhythm of her heart as she evaded unseen pursuers. Yet, amidst the chaos of shattered glass and whispered threats, her thoughts drifted to the memory of Lucas—a tender, blazing beacon in a world grown bitter with treachery. His eyes, filled with a fierce and gentle resolve, had promised her a sanctuary of love even in the midst of the storm, igniting in her a courage that transcended the terror of the night.
            \n\n
            In the fractured light of a flickering streetlamp, every shadow became a silent witness to her inner struggle—a battle waged between the cold claws of imminent danger and the warm embers of their shared passion. With each cautious step, Mira recalled the softness of his voice, the unwavering conviction in his embrace, and the promise of a future where love could defy the darkness. In that bittersweet moment, the peril around her faded into a distant murmur, replaced by the resolute certainty that no matter how treacherous the path, the luminous memory of their love would guide her safely home.
        `} writingScore={props.writingScore} setWritingScore={props.setWritingScore} nextPage={props.nextPage} previousPage={props.previousPage}/>
    )
}

export function WritingReviewTwo(props: {writingScore: number, setWritingScore: Dispatch<SetStateAction<number>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <WritingReview writing={`
            The street lay empty under a dull sky. I walked alone, each step echoing on cracked pavement. The buildings stood like silent witnesses, unmoving and indifferent. A cold wind stirred the fallen leaves, and the darkness pressed in with a quiet insistence. I felt the weight of nothingness around me, as if the night itself had abandoned all meaning.
            \n\n
            At the far corner, a figure appeared in the dim light. It moved slowly, without haste or emotion, as if it were part of the silence. Its eyes, dark and unyielding, reflected a void that matched the desolation of the street. I stood still and watched, knowing that the simple presence of that shape held a deep, unspoken terror—a reminder that in a world stripped to its bare truth, horror need not shout to be felt.
        `} writingScore={props.writingScore} setWritingScore={props.setWritingScore} nextPage={props.nextPage} previousPage={props.previousPage}/>
    )
}

export function WritingReviewThree(props: {writingScore: number, setWritingScore: Dispatch<SetStateAction<number>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <WritingReview writing={`
            Beneath a bruised sky heavy with the promise of storm, Sir Eldred trudged along the forsaken battlements of Castle Blackwynd. The ancient stones, slick with the patina of countless winters, whispered secrets of treachery and honor lost to time. Each step stirred a century-old dust of shattered dreams and blood-soaked oaths, the echo of his solitary boots mingling with the mournful howl of the wind. In the distance, the skeletal remains of towers and ramparts stood like the broken bones of a once-mighty beast, their jagged silhouettes etched against the turbulent heavens. The air was saturated with the iron tang of old battles, and every shiver that ran down his spine was a reminder of the relentless, unseen eyes of history watching his every move.
            \n\n
            Far below, in the castle's deserted courtyard, a meager light fought valiantly against the encroaching gloom. Torches sputtered in the gathering dusk, their feeble flames casting wild, dancing shadows upon the weathered faces of men hardened by endless strife. Each scar and furrow told its own grim tale—a testament to sieges endured, of betrayals as sharp as any blade, and of love lost in the fire of war. As the distant rumble of an approaching host set the very stones trembling, Eldred’s gaze hardened with a resolute defiance. He knew that beyond the cold ramparts lay not only the bitter clamor of battle, but also the promise of redemption—a chance to carve honor from the chaos, even as fate, as capricious as the wind, plotted its next cruel twist.
        `} writingScore={props.writingScore} setWritingScore={props.setWritingScore} nextPage={props.nextPage} previousPage={props.previousPage}/>
    )
}

export function WritingReviewFour(props: {writingScore: number, setWritingScore: Dispatch<SetStateAction<number>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <WritingReview writing={`
            In the twilight of the desert world, beneath the harsh glare of twin suns, the ancient council gathered in a chamber carved from stone and secrecy. The air was thick with the scent of spice and dust—a constant reminder of both the planet’s unforgiving nature and the hidden depths of its power. As each dignitary took their measured seat, their eyes betrayed a simmering resolve and a quiet dread of what lay ahead. Every pause, every measured word, resonated with the weight of ancient prophecies and the subtle machinations of power; the council was not merely a body of decision-makers but a labyrinth of whispered alliances and veiled threats, where even the slightest deviation from protocol could ignite a cascade of irrevocable consequences.
            \n\n
            At the fringes of this covert assembly, a solitary observer noted the interplay of ambition and caution with a mixture of resignation and calculation. The observer recalled age-old warnings—a tapestry of lore woven into the very fabric of this harsh realm—hinting at an inevitable upheaval where destiny and ambition clashed like the relentless desert winds. Here, every gesture was laden with foreboding significance, every silence pregnant with unsaid treacheries. In that charged moment, the austere cadence of political intrigue and the relentless march of fate merged into a silent promise: that beneath the surface of established order, a storm was gathering, poised to upend not just the current regime but the very essence of power itself.
        `} writingScore={props.writingScore} setWritingScore={props.setWritingScore} nextPage={props.nextPage} previousPage={props.previousPage}/>
    )
}

function WritingReview(props: {writing: string, writingScore: number, setWritingScore: Dispatch<SetStateAction<number>>, previousPage: () => void, nextPage: () => void}) {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Find Your Perfect Author
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-xl text-slate-700 text-center mb-8">
                        Rate the following excerpt to help us match you with authors you'll love
                    </p>

                    <p className="text-base text-slate-700 bg-slate-50 p-6 rounded-lg border-l-4 border-indigo-300 leading-relaxed">
                        {props.writing}
                    </p>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700">
                                
                            </span>
                            <span className="text-sm font-semibold text-indigo-600 w-8 text-center">
                                {props.writingScore}
                            </span>
                        </div>
                        
                        <input 
                            type="range" 
                            min="0" 
                            max="10" 
                            value={props.writingScore} 
                            onChange={(e) => props.setWritingScore(parseInt(e.target.value)) }
                            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer range-lg 
                                [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                                [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
                        />
                        
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>Not for me</span>
                            <span>Love it!</span>
                        </div>
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
