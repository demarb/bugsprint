import { type ProjectTileProps } from '../utils/definitions';
import Link from 'next/link'
import Image from "next/image"




const ProjectTile = ({project} : ProjectTileProps) => {

  return (
    <Link href={`/project/${project.project_id}`} className='border-2 rounded-md border-stone-400 p-8 w-full md:w-2/5 hover:border-primary-green hover:cursor-pointer'>
      <div className=''>
        <h1 className='text-3xl'>{project.project_title}</h1>
        <div className='flex pt-1'>
          {/* <h2 className='text-sm text-stone-500 pr-4'>Owner: </h2> */}
            
          <Image src={project.owner_image || ""}
            alt="Owner Profile"
            width={30}
            height={30}
            className="object-contain rounded-full"
            title={project.owner_username}
          />
          
        </div>

        <div className='flex'>
          {
            project.role !== 'Owner' && 
            <h2 className='bg-primary-green text-white rounded-lg p-1 ml-auto'>Joined</h2>

            
          }
        </div>
        
      </div>
    </Link>
    
    
  )
}

export default ProjectTile