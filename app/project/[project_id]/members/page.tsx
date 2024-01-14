import React from 'react'

const ProjectMembersPage = () => {
  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex justify-between'>
          <h2 className='text-4xl text-primary-green'>Members</h2>
          <div className='flex'>
            {/* <button type="button"
            //   key={}
            //   onClick={}
              className="rounded-md hover:border hover:border-primary-green "
            >
            </button> */}

            <button type="button"
            //   key={}
            //   onClick={}
              className="green_btn mx-2">Invite New Members
            </button>
          </div>
        </div>       
      </div>
      
    </section>
  )
}

export default ProjectMembersPage