"use client"

import { useSession } from "next-auth/react";


export default function Onboarding() {
    const {data: session} = useSession();

    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8 text-black">
            <p>Hello, world!</p>
        </div>
    )
}


