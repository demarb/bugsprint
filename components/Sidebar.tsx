import React from 'react'

const Sidebar = () => {
  return (
    <section className='#bg-primary-green #text-white p-4'>

        <h1 className='text-6xl font-extrabold text-primary-green py-4'>Project Name</h1>

        <div className='flex flex-wrap gap-1'>

            <div className='w-1/4 p-2 border rounded border-primary-green'>
                <h1 className='text-2xl'>Members</h1>
                <p className='text-xs'>Invite members</p>
            </div>

            <div className='w-1/4 p-2 border rounded border-primary-green'>
                <h1 className='text-2xl'>Setting</h1>
                <p className='text-xs'>Setup your project</p>
            </div>

            <div className='w-1/4 p-2 border rounded border-primary-green'>
                <h1 className='text-2xl'>Other Projects</h1>
                <p className='text-xs'>See your other projects</p>
            </div>
        </div>

        

    </section>
  )
}

export default Sidebar