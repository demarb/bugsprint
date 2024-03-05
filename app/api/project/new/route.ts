import { createProjectQuery, createUserProjectAssociationQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { ProjectTypePRIMARY } from "@/utils/definitions"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This API route is used to:
// 1. Create a new project.

export const POST = async (req: NextRequest, res: NextResponse) => {

    console.log("Inside api/project/new POST request")
    const project: ProjectTypePRIMARY  = await req.json()
    console.log("project received in api route:")
    console.log(project)
    const {owner_id} = project
    
    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {
    
        if (session) {
            console.log("Session exists")
            const isCreated = await createProjectQuery(project);
            //A database action function is triggered automatically to create a user project association.

            return NextResponse.json(project, { status: 201 })
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }

    } catch (error) {
        return new NextResponse("Failed to create a new project.", { status: 500 }) // server error
    }
}

