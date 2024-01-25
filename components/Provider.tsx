"use client"

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type ProviderProps } from '@/utils/definitions'

const Provider = ({children, session} : ProviderProps) => {
  // console.log("SESSION OBJECT IN PROVIDER:")
  // console.log(session)

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider