import BugForm from '@/components/BugForm'
import React from 'react'

const BugPage = () => {

  

  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex flex-col justify-between'>
          <h2 className='text-4xl text-primary-green'>Bug: {"######"}</h2>

            <div className='py-2 md:py-4'>
                
              <BugForm />
            
            </div>
        </div>       
      </div>
      
    </section>
    
  )
}

export default BugPage