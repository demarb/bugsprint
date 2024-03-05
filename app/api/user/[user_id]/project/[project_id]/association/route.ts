import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProjectAsssociationQuery } from "@/utils/database";
import { BugTypePRIMARY } from "@/utils/definitions";
import { getServerSession } from "next-auth";
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

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            const association = await getProjectAsssociationQuery(project_id, user_id);
            return NextResponse.json(association, { status: 200 })
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }
    } catch (error) {
        return new NextResponse("Failed to project association details.", { status: 500 })
    }
}