import { type ProjectTileProps } from '../utils/definitions';
import Link from 'next/link'




const ProjectTile = ({project} : ProjectTileProps) => {

  return (
    <Link href={`/project/${project.project_id}`} className='border-2 rounded-md border-stone-400 p-8 w-full md:w-2/5 hover:border-primary-green hover:cursor-pointer'>
      <div className=''>
        <h1 className='text-3xl'>{project.title}</h1>
        {/* WE ARE GOING TO ADD OWNER LATER */}
        <h2 className='text-sm text-stone-500'>Owner: </h2>
      </div>
    </Link>
    
    
  )
}

export default ProjectTile