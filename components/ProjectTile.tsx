import { type ProjectType } from '../lib/definitions';


type ProjectTileProps = {
    project: ProjectType;
}

const ProjectTile = ({project} : ProjectTileProps) => {

  return (
    <div className='border-2 rounded-md border-stone-400 p-8 w-full md:w-2/5 hover:border-primary-green hover:cursor-pointer'>
        <h1 className='text-3xl'>{project.title}</h1>
        <h2 className='text-sm text-stone-500'>Owner: {project.owner}</h2>
    </div>
  )
}

export default ProjectTile