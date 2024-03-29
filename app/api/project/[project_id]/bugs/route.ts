import { getAllProjectBugsQuery } from "@/utils/database";
import { projectsFakeData } from "@/utils/placeholder-data";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This API route is used to:
// 1. Fetch all bugs belonging to a project

export const GET = async (req: NextRequest, { params }: { params: { project_id: string } }) => {

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    console.log("Inside api/project/[project_id]/bugs/ GET request")
    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    try {

        if (session) {
            console.log("Session exists")
            const bugs = await getAllProjectBugsQuery(project_id);
            return NextResponse.json(bugs, { status: 200 })

        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }


    } catch (error) {
        return new NextResponse("Failed to fetch all bugs that belong to a project.", { status: 500 })
    }
}

