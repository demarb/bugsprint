import React from 'react'

const Sidebar = () => {
  return (
    <section className='#bg-primary-green md:bg-primary-green md:text-white #text-white p-4 md:h-full'>

        <h1 className='text-5xl font-extrabold text-primary-green md:text-white py-4'>Project Name</h1>

        <div className='flex flex-row flex-wrap md:flex-nowrap md:flex-col md:h-3/5 md:justify-around gap-1'>


            <div>
                <div className='w-1/4 md:w-max p-2 border rounded border-primary-green md:hover:border-white hover:cursor-pointer'>
                    <h1 className='text-2xl'>Members</h1>
                    <p className='text-xs'>Invite members</p>
                </div>

                <div className='w-1/4 md:w-max p-2 border rounded border-primary-green md:hover:border-white hover:cursor-pointer'>
                    <h1 className='text-2xl'>Setting</h1>
                    <p className='text-xs'>Setup your project</p>
                </div>
            </div>
            
            <hr className='max-md:hidden' />

            <div className='w-1/4 md:w-max p-2 border rounded border-primary-green md:hover:border-white hover:cursor-pointer'>
                <h1 className='text-2xl'>Other Projects</h1>
                <p className='text-xs'>See your other projects</p>
            </div>
        </div>

        

    </section>
  )
}

export default Sidebar