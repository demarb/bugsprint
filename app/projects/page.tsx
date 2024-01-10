import ProjectTile from '@/components/ProjectTile'
import {projectsFakeData} from '@/lib/placeholder-data'
import Link from 'next/link'

const ProjectsPage = () => {

  let hasProjects = true

  // console.log(projectsFakeData)

  return (
    <section className='w-4/5 mx-auto py-12'>

      <div className='flex justify-between items-center'>
        <h1 className='text-6xl font-extrabold text-primary-green'>Projects</h1>

        {
          hasProjects ? 
            <Link href="/projects/new" className="flex">
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

            projectsFakeData.map((project)=>{
              return (
                <ProjectTile
                  key={project.id}
                  project={project}
                />
              )
            })

            // <div>
            //   <h1>We Found Projects for You</h1>



            // </div>
          :
          
          <Link href="/projects/new" className="flex">
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