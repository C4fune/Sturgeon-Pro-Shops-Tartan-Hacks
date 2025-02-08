"use client"

import HugeTitle from "@/app/Components/Typography/HugeTitle";
import ListItem from "@/app/Components/ListItem";
import { User } from "@/lib/user";
import { getTimes, studentSearch } from "@/lib/student_search"
import { getClass } from "@/lib/class_functions";
import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClassPage({ params }: { params: { classNum: string } }) {
  const router = useRouter()
  const [userData, setUserData] = useState<User | null>(null)
  const [groupName, setGroupName] = useState<string>("");
  const [groupTime, setGroupTime] = useState<string>("");
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) { return }
    async function fetchData() {
      let res = await fetch('/api/student/' + session?.user?.name)
      let data = await res.json()
      setUserData(data)

      console.log("done")
    }
    fetchData()
  }, [session])

  const groupNameChange = (e: ChangeEvent) => {
    console.log()
    setGroupName((e.currentTarget as HTMLInputElement).value)
  }

  const groupTimeChange = (e: ChangeEvent) => {
    console.log()
    setGroupTime((e.currentTarget as HTMLInputElement).value)
  }

  const submitGroup = () => {
    fetch("/api/groups/" + params.classNum + "/create", {
        method: "PUT",
        body: JSON.stringify({
            groupName: groupName,
            times: groupTime,
            user: session?.user?.name
        })
    }).then(() => {
        router.back();
    })
  }
  
  if (!userData || !userData) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a className="text-3xl">Create a new group for</a>
        <HugeTitle>{decodeURI(params.classNum).split(" ")[0]}.</HugeTitle>
        <ListItem title="Back to Home" caption="Home" href="/account"/>
      </header>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-2 items-stretch">
            <p className="text-3xl">Study group:</p>
            <label htmlFor="name">Group name:</label>
            <input className="text-black" id="name" type="text" onChange={groupNameChange} value={groupName}/>
            <label htmlFor="time">Group time:</label>
            <input className="text-black" id="time" type="text" onChange={groupTimeChange} value={groupTime}/>
            <div onClick={submitGroup}>
                <ListItem title="Create Group" href=""/>
            </div>
        </div>
      </div>
    </main>
  )
}