"use client"

import { MemberType } from '@/utils/definitions'
import { useState } from 'react'
import Image from "next/image"
import { useSession } from 'next-auth/react'


const MemberCard = ({member, project_id}: {member: MemberType, project_id: string}) => {

    const {data: session} = useSession()
    //@ts-ignore  
    const user_id = session?.user.user_id
    
    const {association_id, user_id: member_id, email, username, role, image} = member
    const [userPermission, setUserPermission] = useState(role)

    const handlePermissionChange = async (e : React.ChangeEvent<HTMLSelectElement>) => {
        
        e.preventDefault()

        // const prevPermission = userPermission;
        // setUserPermission(e.target.value)

        const newPermission = e.target.value;

        

        try {

            const reqBody = {
              association_id: association_id,
              role : newPermission,
            }

            console.log("REQ BODY")
            console.log(reqBody)
            
          const response = await fetch(`/api/user/${member_id}/project/${project_id}/association`, {
            method: 'PATCH',
            body: JSON.stringify(reqBody)
        })

            console.log("******************************")
            console.log(response)
    
            if(response.ok){
                setUserPermission(newPermission)
            }
    
        } catch (error) {
            console.log(error)
        }

    }
    

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

            <select name="permission-select" id="permission-select" className='w-full border rounded-md text-base p-2' disabled value={userPermission} onChange={(e)=>{handlePermissionChange(e)}}>
                <option value="Owner">Owner</option>
            </select>

            :

            <select name="user-permission" id="user-permission" className='w-full border rounded-md text-base p-2' value={userPermission} onChange={(e)=>{handlePermissionChange(e)}}>
                <option value="Moderator">Moderator</option>
                <option value="Read-Write">Read-Write</option>
                <option value="Read-Only">Read-Only</option>
            </select>

        }       

        </div>
  )
}

export default MemberCard