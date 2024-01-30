"use client"

import { useState } from "react"
import Link from "next/link"
import ProjectForm from "@/components/ProjectForm"
import { ProjectTypePRIMARY } from "@/utils/definitions"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const NewProjectPage = () => {

  const router = useRouter()
  const {data: session } = useSession()

  const [project, setProject] = useState<ProjectTypePRIMARY>({
    title: "",
    description : "",
    industry : "",
    client : "",
    additional_notes : "",
  })
  const [submitting, setSubmitting] = useState(false)

  const createProject = async (e : React.SyntheticEvent) => {
    console.log("Attempting to createProject")
    e.preventDefault();
    setSubmitting(true)

    try {

      const reqBody = {
          // id is a field we added to session
          //@ts-ignore
          owner_id: session?.user?.id,
          title: project.title,
          description : project.description,
          industry : project.industry,
          client : project.client,
          additional_notes  : project.additional_notes
      }

      console.log("This is the request body we are assembling")
      console.log(reqBody)
      
        const response = await fetch('/api/project/new', {
            method: 'POST',
            body: JSON.stringify(reqBody)
        })

        if(response.ok){
            router.push('/projects');
        }

    } catch (error) {
        console.log(error)
    } finally{
        setSubmitting(false)
    }
}

  return (
    <section className='w-4/5 mx-auto py-12'>

      <div className='flex justify-between items-center'>
        <h1 className='text-6xl font-extrabold text-primary-green'>New Project</h1>
     </div>
      
      <h2 className="py-2 md:py-4 text-lg text-primary-green font-bold">Note: All projects are private by default. You can modify this later.</h2>
      
      <ProjectForm 
        type={"Create"} 
        submitting={submitting} 
        project={project} 
        setProject={setProject} 
        handleSubmit={createProject}
      />
      
    </section>
  )
}

export default NewProjectPage