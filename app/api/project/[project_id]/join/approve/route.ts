import { approveJoinRequestQuery, createUserProjectAssociationQuery } from "@/utils/database";
import { UserJoinRequestType } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Approve a request to join a project

// Update Approve JoinRequest Details
export const PATCH = async (req: NextRequest, { params }: { params: { project_id: string } }) => {
    
    console.log("Inside api/project/[project_id]/join/approve PATCH request")
    const joinrequest: UserJoinRequestType  = await req.json()
    const { joinrequest_id, user_id, project_id } = joinrequest 
    console.log(`JoinRequest_Id ${joinrequest_id}`)

    try {
        const isUpdated = await approveJoinRequestQuery(joinrequest_id);

        if(isUpdated){
            await createUserProjectAssociationQuery(user_id, project_id, "Moderator")
        }

        return NextResponse.json(joinrequest_id, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to approve join request.", { status: 500 })
    }
}