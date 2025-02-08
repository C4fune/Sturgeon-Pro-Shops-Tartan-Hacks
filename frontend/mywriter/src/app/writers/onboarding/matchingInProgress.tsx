import LoadingBar from "@/app/Components/LoadingBar"

export default function MatchInProgress() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Complete your Profile
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-xl text-slate-700 text-center mb-8">
                        Sending your information to our readers...
                    </p>

                    <LoadingBar />

                    <div className="flex gap-5">
                        <button disabled className="w-full bg-indigo-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Please wait...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
