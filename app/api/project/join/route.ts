import { checkUniqueAccessCodeQuery, existingJoinRequestExistsQuery, createJoinRequestQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This API route is used to:
// 1. Create a new request to join a project

export const POST = async (req: NextRequest, res: NextResponse) => {

    console.log("Inside api/project/join POST request")
    const joinrequest = await req.json()
    console.log("joinrequest received in api route:")
    console.log(joinrequest)

    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession")
    console.log(session)

    try {

        if (session) {
            console.log("Session exists")
            // Check if project exists with access code
            const accessCodeExists = await checkUniqueAccessCodeQuery(joinrequest.access_code);

            if (!accessCodeExists) {
                return new NextResponse("A project does not exist with this access code.", { status: 500 })
            }

            // Check if there is already a pending request with this user for this project
            const pendingRequestExists = await existingJoinRequestExistsQuery(joinrequest)
            if (pendingRequestExists) {
                // Conflict - 409
                return new NextResponse("A request to join this project already exists.", { status: 409 })
            }

            // Create a join request
            await createJoinRequestQuery(joinrequest);
            return NextResponse.json("A request to join a project was sent successful", { status: 201 })

        } else {
            console.log("Session does not exist")
            return new NextResponse("You are not signed in.", { status: 401 })
        }

    } catch (error) {
        return new NextResponse("Failed to create a new join request to a project.", { status: 500 }) // server error
    }
}

