export default function Welcome(props: {nextPage: () => void}) {
    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Complete your Profile
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-md text-slate-700 text-center mb-8">
                        Welcome to MyWriter. Our platform allows you to be matched with writers who want to write exactly what you want to read.
                        By completing your profile, our AI matching system will connect you with a writer who matches the style you prefer.
                        Each story has an outline written by a human, so there's no need to worry about an AI algorithm regurgitating the same things over and over again.
                        The more you read, the more our systems will learn what styles you prefer, and the better the stories you read will get.
                    </p>

                    <div className="flex gap-5">
                        <button onClick={props.nextPage} className="w-full bg-battleship hover:bg-eggshell text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
