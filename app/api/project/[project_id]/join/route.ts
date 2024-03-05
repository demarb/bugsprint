import { getAllProjectJoinRequestsQuery } from "@/utils/database";
import { projectsFakeData } from "@/utils/placeholder-data";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This API route is used to:
// 1. Get all pending join requests for a project

export const GET = async (req: NextRequest, { params }: { params: { project_id: string } }) => {

    console.log("Inside api/project/[project_id]/join/ GET request")

    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            //@ts-ignore
            if(session.user?.role === "Owner" || session.user?.role === "Moderator"){
                const joinrequests = await getAllProjectJoinRequestsQuery(project_id);
                return NextResponse.json(joinrequests, { status: 200 })

            }else{
                return new NextResponse("You do not have the necessary permission to perform the requested action.", { status: 403 })
            }
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }

        

    } catch (error) {
        return new NextResponse("Failed to fetch all join requests that belong to a project.", { status: 500 })
    }
}

