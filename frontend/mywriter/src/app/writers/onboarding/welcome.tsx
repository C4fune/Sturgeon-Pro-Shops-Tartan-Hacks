export default function Welcome(props: {nextPage: () => void}) {
    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">
                    Complete your Profile
                </h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <p className="text-md text-slate-700 text-center mb-8">
                        Welcome to MyWriter. Our platform allows interested readers to be matched with writers just like you.
                        By completing your profile, our AI matching system will connect you with interested readers who want to read exactly the stories you want to write.
                        To help you write efficiently, you need only write basic outlines of your story -- but you may be as specific as you wish. 
                        The outline of the ideas you generated will be elaborated on and filled in by our AI story generation models.
                        With a real human touch, you can generate content that connects with your readers faster than ever before.
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
