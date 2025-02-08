import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session != null) {
    fetch("api/register/" + session.user?.name, {
      method: "PUT"
    })
  }

  if (session != null && session.user != null) {
    return (
      <div className="flex-col">
        Signed in as {session.user.email} <br />
        <div className="flex gap-16">
            <button className="text-5xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border" onClick={() => signOut()}>Sign out.</button>
            <a href="account" className="text-5xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border">Go to profile.</a>
        </div>
      </div>
    )
  }
  return (
    <div className="flex-col">
        Not signed in <br />
        <button className="text-5xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border" onClick={() => signIn()}>Sign in.</button>
    </div>
  )
}