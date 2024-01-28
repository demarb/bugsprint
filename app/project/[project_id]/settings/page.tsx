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

  const [confirmedProjectName, setConfirmedProjectName] = useState("")

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
      
        // const response = await fetch('/api/project/new', {
        //     method: 'POST',
        //     body: JSON.stringify(reqBody)
        // })

        if(response.ok){
            router.push('/projects');
        }

    } catch (error) {
        console.log(error)
    } finally{
        setSubmitting(false)
    }
}

  // const [title, setTitle] = useState("")
  // const [description, setDescription] = useState("")
  // const [industry, setIndustry] = useState("")
  // const [client, setClient] = useState("")
  // const [notes, setNotes] = useState("")

  // const maxDescriptionLength = 250
  // const maxNotesLength = 500

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

                {/* <form className="flex flex-col pt-8">
                  <label className="text-lg">Title
                    <br className=""/>
                    <input 
                      type="text" name="project-title" id="project-title" 
                      value={title} onChange={(e)=>setTitle(e.target.value)} 
                      className="form_input"
                      required maxLength={100}
                    />
                  </label>

                  <label className="text-lg">Description
                    <br className=""/>
                    <textarea 
                      name="project-description" id="project-description" 
                      value={description} onChange={(e)=>setDescription(e.target.value)} 
                      className="form_textarea"
                      rows={3} maxLength={maxDescriptionLength}
                    />
                    <p className="text-xs text-stone-500">{maxDescriptionLength - description.length} characters remaining</p>
                  </label>

                  <label className="text-lg">Industry
                    <br className=""/>
                    <input 
                      type="text" name="project-industry" id="project-industry" 
                      value={industry} onChange={(e)=>setIndustry(e.target.value)} 
                      className="form_input"
                      required maxLength={100}
                    />
                  </label>

                  <label className="text-lg">Client
                    <br className=""/>
                    <input 
                      type="text" name="project-client" id="project-client" 
                      value={client} onChange={(e)=>setClient(e.target.value)} 
                      className="form_input" maxLength={100}
                    />
                  </label>

                  <label className="text-lg">Additional Notes
                    <br className=""/>
                    <textarea 
                      name="project-notes" id="project-notes" 
                      value={notes} onChange={(e)=>setNotes(e.target.value)} 
                      className="form_input"
                      rows={6} maxLength={maxNotesLength}
                    />
                    <p className="text-xs text-stone-500">{maxNotesLength - notes.length} characters remaining</p>

                  </label>


                </form> */}

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

                <button className='my-2 bg-red-700 border-red-700 border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                  Delete Project
                </button>

              </div>
            </div>
        </div>       
      </div>
      
    </section>
  )
}

export default ProjectSettingsPage