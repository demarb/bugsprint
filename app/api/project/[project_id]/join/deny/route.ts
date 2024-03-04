import { denyJoinRequestQuery} from "@/utils/database";
import { UserJoinRequestType } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";

// This API route is used to:
// 1. Deny a request to join a project

// Update Deny JoinRequest Details
export const PATCH = async (req: NextRequest, { params }: { params: { project_id: string } }) => {
    
    console.log("Inside api/project/[project_id]/join/deny PATCH request")
    const joinrequest: UserJoinRequestType  = await req.json()
    const { joinrequest_id } = joinrequest 
    console.log(`JoinRequest_Id ${joinrequest_id}`)

    try {
        const isUpdated = await denyJoinRequestQuery(joinrequest_id);

        return NextResponse.json(joinrequest_id, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to deny join request.", { status: 500 })
    }

}