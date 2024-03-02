import React from 'react'

const NotAuthorized = ({message}: {message: string}) => {
  return (
    <section className='md:w-3/4'>
        <h1 className='text-4xl md:text-5xl text-opacity-80 font-extrabold leading-[1.15] text-primary-green'>Sorry. You Are Not Authorized To {message}.</h1>
        <h2 className='text-2xl md:text-3xl text-opacity-80 pt-4 md:pt-12 font-extrabold leading-[1.15] text-primary-green'>Contact the Project Owner or Moderators.</h2>
    </section>
  )
}

export default NotAuthorized