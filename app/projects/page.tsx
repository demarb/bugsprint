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
  const [accessCode, setAccessCode] = useState("")
  const [toggleJoinDropdown, setToggleJoinDropdown] = useState(false)


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
  hasProjects = false

  const handleJoinClick = async (e : React.SyntheticEvent) =>{
    e.preventDefault()



    try {
      const reqBody = {
          // id is a field we added to session
          //@ts-ignore
          user_id: session?.user?.id,
          access_code: accessCode,
      }

      console.log("This is the request body we are assembling")
      console.log(reqBody)
      
        const response = await fetch('/api/project/join', {
            method: 'POST',
            body: JSON.stringify(reqBody)
        })
    } catch (error) {
      
    }finally{
      setAccessCode("")
      setToggleJoinDropdown(false)
    }
    
  }

  return (
    <section className='w-4/5 mx-auto py-12'>

      <div className='flex justify-between items-center'>
        <h1 className='text-6xl font-extrabold text-primary-green'>Projects</h1>

        {
          hasProjects ?
          <div className='flex'>
            <Link href="/project/new" className="px-2">
              <button 
                type="button"
                // key={}
                // onClick={}
                className="green_btn text-center items-center"
              >
                New
              </button>
            </Link>
 

            <div className='relative'>

              <button 
                  type="button"
                  // key={}
                  // onClick={}
                  className="green_btn text-center items-center px-2"
                  // onClick={()=>setToggleJoinDropdown(true)}
                  onClick={()=>setToggleJoinDropdown((prev)=>!prev)} 
                >
                  Join
                </button>

              {toggleJoinDropdown && (
                <div className="absolute -right-full mt-3 p-5 rounded-lg bg-primary-green min-w-[210px] flex flex-col gap-2 justify-end items-end">
                  {/* <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={()=>setToggleJoinDropdown(false)}
                  >
                    Profile
                  </Link> */}
                  
                  <h1 className='text-3xl text-white'>Join a Project</h1>
                  <h2 className='text-sm text-white'>Entire access code to join an existing project...</h2>
                  <form >
                    <input 
                      type="number" name="project-title" id="project-title" 
                      value={accessCode} onChange={(e)=>setAccessCode(e.target.value)}
                      className="form_input readonly_form font-bold text-5xl"
                      min={100000000} max={999999999} maxLength={9}
                    />
                    <button type="submit" onClick={(e)=>handleJoinClick(e)} className='inverted_green_btn ml-auto mt-2'>Join</button>
                  </form>


                  {/* <button className="mt-5 w-full inverted_green_btn" type="button" onClick={()=>{
                    setToggleJoinDropdown(false);
                    // signOut();
                  }}>
                    Sign Out
                  </button> */}
                </div>
              )}
            </div>

            {/* <button 
                type="button"
                key={}
                onClick={}
                className="green_btn text-center items-center px-2"
              >
                Join
              </button> */}


          </div> 
            

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
          
          <div>
            <Link href="/project/new" className="flex">
            <div className='border-2 rounded-md border-stone-400 p-8 mt-8 md:mt-16 w-full hover:border-primary-green hover:cursor-pointer'>
              <h1 className='text-3xl'>Create a New Project</h1>
              <h2 className='text-sm text-stone-500'>Start tracking bugs for your next project here...</h2>
            </div>
          </Link>
          <div className="flex">
            <div className='border-2 rounded-md border-stone-400 p-8 mt-8 md:mt-16 w-full hover:border-primary-green'>
              
              <h1 className='text-3xl'>Join a Project</h1>
              <h2 className='text-sm text-stone-500'>Entire access code to join an existing project...</h2>
              <form >
                <input 
                  type="number" name="project-title" id="project-title" 
                  value={accessCode} onChange={(e)=>setAccessCode(e.target.value)}
                  className="form_input readonly_form font-bold text-5xl"
                  min={100000000} max={999999999} maxLength={9}
                />
                <button type="submit" onClick={(e)=>handleJoinClick(e)} className='green_btn ml-2 mt-2' >Join</button>
              </form>

            </div>
          </div>
        </div>
          
          
        }
      </div>
      
    </section>
  )
}

export default ProjectsPage