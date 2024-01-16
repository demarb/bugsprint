"use client"

import { useState } from 'react'

const MemberCard = ({name, email, permission}: {name: string, email: string, permission: string}) => {

    const [userPermission, setUserPermission] = useState(permission)

  return (
    <div className='flex flex-col border rounded-md p-2 my-2 w-full lg:w-4/5'>

        <p className="text-md text-primary-green py-2">{name}</p>
        <p className="text-md text-primary-green">{email}</p>

        {/* <input 
            type="text" name="invitee-email" id="invitee-email" 
        //   value={inviteeEmail} onChange={(e)=>setInviteeEmail(e.target.value)} 
            className="form_input"
        /> */}

        {
            permission==="owner" ? 

            <select name="permission-select" id="permission-select" className='form_input' disabled value={userPermission} onChange={(e)=>{setUserPermission(e.target.value)}}>
                <option value="owner">Owner</option>
            </select>

            :

            <select name="user-permission" id="user-permission" className='form_input' value={userPermission} onChange={(e)=>{setUserPermission(e.target.value)}}>
                <option value="moderator">Moderator</option>
                <option value="readwrite">Read/Write</option>
                <option value="readonly">Read Only</option>
            </select>

        }       

        </div>
  )
}

export default MemberCard