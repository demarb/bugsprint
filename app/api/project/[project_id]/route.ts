import { getProjectQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { project_id: string } }) => {

    console.log("Inside api/project/[project_id] GET request")

    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    try {
        const project = await getProjectQuery(project_id);

        return NextResponse.json(project, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to fetch project.", { status: 500 })
    }
}

