"use client"

import MemberCard from '@/components/MemberCard'
import { useState } from 'react'

const ProjectMembersPage = () => {

  const [inviteeEmail, setInviteeEmail] = useState("")

  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex flex-col justify-between'>
          <h2 className='text-4xl text-primary-green'>Members</h2>
          <div className='flex'>
            {/* <button type="button"
            //   key={}
            //   onClick={}
              className="rounded-md hover:border hover:border-primary-green "
            >
            </button> */}

            {/* <button type="button"
            //   key={}
            //   onClick={}
              className="green_btn mx-2">Invite New Members
            </button> */}
          </div>

          <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>User Permissions</h2>

              
              <div className=''>
                <div>
                  <h3 className='text-xl font-bold text-primary-green py-2' >Owner</h3>
                  <ul className='list-disc list-inside'>
                    <li>Has full control over the project. </li>
                    <li>Can create, view, modify, and delete bugs. </li>
                    <li>Can assign bugs to team members. </li>
                    <li>Can add, remove and change the permission of team members.</li>
                    <li>Can modify project settings.</li>
                    <li>Can delete project.</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-bold text-primary-green py-2' >Moderator</h3>
                  <ul className='list-disc list-inside'>
                    <li>Can create, view, modify, and delete bugs. </li>
                    <li>Can assign bugs to team members. </li>
                    <li>Can add, remove and change the permission of team members.</li>
                    <li>Can modify project settings.</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-bold text-primary-green py-2' >Read/Write</h3>
                  <ul className='list-disc list-inside'>
                    <li>Can create, view, modify, and delete bugs. </li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-bold text-primary-green py-2' >Read Only</h3>
                  <ul className='list-disc list-inside'>
                    <li>Can view bugs. </li>
                  </ul>
                </div>
              </div>
              

              
            </div>

          <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Existing Members</h2>

              {
                <div>
                  {/* Map over members here */}
                  <MemberCard name={"Jon Doe"} email={"jondoe@gmail.com"} permission={"owner"}/>
                  <MemberCard name={"Jenny Byron"} email={"jbyron@gmail.com"} permission={"readwrite"}/>
                </div>
              }

                <div className='py-2'>
                  <button className='green_btn'>
                    Save Permissions
                  </button>
                </div>

              
            </div>

          <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Invite New Members to the Team</h2>

              <div className='flex flex-col justify-around'>

                <p className="text-md text-primary-green py-2">Enter Email of the Invitee:</p>

                <input 
                  type="text" name="invitee-email" id="invitee-email" 
                  value={inviteeEmail} onChange={(e)=>setInviteeEmail(e.target.value)} 
                  className="form_input"
                />

                <div className='py-2'>
                  <button className='green_btn'>
                    Invite
                  </button>
                </div>
                

              </div>
            </div>
        </div>       
      </div>
      
    </section>
  )
}

export default ProjectMembersPage