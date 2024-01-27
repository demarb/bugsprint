"use client"

import ProjectTile from '@/components/ProjectTile'
import { ProjectTypePRIMARY } from '@/utils/definitions'
import {projectsFakeData} from '@/utils/placeholder-data'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useState, useEffect } from 'react'

const ProjectsPage = () => {

  const {data: session} = useSession()
  const [projects, setProjects] = useState<ProjectTypePRIMARY[]>([])

  // console.log(projectsFakeData)

  useEffect(() => {
    
    // id is a field we added to session
    //@ts-ignore
    const fetchProjects = async () => {
      // id is a field we added to session
      //@ts-ignore
      const user_id = session?.user?.id
      const response = await fetch(`/api/user/${user_id}/projects`)
      const data = await response.json()
      setProjects(data)
    }
  
    // id is a field we added to session
    //@ts-ignore
    if(session?.user){
      fetchProjects()
    }

  }, [session])
  
  

  let hasProjects = projects.length>0 ? true : false

  return (
    <section className='w-4/5 mx-auto py-12'>

      <div className='flex justify-between items-center'>
        <h1 className='text-6xl font-extrabold text-primary-green'>Projects</h1>

        {
          hasProjects ? 
            <Link href="/project/new" className="flex">
              <button 
                type="button"
                // key={}
                // onClick={}
                className="green_btn text-center items-center"
              >
                New
              </button>
          </Link>

          :

          <div></div>
        }

        
      </div>
      

      <div className='flex flex-wrap justify-center gap-2 pt-8'>
        {
          
          hasProjects ? 

            projects.map((project)=>{
              return (
                <ProjectTile
                  key={project.project_id}
                  project={project}
                />
              )
            })

            

            // <div>
            //   <h1>We Found Projects for You</h1>



            // </div>
          :
          
          <Link href="/project/new" className="flex">
            <div className='border-2 rounded-md border-stone-400 p-8 mt-8 md:mt-16 w-full hover:border-primary-green hover:cursor-pointer'>
              <h1 className='text-3xl'>Create a New Project</h1>
              <h2 className='text-sm text-stone-500'>Start tracking bugs for your next project here...</h2>
            </div>
          </Link>
          
          
        }
      </div>
      
    </section>
  )
}

export default ProjectsPage