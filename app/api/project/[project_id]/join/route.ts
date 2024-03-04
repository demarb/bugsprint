import { getAllProjectJoinRequestsQuery } from "@/utils/database";
import { projectsFakeData } from "@/utils/placeholder-data";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Get all pending join requests for a project

export const GET = async (req: NextRequest, { params }: { params: { project_id: string } }) => {

    console.log("Inside api/project/[project_id]/join/ GET request")

    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    try {
        const joinrequests = await getAllProjectJoinRequestsQuery(project_id);

        return NextResponse.json(joinrequests, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to fetch all join requests that belong to a project.", { status: 500 })
    }
}

