"use client"

import HugeTitle from "../../Components/Typography/HugeTitle";
import ListItem from "@/app/Components/ListItem";
import { User } from "@/lib/user";
import { getTimes, studentSearch } from "@/lib/student_search"
import { getClass } from "@/lib/class_functions";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function ClassPage({ params }: { params: { classNum: string } }) {
  const [userData, setUserData] = useState<User | null>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [courseData, setCourseData] = useState<any>(null)
  const [groups, setGroups] = useState<any>(null);
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) { return }
    async function fetchData() {
      let res = await fetch('/api/student/' + session?.user?.name)
      let data = await res.json()
      setUserData(data)

      // get the class
      console.log(decodeURI(params.classNum).replace("%3A", ":"))
      let classData:any = await getClass(decodeURI(params.classNum).replace("%3A", ":"));

      console.log(classData)

      let studentData = await studentSearch(await getTimes(session?.user?.name), classData.users.filter((user: any) => user != session?.user?.name), 16, 44)

      console.log(studentData)


      let groups = await (await fetch("/api/groups/" + params.classNum, {
        method: "GET"
      })).json()


      console.log(groups)
      setGroups(groups);
      setStudentData(studentData);
      setCourseData(classData);
      console.log("done")
    }
    fetchData()
  }, [session])
  
  if (!userData || !studentData || !groups) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a className="text-3xl">{session?.user?.name}'s suggestions for</a>
        <HugeTitle>{decodeURI(params.classNum).split(" ")[0]}.</HugeTitle>
        <ListItem title="Back to Home" caption="Home" href="/account"/>
      </header>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Study groups:</p>
          {groups.map((group: any) => (
            <ListItem title={group.groupName} caption={group.times} href={`/groups/` + group.groupName}/>  
          ))}
          <ListItem title="Create a new group" href={`${params.classNum}/createNewGroup`}/>  
        </div>
        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Students with common free time:</p>
          {Array.from(Array(200).keys()).toReversed().map(key => (studentData[key] ?
            <ListItem title={studentData[key]} caption={(key/2) + " Hours"} /> : null
          ))}
        </div>
      </div>
    </main>
  )
}