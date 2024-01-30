import { createBugQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    console.log("Inside api/project/[project_id]/bug/new POST request")

    const bug  = await req.json()

    console.log("bug received in api route:")
    console.log(bug)
    

    try {
        await createBugQuery(bug);

        // return new NextResponse(JSON.stringify(project, { status: 201 }))
        return NextResponse.json(bug, { status: 201 })

    } catch (error) {
        return new NextResponse("Failed to create a new bug.", { status: 500 }) // server error
    }
}

