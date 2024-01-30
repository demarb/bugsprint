import Link from 'next/link'
import ProjectTitleLink from "@/components/ProjectTitleLink"


const Sidebar = ({project_id} : {project_id: string}) => {
    // { params }: { params: { "project_id": string } }
    console.log(project_id)
    
    // const [project, setProject] = useState<ProjectTypePRIMARY>({
    //     title: "",
    //     description : "",
    //     industry : "",
    //     client : "",
    //     additional_notes : "",
    //   })

    // useEffect(() => {
    
    //     const fetchProject = async () => {
    //       const response = await fetch(`/api/project/${project_id}`)
    //       const data = await response.json()
    //       setProject(data)
    //     }
      
    //       fetchProject()
    
    //   }, [])

  return (
    <section className=' md:bg-primary-green md:text-white p-4 md:h-full'>

        {/* <Link href={`/project/${project_id}`}> 
                <h1 className='text-4xl font-extrabold text-primary-green md:text-white py-4 wordWrap_break'>{project.title || "Project"}</h1>
        </Link> */}

        <ProjectTitleLink project_id={project_id} />
        
        {/* <hr className='max-md:hidden' /> */}

        <div className='flex flex-row flex-wrap md:flex-nowrap md:flex-col md:h-3/5 md:justify-around gap-1'>

            <Link href={`/project/${project_id}/members`} className="w-1/4 md:w-max p-2 border rounded border-stone-400 hover:border-primary-green md:border-primary-green md:hover:border-white hover:cursor-pointer">
                <div className=''>
                    <h1 className='text-xl md:text-2xl'>Members</h1>
                    <p className='#hidden #md:block text-sm'>Invite members</p>
                </div>
            </Link>

            <Link href={`/project/${project_id}/settings`} className="w-1/4 md:w-max p-2 border rounded border-stone-400 hover:border-primary-green md:border-primary-green md:hover:border-white hover:cursor-pointer">
                <div className=''>
                    <h1 className='text-xl md:text-2xl'>Setting</h1>
                    <p className='text-sm'>Setup your project</p>
                </div>
            </Link>
            
            <hr className='max-md:hidden' />

            <Link href="/projects" className="w-1/4 md:w-max p-2 border rounded border-stone-400 hover:border-primary-green md:border-primary-green md:hover:border-white hover:cursor-pointer">
                <div className=''>
                    <h1 className='text-xl md:text-2xl'>Other Projects</h1>
                    <p className='text-sm'>View other projects</p>
                </div>
            </Link>
            
        </div>

        

    </section>
  )
}

export default Sidebar