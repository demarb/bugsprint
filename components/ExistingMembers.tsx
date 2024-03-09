import { MemberType } from '@/utils/definitions'
import React, { useEffect, useState } from 'react'
import MemberCard from '@/components/MemberCard'

const ExistingMembers = ({project_id} : {project_id: string}) => {

    const [members, setMembers] = useState<MemberType[]>([])

    useEffect(() => {

        // const { project_id } = params 
           
        const fetchMembers= async () => {
          const response = await fetch(`/api/project/${project_id}/members`)
          const data = await response.json()
          setMembers(data)
          console.log("DATA FOR MEMBERS:")
          console.log(data)
        }
    
          fetchMembers()
    
      }, [])

      


  return (
    <section>
        
        {
            members ?

            <div>
                {
                    members.map((member)=>{
                        return <MemberCard member={member} project_id={project_id}/>
                    })
                }
            </div>

            :

            <div>
                <h1>Loading...</h1>
            </div>
        }
        
    </section>
  )
}

export default ExistingMembers