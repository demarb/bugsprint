import React from 'react'
import Image from "next/image"

const ProfilePage = () => {
  return (
    <section className='w-4/5 mx-auto py-12'>

      <div className='flex justify-between items-center'>
        <h1 className='text-6xl font-extrabold text-primary-green'>Profile</h1>       
      </div>
      

      {/* <div className='flex flex-wrap justify-center gap-2 pt-8'>
        
      </div> */}

      <div className='flex flex-col pt-8 justify-around gap-y-4'>
        <Image src="/assets/icons/profile-black.png"
          alt="Default Profile"
          width={60}
          height={60}
          className="" 
        />
        <h1>Email: <span>{"thisismyemail@gmail.com"}</span></h1> 
        <h1>Member Since: <span>{"January 1, 2024"}</span></h1>

        {/* <div> */}
          <button type="button"
          //   key={}
          //   onClick={}
            className="green_btn w-max">Sign Out
          </button>

          <button type="button"
          //   key={}
          //   onClick={}
            className="bg-red-700 border-red-700 border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max">Delete Account
          </button>
        {/* </div> */}
        

        

      </div>

    </section>
  )
}

export default ProfilePage