import { getProjectQuery, updateProjectQuery, deleteProjectQuery } from "@/utils/database";
import { ProjectTypePRIMARY } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";

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

//DELETE (delete)

// export const DELETE = async (request, { params }) => {
//     try {
//         await connectToDB()

//         // await Prompt.findByIdAndRemove(params.id)
//         await Prompt.findByIdAndDelete(params.id)

//         return new Response("Prompt deleted successfully", { status: 200 })

//     } catch (error) {
//         return new Response("Failed to delete the prompt", { status: 500 })
//     }
// }