"use client"

import { Author } from "@/lib/user";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default function Onboarding() {
    const [userData, setUserData] = useState<Author | null | "DNE">(null);
    const { data: session } = useSession();

    useEffect(() => {
    if (!session) {
        return;
    }
    async function fetchData() {
        fetch("/api/writers/" + session?.user?.email).then(async (res) => {
            setUserData(await res.json())
        }).catch(() => {
            setUserData("DNE")
        });
    }
    fetchData();
    }, [session]);

    if (!userData) {
    return <p>loading...</p>;
    }

    if (userData == "DNE") {
        redirect("/writers/onboarding");
    }

    return (
        <div className="min-h-screen bg-eggshell py-12 px-4 sm:px-6 lg:px-8 text-black">
            <p>Hello, {userData.name}!</p>
        </div>
    )
}


