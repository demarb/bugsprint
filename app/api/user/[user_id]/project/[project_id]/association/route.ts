import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProjectAsssociationQuery, updateAssociationQuery } from "@/utils/database";
import { BugTypePRIMARY } from "@/utils/definitions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Fetch the association between a project and a user. Eg. So we can check their role.
// 2. Update the role of a user that links them to a project

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

// Update Association
export const PATCH = async (req: NextRequest, { params }: { params: { project_id: string, user_id: string } }) => {
    
    console.log("Inside api/user/[user_id]/project/[project_id]/association PATCH request")
    const association = await req.json()
    // const { bug_id } = params 
    // console.log(params)
    // console.log(`BugId ${bug_id}`)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            //@ts-ignore
            if(session.user?.role === "Owner" || session.user?.role === "Moderator"){
                const updatedAssociation = await updateAssociationQuery(association.association_id, association.role);
                return NextResponse.json(association, { status: 200 })

            }else{
                return new NextResponse("You do not have the necessary permission to perform the requested action.", { status: 403 })
            }
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }
        
    } catch (error) {
        return new NextResponse("Failed to update bug details.", { status: 500 })
    }

}