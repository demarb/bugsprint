import { denyJoinRequestQuery} from "@/utils/database";
import { UserJoinRequestType } from "@/utils/definitions";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This API route is used to:
// 1. Deny a request to join a project

// Update Deny JoinRequest Details
export const PATCH = async (req: NextRequest, { params }: { params: { project_id: string } }) => {
    
    console.log("Inside api/project/[project_id]/join/deny PATCH request")
    const joinrequest: UserJoinRequestType  = await req.json()
    const { joinrequest_id } = joinrequest 
    console.log(`JoinRequest_Id ${joinrequest_id}`)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            //@ts-ignore
            if(session.user?.role === "Owner" || session.user?.role === "Moderator"){
                const isUpdated = await denyJoinRequestQuery(joinrequest_id);
                return NextResponse.json(joinrequest_id, { status: 200 })

            }else{
                return new NextResponse("You do not have the necessary permission to perform the requested action.", { status: 403 })
            }
        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }


        const isUpdated = await denyJoinRequestQuery(joinrequest_id);
        return NextResponse.json(joinrequest_id, { status: 200 })

    } catch (error) {
        return new NextResponse("Failed to deny join request.", { status: 500 })
    }

}