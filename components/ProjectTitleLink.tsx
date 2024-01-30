"use client"

import { ProjectTypePRIMARY } from '@/utils/definitions'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ProjectTitleLink = ({project_id}: {project_id: string}) => {

    const [project, setProject] = useState<ProjectTypePRIMARY>({
        title: "",
        description : "",
        industry : "",
        client : "",
        additional_notes : "",
      })

    useEffect(() => {
    
        const fetchProject = async () => {
          const response = await fetch(`/api/project/${project_id}`)
          const data = await response.json()
          setProject(data)
        }
      
          fetchProject()
    
      }, [])

    return (
        <Link href={`/project/${project_id}`}> 
            <h1 className='text-4xl font-extrabold text-primary-green hover:underline md:text-white py-4 wordWrap_break'>{project.title || "Project"}</h1>
        </Link>
    )
}

export default ProjectTitleLink