"use client"

import Sidebar from '@/components/Sidebar';
import { ProjectAssociationType } from '@/utils/definitions';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
 
export default function Layout({ children, params }: { children: React.ReactNode,  params: { "project_id": string }}) {
    // { params }: { params: { "project_id": string } }

    const {data: session, update} = useSession()
    //@ts-ignore  
    const userProjectRole = session?.user.role

    useEffect(() => {

      const { project_id } = params
      //@ts-ignore
      const user_id =  session?.user.id
      
  
      const fetchProjectAssociation= async () => {
        const response = await fetch(`/api/user/${user_id}/project/${project_id}/association`)
        const data: ProjectAssociationType = await response.json()
        return data
      }
  
      const updateSessionRole = async () => {
        const association = await fetchProjectAssociation()
      try {
  
        const updatedUser = {
          ...session,
          user: {
            ...session?.user,
            role: association.role,
          },
        };
  
        await update(updatedUser);
  
      } catch (err) {
        console.log("There was an error with updating project association role.", err);
      }
      }
      
      updateSessionRole()
  
    }, [session])
  

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar project_id={params.project_id} role={userProjectRole} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}