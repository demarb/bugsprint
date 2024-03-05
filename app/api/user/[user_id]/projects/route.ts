import { getUserProjectsQuery } from "@/utils/database";
import { projectsFakeData } from "@/utils/placeholder-data";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth'


// This API route is used to:
// 1. Fetch all projects the user has access to - both projects they own and projects they have been added to

export const GET = async (req: NextRequest, { params }: { params: { user_id: string } }) => {

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    console.log("Inside api/user/[user_id]/projects/ GET request")

    const { user_id } = params 
    console.log(params)
    console.log(`Userid ${user_id}`)

    try {

        if (session) {
            console.log("Session exists")
            const projects = await getUserProjectsQuery(user_id);
            return NextResponse.json(projects, { status: 200 })
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }
    } catch (error) {
        return new NextResponse("Failed to fetch all projects that user has access to.", { status: 500 })
    }
}

