import { getBugQuery, updateBugQuery, deleteBugQuery } from "@/utils/database";
import { BugTypePRIMARY } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This API route is used to:
// 1. Fetch a bug using bug id
// 2. Update a bug using a bug id.
// 3. Delete a bug using a bug id.

// Get Bug Details
export const GET = async (req: NextRequest, { params }: { params: { project_id: string, bug_id: string } }) => {

    console.log("Inside api/project/[project_id]/bug/[bug_id] GET request")
    const { bug_id} = params 
    console.log(params)
    console.log(`BugId ${bug_id}`)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            const bug = await getBugQuery(bug_id);
            return NextResponse.json(bug, { status: 200 })
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }

    } catch (error) {
        return new NextResponse("Failed to fetch bug details.", { status: 500 })
    }
}

// Update Bug Details
export const PATCH = async (req: NextRequest, { params }: { params: { project_id: string, bug_id: string } }) => {
    
    console.log("Inside api/project/[project_id]/bug/[bug_id] PATCH request")
    const bug: BugTypePRIMARY  = await req.json()
    const { bug_id } = params 
    console.log(params)
    console.log(`BugId ${bug_id}`)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            //@ts-ignore
            if(session.user?.role === "Owner" || session.user?.role === "Moderator" || session.user?.role === "Read-Write"){
                const updatedBug = await updateBugQuery(bug, bug_id);
                return NextResponse.json(bug, { status: 200 })

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

// Delete Bug
export const DELETE = async (req: NextRequest, { params }: { params: { project_id: string, bug_id: string } }) => {
    
    console.log("Inside api/project/[project_id]/bug/[bug_id] DELETE request")
    const { bug_id } = params 
    console.log(params)
    console.log(`BugId: ${bug_id}`)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            //@ts-ignore
            if(session.user?.role === "Owner" || session.user?.role === "Moderator" || session.user?.role === "Read-Write"){
                await deleteBugQuery(bug_id);  
                return NextResponse.json("Bug successfully deleted", { status: 200 })

            }else{
                return new NextResponse("You do not have the necessary permission to perform the requested action.", { status: 403 })
            }
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }
        
    } catch (error) {
        return new NextResponse("Failed to delete bug.", { status: 500 })
    }
}