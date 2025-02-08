import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({  
    // Configure one or more authentication providers  
    providers: [    
        DiscordProvider({      
            clientId: "1284312985996754995",      
            clientSecret: process.env.DISCORD_SECRET ?? "",    
        }),    
        GoogleProvider({
            clientId: "218973554999-17ufl1t2f7ml1a1jv15sak99pvk81198.apps.googleusercontent.com",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        })
    ],})

export { handler as GET, handler as POST }