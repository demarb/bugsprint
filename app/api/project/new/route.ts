// import Prompt from "@models/prompt";
import { createProjectQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    console.log("Inside api/project/new POST request")

    const project  = await req.json()

    console.log("project received in api route:")
    console.log(project)
    

    try {
        await createProjectQuery(project);

        // return new NextResponse(JSON.stringify(project, { status: 201 }))
        return NextResponse.json(project, { status: 201 })

    } catch (error) {
        return new NextResponse("Failed to create a new project.", { status: 500 }) // server error
    }
}

