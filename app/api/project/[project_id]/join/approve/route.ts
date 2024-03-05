import { approveJoinRequestQuery, createUserProjectAssociationQuery } from "@/utils/database";
import { UserJoinRequestType } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This API route is used to:
// 1. Approve a request to join a project

// Update Approve JoinRequest Details
export const PATCH = async (req: NextRequest, { params }: { params: { project_id: string } }) => {
    
    console.log("Inside api/project/[project_id]/join/approve PATCH request")
    const joinrequest: UserJoinRequestType  = await req.json()
    const { joinrequest_id, user_id, project_id } = joinrequest 
    console.log(`JoinRequest_Id ${joinrequest_id}`)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            //@ts-ignore
            if(session.user?.role === "Owner" || session.user?.role === "Moderator"){
                const isUpdated = await approveJoinRequestQuery(joinrequest_id);

                if(isUpdated){
                    await createUserProjectAssociationQuery(user_id, project_id, "Moderator")
                }
        
                return NextResponse.json(joinrequest_id, { status: 200 })

            }else{
                return new NextResponse("You do not have the necessary permission to perform the requested action.", { status: 403 })
            }
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }



    } catch (error) {
        return new NextResponse("Failed to approve join request.", { status: 500 })
    }
}