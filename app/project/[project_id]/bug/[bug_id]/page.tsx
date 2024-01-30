"use client"

import BugForm from '@/components/BugForm'
import {useState, useEffect} from 'react'
import { BugTypePRIMARY } from "@/utils/definitions"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const BugPage = ({ params }: { params: { "project_id": string, "bug_id": string } }) => {

  const project_id = params.project_id
  const bug_id = params.bug_id

  const router = useRouter()

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

  useEffect(() => {
    
    const fetchProject = async () => {
      // const project_id = params.project_id
      // const bug_id = params.bug_id
      const response = await fetch(`/api/project/${project_id}/bug/${bug_id}`)
      const data = await response.json()
      setBug(data)
    }
  
      fetchProject()

  }, [])

  const updateBug = async (e : React.SyntheticEvent) => {
    console.log("Attempting to updateBug")
    e.preventDefault();
    setSubmitting(true)

    try {

        const reqBody = {
          title: bug.title,
          description : bug.description,
          status : bug.status,
          priority : bug.priority,
          severity : bug.severity,
          environment : bug.environment,
          is_user_reported : bug.is_user_reported
      }
      

      

      const response = await fetch(`/api/project/${project_id}/bug/${bug_id}`, {
        method: 'PATCH',
        body: JSON.stringify(reqBody)
    })

        if(response.ok){
            router.push(`/project/${project_id}/bug/${bug_id}`);
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
        <div className='flex flex-col justify-between'>
          <h2 className='text-4xl text-primary-green'>Bug Id: 
            <span className='text-3xl'> {bug_id}</span>
          </h2>

            <div className='py-2 md:py-4'>
                
            <BugForm 
              type={"Update"} 
              submitting={submitting} 
              bug={bug} 
              setBug={setBug} 
              handleSubmit={updateBug}
            />
            
            </div>
        </div>       
      </div>
      
    </section>
    
  )
}

export default BugPage