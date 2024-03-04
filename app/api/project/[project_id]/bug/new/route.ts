import { createBugQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Create a new bug

export const POST = async (req: NextRequest, res: NextResponse) => {

    console.log("Inside api/project/[project_id]/bug/new POST request")
    const bug  = await req.json()
    console.log("bug received in api route:")
    console.log(bug)

    try {
        await createBugQuery(bug);
        return NextResponse.json(bug, { status: 201 })
    } catch (error) {
        return new NextResponse("Failed to create a new bug.", { status: 500 }) // server error
    }
}

