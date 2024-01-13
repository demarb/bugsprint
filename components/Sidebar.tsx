import Link from 'next/link'

const Sidebar = ({project_id} : {project_id: string}) => {
    // { params }: { params: { "project_id": string } }
    console.log(project_id)

  return (
    <section className='#bg-primary-green md:bg-primary-green md:text-white p-4 md:h-full'>

        <Link href={`/project/${project_id}`}>
            <h1 className='text-5xl font-extrabold text-primary-green md:text-white py-4'>Project Name</h1>
        </Link>
        

        <div className='flex flex-row flex-wrap md:flex-nowrap md:flex-col md:h-3/5 md:justify-around gap-1'>

            <Link href={`/project/${project_id}/members`} className="w-1/4 md:w-max p-2 border rounded border-stone-400 hover:border-primary-green md:border-primary-green md:hover:border-white hover:cursor-pointer">
                <div className=''>
                    <h1 className='text-2xl'>Members</h1>
                    <p className='text-xs'>Invite members</p>
                </div>
            </Link>

            <Link href={`/project/${project_id}/settings`} className="w-1/4 md:w-max p-2 border rounded border-stone-400 hover:border-primary-green md:border-primary-green md:hover:border-white hover:cursor-pointer">
                <div className=''>
                    <h1 className='text-2xl'>Setting</h1>
                    <p className='text-xs'>Setup your project</p>
                </div>
            </Link>
            
            <hr className='max-md:hidden' />

            <Link href="/projects" className="w-1/4 md:w-max p-2 border rounded border-stone-400 hover:border-primary-green md:border-primary-green md:hover:border-white hover:cursor-pointer">
                <div className=''>
                    <h1 className='text-2xl'>Other Projects</h1>
                    <p className='text-xs'>See your other projects</p>
                </div>
            </Link>
            
        </div>

        

    </section>
  )
}

export default Sidebar