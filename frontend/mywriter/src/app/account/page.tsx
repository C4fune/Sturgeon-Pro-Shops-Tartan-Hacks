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
      let res = await fetch('api/user/' + session?.user?.email)
      let data = await res.json()
      setUserData(data)
    }
    fetchData()
  }, [session])


  if (!userData) { return (<p>loading...</p>)}

  return (
      <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <p className="text-3xl">Welcome,</p>
          <p>{userData.username}.</p>
        </header>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">Your Books:</p>
            {userData.books.length < 1 ? <p>You haven't made any books!</p> : <>
              {userData.books.map(book => (
                <p title={book.title} />
              ))}
              {/* <ListItem title="Haolin's Study Group" caption="Tuesdays, Thursdays, 7:00pm" href="/groups/haolin-group"/>
              <ListItem title="Tyler's Study Group" caption="Mondays, Fridays, 6:30pm" />
              <ListItem title="Joe's L33t h4x0rz" caption="Saturdays, 3am" /> */}
            </>}
          </div>
        </div>
      </main>
    );
}
