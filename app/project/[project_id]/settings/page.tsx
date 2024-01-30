"use client"

import {useState, useEffect} from 'react'
import Link from "next/link"
import ProjectConfiguration from '@/components/ProjectConfiguration'
import { ProjectTypePRIMARY } from "@/utils/definitions"
import ProjectForm from '@/components/ProjectForm'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const ProjectSettingsPage = ({ params }: { params: { "project_id": string } }) => {

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
  const [deleting, setDeleting] = useState(false)

  const [confirmedProjectName, setConfirmedProjectName] = useState("")
  const [deleteMatches, setDeleteMatches] = useState(false)

  // const handleConfirmedProjectNameChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

  //   setConfirmedProjectName(e.target.value)

  //   // if(project.project_id===confirmedProjectName){
  //   //   setDeleteMatches(true)
  //   // }else{
  //   // setDeleteMatches(false)
  //   // }
  // }

  useEffect(()=>{
    if(project.project_id===confirmedProjectName){
      setDeleteMatches(true)
    }else{
    setDeleteMatches(false)
    }
  },[confirmedProjectName])

  useEffect(() => {
    
    const fetchProject = async () => {
      const project_id = params.project_id
      const response = await fetch(`/api/project/${project_id}`)
      const data = await response.json()
      setProject(data)
    }
  
      fetchProject()

  }, [])

  const updateProject = async (e : React.SyntheticEvent) => {
    console.log("Attempting to updateProject")
    e.preventDefault();
    setSubmitting(true)

    try {

      const reqBody = {
          title: project.title,
          description : project.description,
          industry : project.industry,
          client : project.client,
          additional_notes  : project.additional_notes
      }

      const project_id = params.project_id
      const response = await fetch(`/api/project/${project_id}`, {
        method: 'PATCH',
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

  const deleteProject = async (e : React.SyntheticEvent) => {
    console.log("Attempting to deleteProject")
    e.preventDefault();
    setDeleting(true)

    try {

      const project_id = params.project_id
      const response = await fetch(`/api/project/${project_id}`, {
        method: "DELETE"
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
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex flex-col justify-between'>
          <h2 className='text-4xl text-primary-green'>Project Settings</h2>

          <div>
            <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>General Project Information</h2>

              <div>
                <h3 className='text-lg font-bold text-primary-green'>Project ID: 
                  <span className='text-black'>{` ${project.project_id}`}</span>
                </h3>

                <ProjectForm type={"Update"} submitting={submitting} project={project} setProject={setProject} handleSubmit={updateProject}/>

                <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                  Save
                </button>
                
              </div>
            </div>

            <hr />

            <ProjectConfiguration project_id={params.project_id}/>

          </div>

          <hr />

          <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Delete Project</h2>

              <div className='flex flex-col justify-around'>

                <p className="text-md text-red-700 py-2">
                  Your Project Cannot Be Recovered After Deletion. All project information, settings, bugs and members and their respective permission will be removed immediately.
                </p>
                <p className="text-md text-red-700">Type Project ID to confirm delete:</p>
                <p className="text-md text-red-700 pb-2 font-bold">{project.project_id}</p>

                <input 
                  type="text" name="project-name-confirmed" id="project-name-confirmed" 
                  value={confirmedProjectName} onChange={(e)=>setConfirmedProjectName(e.target.value)} 
                  className="form_input"
                />

                <button onClick={deleteProject}  disabled={!deleteMatches} className='disabled_delete_btn delete_btn'>
                  {deleting ? "Deleting Project" : "Delete Project"}
                </button>

              </div>
            </div>
        </div>       
      </div>
      
    </section>
  )
}

export default ProjectSettingsPage