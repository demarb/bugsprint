import BugsTable from '@/components/BugsTable'
import Image from 'next/image'
import Link from "next/link"

const ProjectPage = ({ params }: { params: { "project_id": string } }) => {
  
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
          <BugsTable project_id={params.project_id} /> 
        </div>
              
      </div>

    </section>
  )
}

export default ProjectPage