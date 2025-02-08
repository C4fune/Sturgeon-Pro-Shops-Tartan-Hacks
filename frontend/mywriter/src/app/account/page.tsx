"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import type { User } from "../../lib/user"

import { FormEvent, useEffect, useState } from "react";

export default function Account() {
  const [userData, setUserData] = useState<User | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) { return }
    async function fetchData() {
      let res = await fetch('api/student/' + session?.user?.name)
      let data = await res.json()
      console.log(data)
      setUserData(data)
    }
    fetchData()
  }, [session])

  const [file, setFile] = useState<File>()

  const onSubmit = async function(e: FormEvent) {
    e.preventDefault()
    if (!file) return;

    try {
      const data = new FormData()
      data.set('file', file)
  
      const res = await fetch("api/student/" + session?.user?.name + "/calendar_import", {
        method: "PUT",
        body: data
      });
    } catch(e) {
      console.error(e)
    }
  }

  if (!userData) { return (<p>loading...</p>)}

  return (
      <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <p className="text-3xl">Welcome,</p>
          <p>{userData.username}.</p>
        </header>
        <div className="flex flex-col gap-5 items-start">
          {userData.uploaded ? (<p>Schedule uploaded successfully.</p>): (
            <form className="flex flex-col items-start gap-2" onSubmit={onSubmit}>
              <p className="text-3xl">Schedule:</p>
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <input className="p-2 text-3xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border" type="submit" value="Upload" />
            </form>
          )}
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">Find a study group:</p>
            <p title="Search by class" />
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">My study groups:</p>
            {userData.groups.length < 1 ? <p>You haven't joined any study groups!</p> : <>
              {userData.groups.map((group:any) => (
                <p title={group} />
              ))}
              {/* <ListItem title="Haolin's Study Group" caption="Tuesdays, Thursdays, 7:00pm" href="/groups/haolin-group"/>
              <ListItem title="Tyler's Study Group" caption="Mondays, Fridays, 6:30pm" />
              <ListItem title="Joe's L33t h4x0rz" caption="Saturdays, 3am" /> */}
            </>}
          </div>
          {userData.times.length < 7 ? null :
            <div className="flex flex-col items-stretch gap-2">
              <p className="text-3xl">My schedule:</p>
            </div>
          }
        </div>
      </main>
    );
}
