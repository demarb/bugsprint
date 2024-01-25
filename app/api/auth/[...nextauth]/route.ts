import { createUserQuery, getUserQuery, userExistsQuery } from "@/utils/database";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            // Added ternary to handle type error, that seems to happen if we dont have a fallback string value
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],

    callbacks: {
        // called whenever a session is checked
        async session({ session, user, token }) {
            console.log("Session callback initiated")
            

            if(session.user && session.user){
                
                const initialSessionUserEmail = session.user.email || ""

                // console.log(`Updating session with email ${initialSessionUserEmail}`)

                const sessionUser = await getUserQuery(initialSessionUserEmail)
                //@ts-ignore
                session.user.id = sessionUser.user_id
            }

            // console.log("Version of session sent after callback initiated: ")
            // console.log(session)

            return session
        },

        async signIn({ profile }) {
            console.log("Sign In callback initiated")
            // console.log("Profile receieved in signIn: ")
            // console.log(profile)
            
            const email = profile?.email ?? ""
            const username = profile?.name ? profile?.name?.replace(" ", "").toLowerCase() : ""
            // Next-auth Profile type issues with different providers
            //@ts-ignore
            const image = profile?.picture ?? ""

            // console.log(`Profile Username: ${username}, Profile Email: ${email}, Profile ImageUrl: ${image}`)

            const userExists = await userExistsQuery(email)

            if(!userExists){
                console.log("User does not exist. Attempting to create a user")
                const createUser = await createUserQuery(email, username, image)

                if(!createUser){
                    console.log("Failed to Add New User To Database")
                    return false
                }
                
            }

            return true
        },

    
    }
})

export { handler as GET, handler as POST }