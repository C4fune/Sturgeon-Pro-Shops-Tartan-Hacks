import LoadingBar from "@/app/Components/LoadingBar"
import Link from "next/link"

export default function MatchComplete() {
    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Your writer profile has been submitted!
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-xl text-slate-700 text-center mb-8">
                        The matches will start rolling in.
                    </p>

                    <div className="flex gap-5">
                        <button className="w-full bg-battleship hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            <Link href="/writers/dashboard">Go to Writer Dashboard</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
