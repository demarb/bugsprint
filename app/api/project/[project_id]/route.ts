import { getProjectQuery, updateProjectQuery } from "@/utils/database";
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

    // try {
    //     await connectToDB()

    //     const existingPrompt = await Prompt.findById(params.id)

    //     if (!existingPrompt) {
    //         return new Response("Prompt not found", { status: 404 })
    //     }

    //     existingPrompt.prompt = prompt;
    //     existingPrompt.tag = tag;

    //     await existingPrompt.save();

    //     return new Response(JSON.stringify(existingPrompt), { status: 200 })

    // } catch (error) {
    //     return new Response("Failed to update the prompt", { status: 500 })
    // }
}
