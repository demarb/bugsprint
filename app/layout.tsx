import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
// import { Session } from 'next-auth'
// import { SessionProvider } from 'next-auth/react'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BugSprint',
  description: 'Track Software Bugs for You and Your Team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* <SessionProvider session={session}> */}
        <Provider >
          <main className="app">
            <Nav/>
            {children}
          </main>
        </Provider>
          
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
