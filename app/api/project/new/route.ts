import { createProjectQuery, createUserProjectAssociationQuery } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { ProjectTypePRIMARY } from "@/utils/definitions"

export const POST = async (req: NextRequest, res: NextResponse) => {

    console.log("Inside api/project/new POST request")

    const project: ProjectTypePRIMARY  = await req.json()

    console.log("project received in api route:")
    console.log(project)
    const {owner_id} = project
    

    try {
        const isCreated = await createProjectQuery(project);
        
        // if(isCreated){
        //     await createUserProjectAssociationQuery(owner_id || "", "s", "Owner")
        // }

        // return new NextResponse(JSON.stringify(project, { status: 201 }))
        return NextResponse.json(project, { status: 201 })

    } catch (error) {
        return new NextResponse("Failed to create a new project.", { status: 500 }) // server error
    }
}

