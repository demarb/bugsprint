"use client"

import Image from "next/image"
import MemberCard from '@/components/MemberCard'
import PendingRequestTile from '@/components/PendingRequestTile'
import { ProjectTypePRIMARY, UserJoinRequestType } from '@/utils/definitions'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import NotAuthorized from "@/components/NotAuthorized"
import ExistingMembers from "@/components/ExistingMembers"

const ProjectMembersPage = ({ params }: { params: { "project_id": string } }) => {

  const {data: session } = useSession()

    const [project, setProject] = useState<ProjectTypePRIMARY>({
      title: "",
      description : "",
      industry : "",
      client : "",
      additional_notes : "",
    })

    const [joinRequests, setJoinRequests] = useState<UserJoinRequestType[]>([])

    //@ts-ignore
    const userProjectRole = session?.user.role
    console.log(`This is the NEW R@LE from /project/[project_id]/members: ${userProjectRole}`)

    

  useEffect(() => {

      const fetchProject = async () => {
        const response = await fetch(`/api/project/${params.project_id}`)
        const data = await response.json()
        setProject(data)
      }
    
        fetchProject()

    }, [])

    useEffect(() => {
    
      const fetchJoinRequests = async () => {
        const project_id = params.project_id
        const response = await fetch(`/api/project/${project_id}/join`)
        const data = await response.json()
        // setJoinRequests(data)
        setJoinRequests(data)
      }
    
      fetchJoinRequests()
  
    }, [])


    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text)
    }

  return (
    <section className='mx-auto py-2'>

{
        (userProjectRole === "Owner" || userProjectRole === "Moderator")

        ?
          <div className=''>
          <div className='flex flex-col justify-between'>
            <h2 className='text-4xl text-primary-green'>Members</h2>

            <div className='py-2 md:py-4'>
                <h2 className='text-2xl text-primary-green'>User Permissions</h2>

                
                <div className=''>
                  <div>
                    <h3 className='text-xl font-bold text-primary-green py-2' >Owner</h3>
                    <ul className='list-disc list-inside'>
                      <li>Has full control over the project. </li>
                      <li>Can create, view, modify, and delete bugs. </li>
                      <li>Can assign bugs to team members. </li>
                      <li>Can add, remove and change the permission of team members.</li>
                      <li>Can modify project settings.</li>
                      <li>Can delete project.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-xl font-bold text-primary-green py-2' >Moderator</h3>
                    <ul className='list-disc list-inside'>
                      <li>Can create, view, modify, and delete bugs. </li>
                      <li>Can assign bugs to team members. </li>
                      <li>Can add, remove and change the permission of team members.</li>
                      <li>Can modify project settings.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-xl font-bold text-primary-green py-2' >Read/Write</h3>
                    <ul className='list-disc list-inside'>
                      <li>Can create, view, modify, and delete bugs. </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-xl font-bold text-primary-green py-2' >Read Only</h3>
                    <ul className='list-disc list-inside'>
                      <li>Can view bugs. </li>
                    </ul>
                  </div>
                </div>
                

                
              </div>

            <div className='py-2 md:py-4'>
                <h2 className='text-2xl text-primary-green'>Existing Members</h2>

                {

                  <ExistingMembers project_id={params.project_id}/>
                  // <div>
                  //   {/* Map over members here */}
                  //   <MemberCard name={"Jon Doe"} email={"jondoe@gmail.com"} permission={"owner"}/>
                  //   <MemberCard name={"Jenny Byron"} email={"jbyron@gmail.com"} permission={"readwrite"}/>
                  // </div>
                }

                  <div className='py-2'>
                    <button className='green_btn'>
                      Save Permissions
                    </button>
                  </div>

                
              </div>


            <hr />


            <div className='py-2 md:py-4'>
                <h2 className='text-2xl text-primary-green'>Share Your Project Access Code To Collaborate</h2>

                <div className=''>
                  <div>
                    {/* <h3 className='text-2xl text-primary-green py-2' >Share Your Project Access Code To Collaborate</h3> */}
                    <h3 className='text-2xl text-primary-green py-2 flex whitespace-pre-wrap'>Access Code: <p className='font-bold flex'>{project.access_code ||  '#########'}</p>
                      <Image src={"/assets/icons/copy-60.png"}
                        alt="Click to copy"
                        width={30}
                        height={30}
                        className="cursor-pointer"
                        onClick={()=>copyToClipboard(project.access_code || "")} 
                      />
                    </h3>

                    

                  </div>
                </div>
              </div>

              <div className='py-2 md:py-4'>
                <h2 className='text-2xl text-primary-green pb-2'>Pending Join Requests</h2>

                
                <div className=''>
                  <div>
                    {/* <h3 className='text-xl font-bold text-primary-green py-2' >Owner</h3> */}
                    {/* <ul className='list-disc list-inside'>
                      <li>exampleuser@mail.com | Approve | Deny </li>
                    </ul> */}

                    {
                      joinRequests &&

                        joinRequests.map((joinrequest)=>{
                          return (
                            <PendingRequestTile joinrequest={joinrequest} project_id={params.project_id} setJoinRequests={setJoinRequests}/>
                          )
                        })

                        // :

                        // <div className='flex border-primary-green border rounded-xl w-2/3 p-3'>

                        //   <div className='bg-primary-off-yellow'>
                        //       <h3 className="font-bold">No Join Requests Found For This Project</h3>
                        //   </div>
                        // </div>
                    }

                    {/* <PendingRequestTile joinrequest={joinrequest}/> */}
                  </div>

                </div>
              </div>
          </div>       
        </div>
        :
        <NotAuthorized message="Modify Member Permissions"/>
      }

      
      
    </section>
  )
}

export default ProjectMembersPage