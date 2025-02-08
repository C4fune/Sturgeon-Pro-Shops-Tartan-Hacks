export default function LoadingBar({ progress }: { progress: number }) {
    return (
        <div className="w-full bg-eggshell rounded-full h-2.5">
            <div 
                className="bg-battleship h-2.5 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
            >
                <div className="w-full text-right pr-1 -mt-5">
                    <span className="text-xs font-medium text-indigo-600">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </div>
    )
}