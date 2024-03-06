"use client"

import { MemberType } from '@/utils/definitions'
import { useState } from 'react'
import Image from "next/image"


const MemberCard = ({member}: {member: MemberType}) => {

    

    const {association_id, user_id, email, username, role, image} = member
    const [userPermission, setUserPermission] = useState(role)

  return (
    <div className='flex flex-col border bg-primary-green rounded-md p-2 my-2 w-full lg:w-2/5'>

        <div className='flex justify-between items-center py-2'>

        
            <Image src={image || ""}
                alt="Member Profile"
                width={30}
                height={30}
                className="object-contain rounded-full"
                title={username}
            />
            <p className="text-md text-white">{email}</p>
        </div>

        {/* <input 
            type="text" name="invitee-email" id="invitee-email" 
        //   value={inviteeEmail} onChange={(e)=>setInviteeEmail(e.target.value)} 
            className="form_input"
        /> */}

        {
            userPermission==="Owner" ? 

            <select name="permission-select" id="permission-select" className='w-full border rounded-md text-base p-2' disabled value={userPermission} onChange={(e)=>{setUserPermission(e.target.value)}}>
                <option value="Owner">Owner</option>
            </select>

            :

            <select name="user-permission" id="user-permission" className='w-full border rounded-md text-base p-2' value={userPermission} onChange={(e)=>{setUserPermission(e.target.value)}}>
                <option value="Moderator">Moderator</option>
                <option value="Read-Write">Read-Write</option>
                <option value="Read-Only">Read-Only</option>
            </select>

        }       

        </div>
  )
}

export default MemberCard