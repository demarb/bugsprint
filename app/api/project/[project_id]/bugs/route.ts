import { getAllProjectBugsQuery } from "@/utils/database";
import { projectsFakeData } from "@/utils/placeholder-data";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Fetch all bugs belonging to a project

export const GET = async (req: NextRequest, { params }: { params: { project_id: string } }) => {

    console.log("Inside api/project/[project_id]/bugs/ GET request")
    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    try {
        const bugs = await getAllProjectBugsQuery(project_id);
        return NextResponse.json(bugs, { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to fetch all bugs that belong to a project.", { status: 500 })
    }
}

