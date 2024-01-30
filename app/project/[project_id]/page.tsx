"use client"

import BugsTable from '@/components/BugsTable'
import Image from 'next/image'
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { BugTypePRIMARY } from '@/utils/definitions'

const ProjectPage = ({ params }: { params: { "project_id": string } }) => {
  // const {data: session} = useSession()
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