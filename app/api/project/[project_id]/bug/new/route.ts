import { createBugQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


// This API route is used to:
// 1. Create a new bug

export const POST = async (req: NextRequest, res: NextResponse) => {

    console.log("Inside api/project/[project_id]/bug/new POST request")
    const bug  = await req.json()
    console.log("bug received in api route:")
    console.log(bug)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)


    try {

        if (session) {
            console.log("Session exists")
            //@ts-ignore
            if(session.user?.role === "Owner" || session.user?.role === "Moderator" || session.user?.role === "Read-Write"){
                await createBugQuery(bug);
                return NextResponse.json(bug, { status: 201 })

            }else{
                return new NextResponse("You do not have the necessary permission to perform the requested action.", { status: 403 })
            }
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }
        
        
    } catch (error) {
        return new NextResponse("Failed to create a new bug.", { status: 500 }) // server error
    }
}

