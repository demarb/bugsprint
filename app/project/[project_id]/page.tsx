"use client"

import BugsTable from '@/components/BugsTable'
import Image from 'next/image'
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState, useEffect, useCallback } from 'react'
import { BugTypePRIMARY, ProjectAssociationType } from '@/utils/definitions'

const ProjectPage = ({ params }: { params: { "project_id": string } }) => {
  const {data: session, update} = useSession()
  // console.log("This is new client session:")
  // console.log(session)
  const [bugs, setBugs] = useState<BugTypePRIMARY[]>([])
  
  

  // console.log(projectsFakeData)

  useEffect(() => {

    const { project_id } = params    
    const fetchBugs= async () => {
      const response = await fetch(`/api/project/${project_id}/bugs`)
      const data = await response.json()
      setBugs(data)
    }

      fetchBugs()

  }, [])

  //@ts-ignore
  const userProjectRole = session?.user.role
  console.log(`This is the NEW R@LE from /project/[project_id]: ${userProjectRole}`)
  
  // useEffect(() => {

  //   const { project_id } = params
  //   //@ts-ignore
  //   const user_id =  session?.user.id  

  //   const fetchProjectAssociation= async () => {
  //     const response = await fetch(`/api/user/${user_id}/project/${project_id}/association`)
  //     const data: ProjectAssociationType = await response.json()
  //     return data
  //   }

  //   const updateSessionRole = async () => {
  //     const association = await fetchProjectAssociation()
  //   try {

  //     const updatedUser = {
  //       ...session,
  //       user: {
  //         ...session?.user,
  //         role: association.role,
  //       },
  //     };

  //     await update(updatedUser);

  //   } catch (err) {
  //     console.log("There was an error with updating project association role.", err);
  //   }
  //   }
    
  //   updateSessionRole()

  // }, [session])


  

  
  
  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex justify-between'>
          <h2 className='text-3xl text-primary-green'>Bugs</h2>
          <div className='flex'>

            <Link href={`/project/${params.project_id}/bug/new`}>
              <button type="button"
              //   key={}
              //   onClick={}
                className="green_btn mx-2">Submit New Bug
              </button>
            </Link>
            
          </div>
        </div>

        <div className='py-2 md:py-4'>
          <BugsTable bugs={bugs} project_id={params.project_id} /> 
        </div>
              
      </div>

    </section>
  )
}

export default ProjectPage