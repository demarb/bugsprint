"use client"

import { useState } from "react"
import BugForm from '@/components/BugForm'
import { BugTypePRIMARY } from "@/utils/definitions"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const NewBugPage = ({ params }: { params: { "project_id": string } }) => {

  const router = useRouter()
  const {data: session } = useSession()

  const [bug, setBug] = useState<BugTypePRIMARY>({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    severity: "Minor",
    environment: "",
    is_user_reported: false,
  })

  const [submitting, setSubmitting] = useState(false)

  const createBug = async (e : React.SyntheticEvent) => {
    console.log("Attempting to createBug")
    e.preventDefault();
    setSubmitting(true)
    const project_id = params.project_id

    

    try {

      const reqBody = {
          
          project_id: project_id,
          // id is a field we added to session
          //@ts-ignore
          creator_id: session?.user?.id,
          title: bug.title,
          description : bug.description,
          status : bug.status,
          priority : bug.priority,
          severity : bug.severity,
          environment : bug.environment,
          is_user_reported : bug.is_user_reported
      }

      console.log("This is the request body we are assembling")
      console.log(reqBody)
      
       

        const response = await fetch(`/api/project/${project_id}/bug/new`, {
            method: 'POST',
            body: JSON.stringify(reqBody)
        })

        if(response.ok){
            router.push(`/project/${project_id}`);
        }

    } catch (error) {
        console.log(error)
    } finally{
        setSubmitting(false)
    }
}

  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex justify-between'>
          <h2 className='text-3xl text-primary-green'>Report a Bug</h2>
          
        </div> 

        <div className=''>
        <BugForm 
          type={"Create"} 
          submitting={submitting} 
          bug={bug} 
          setBug={setBug} 
          handleSubmit={createBug}
        />
        </div>      
      </div>
      
    </section>
  )
}

export default NewBugPage