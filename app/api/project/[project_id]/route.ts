import { getProjectQuery, updateProjectQuery, deleteProjectQuery } from "@/utils/database";
import { ProjectTypePRIMARY } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Fetch project details using project id
// 2. Update project details using a project id.
// 3. Delete a project using a project id.

// Get Project Details
export const GET = async (req: NextRequest, { params }: { params: { project_id: string } }) => {

    console.log("Inside api/project/[project_id] GET request")
    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    try {
        const project = await getProjectQuery(project_id);

        return NextResponse.json(project, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to fetch project details.", { status: 500 })
    }
}

// Update Project Details
export const PATCH = async (req: NextRequest, { params }: { params: { project_id: string } }) => {
    
    console.log("Inside api/project/[project_id] PATCH request")
    const project: ProjectTypePRIMARY  = await req.json()
    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    try {
        const updatedProject = await updateProjectQuery(project, project_id);

        return NextResponse.json(project, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to update project details.", { status: 500 })
    }

}

// Delete Project 
export const DELETE = async (req: NextRequest, { params }: { params: { project_id: string } }) => {
    
    console.log("Inside api/project/[project_id] DELETE request")
    const { project_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)

    try {
        await deleteProjectQuery(project_id);

        return NextResponse.json("Project successfully deleted", { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to delete project.", { status: 500 })
    }

}