import React from 'react'
import Image from "next/image"
import { UserJoinRequestType } from '@/utils/definitions'

const PendingRequestTile = ({joinrequest, project_id, setJoinRequests} : {joinrequest: UserJoinRequestType, project_id: string, setJoinRequests: React.Dispatch<React.SetStateAction<UserJoinRequestType[]>>}) => {
  
  const denyJoinRequest = async (e : React.SyntheticEvent) => {
    e.preventDefault()
    console.log("Attempting to denyJoinRequest")

      try {
          const response = await fetch(`/api/project/${project_id}/join/deny`, {
            method: 'PATCH',
            body: JSON.stringify(joinrequest)
        })

        if(response.ok){
          // filterUpdatedJoinRequest(joinrequest.joinrequest_id)

          setJoinRequests((prev)=>{
            return(
              prev.filter((joinrequest)=>joinrequest.joinrequest_id!=joinrequest.joinrequest_id)
            )
          })

        }

    } catch (error) {
        console.log(error)
    } finally{
        // setSubmitting(false)
    }

  }

  const approveJoinRequest = async (e : React.SyntheticEvent) => {
    e.preventDefault()
    console.log("Attempting to approveJoinRequest")

      try {
          const response = await fetch(`/api/project/${project_id}/join/approve`, {
            method: 'PATCH',
            body: JSON.stringify(joinrequest)
        })

        if(response.ok){
          // filterUpdatedJoinRequest(joinrequest.joinrequest_id)

          setJoinRequests((prev)=>{
            return(
              prev.filter((joinrequest)=>joinrequest.joinrequest_id!=joinrequest.joinrequest_id)
            )
          })

        }

    } catch (error) {
        console.log(error)
    } finally{
        // setSubmitting(false)
    }

  }


    


  return (
    <div className='flex justify-around items-center bg-green-100 border-primary-green border rounded-xl w-full lg:w-2/3 p-1'>
        <div className='p-2 '>
            <Image src={joinrequest.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full" 
              />
        </div>
        <div className='p-2'>
            <h3 className="font-bold">Username: <span className='font-normal'>{joinrequest.username}</span></h3>
            <h3 className="font-bold">Email: <span className='font-normal'>{joinrequest.email}</span></h3>
        </div>
        {/* <br className=''/> */}
        <div className='flex'>
            
            <div className='flex flex-col items-center p-2'>
              
              <div>                        
                <Image src="/assets/icons/approve-50.png"
                alt="Approve icon"
                width={40}
                height={40}
                className="cursor-pointer" 
                onClick={(e)=>approveJoinRequest(e)}
                />
              </div>
            </div>
            <div className='flex flex-col items-center p-2'>
              <div>                        
                <Image src="/assets/icons/cancel-50.png"
                alt="Cancel icon"
                width={40}
                height={40}
                className="cursor-pointer"
                onClick={(e)=>denyJoinRequest(e)} 
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export default PendingRequestTile