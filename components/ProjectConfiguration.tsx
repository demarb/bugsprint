import React from 'react'
import Link from "next/link"

const ProjectConfiguration = ({project_id}: {project_id: string}) => {
  return (
    <section>
        <div className='py-2 md:py-4'>
            <h2 className='text-2xl text-primary-green'>Bug Tracking</h2>

            <div className='flex flex-col'>

                <div className='flex flex-col'>
                <h3 className='text-lg text-primary-green'>Allow Guests (eg. App users) To Submit Bugs?</h3>
                <label>
                    <input type="radio" name="visibilityRadio" value="csv" className='mr-1'/>
                    Yes
                </label>
                <label >
                    <input type="radio" name="visibilityRadio" value="json" className='mr-1'/>
                    No
                </label>
                <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    Save
                </button>
                </div>

                <div className='flex flex-col'>
                <h3 className='text-lg text-primary-green'>Set a Default Assignee for New Bugs</h3>

                <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    Save
                </button>
                
                </div>
                
            </div>
        </div>


        <div className='py-2 md:py-4'>
            <h2 className='text-2xl text-primary-green'>Access Control Settings</h2>

            <div className='flex flex-col'>

            

                <div className='flex flex-col'>
                    <h3 className='text-lg text-primary-green'>Project Visibility</h3>
                    <label>
                    <input type="radio" name="visibilityRadio" value="csv" className='mr-1'/>
                    Public
                    </label>
                    <label >
                    <input type="radio" name="visibilityRadio" value="json" className='mr-1'/>
                    Private
                    </label>
                    <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    Save
                    </button>
                </div>

                <div className='flex flex-col'>
                    <h3 className='text-lg text-primary-green'>Access Permissions</h3>

                    <Link href={`/project/${project_id}/members`} className="my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max">
                    <button className=''>
                        Members
                    </button>
                    </Link>
                </div>
            
            </div>
        </div>

        
        <div className='py-2 md:py-4'>
                <h2 className='text-2xl text-primary-green'>Notification Preferences</h2>

                <div>
                    
                </div>
            </div>

            <div className='py-2 md:py-4'>
                <h2 className='text-2xl text-primary-green'>Project Log</h2>

                <div>
                    <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    View Logs
                    </button>
              </div>
            </div>

            

            <div className='py-2 md:py-4'>
                <h2 className='text-2xl text-primary-green'>Export Project Data</h2>

                <div className='flex flex-col'>

                    <label>
                    <input type="radio" name="dataExportRadio" value="csv" className='mr-1'/>
                    CSV
                    </label>
                    <label >
                    <input type="radio" name="dataExportRadio" value="json" className='mr-1'/>
                    JSON
                    </label>

                    <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    Download Data
                    </button>
                </div>
            </div>
    </section>
  )
}

export default ProjectConfiguration