import { getProjectAsssociationQuery } from "@/utils/database";
import { BugTypePRIMARY } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Fetch the association between a project and a user. Eg. So we can check their role.

// Get Association Details
export const GET = async (req: NextRequest, { params }: { params: { project_id: string, user_id: string }}) => {

    console.log("Inside api/user/[user_id]/project/[project_id]/association GET request")
    const { project_id, user_id } = params 
    console.log(params)
    console.log(`ProjectId ${project_id}`)
    console.log(`UserId ${user_id}`)

    try {
        const association = await getProjectAsssociationQuery(project_id, user_id);

        return NextResponse.json(association, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to project association details.", { status: 500 })
    }
}