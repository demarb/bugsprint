import BugForm from '@/components/BugForm'
import React from 'react'

const NewBugPage = () => {

  

  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex justify-between'>
          <h2 className='text-3xl text-primary-green'>Report a Bug</h2>
          
        </div> 

        <div className=''>
          <BugForm/>
        </div>      
      </div>
      
    </section>
  )
}

export default NewBugPage