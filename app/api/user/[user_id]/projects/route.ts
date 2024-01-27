import { getUserProjectsQuery } from "@/utils/database";
import { projectsFakeData } from "@/utils/placeholder-data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { user_id: string } }) => {

    console.log("Inside api/user/[user_id]/projects/ GET request")

    const { user_id } = params 
    console.log(params)
    console.log(`Userid ${user_id}`)

    try {
        const projects = await getUserProjectsQuery(user_id);

        return NextResponse.json(projects, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to fetch all projects that user has access to.", { status: 500 })
    }
}

