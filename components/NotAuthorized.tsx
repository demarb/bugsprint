import React from 'react'

const NotAuthorized = () => {
  return (
    <section className='md:w-3/4'>
        <h1 className='text-5xl font-extrabold leading-[1.15] text-primary-green'>Sorry. You Are Not Authorized To View This Page</h1>
        <h2 className='text-3xl pt-4 md:pt-12 font-extrabold leading-[1.15] text-primary-green'>Contact the Project Owner or Moderators</h2>
    </section>
  )
}

export default NotAuthorized