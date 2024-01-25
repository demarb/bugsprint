"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers/index"


const Nav = () => {


  const { data: session } = useSession();

  const [providers, setProviders] = useState <Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(()=>{

    const setUpProviders = async ()=>{
      // get next-auth and google sign in  providers
      const response = await getProviders();
      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <nav className='text-stone-800 border-b border-stone-800 border-opacity-25 flex justify-between items-center py-2 px-4'>
        {/* <img src="" alt="" /> */}
        {/* <h1>Logo</h1> */}

        <Link href="/" className="">
            <Image src="/assets/images/logo-no-background.png"
            alt="BugSprint logo"
            width={120}
            height={120}
            className="" 
            />
        </Link>
        

        {/* <ul className='flex items-center'> */}
            {/* <li>Features</li>
            <li>Features</li>
            <li>Features</li> */}
            {/* <li>
                <button type="button"
                  key={}
                  onClick={}
                  className="green_btn ">Sign In
                </button>
            </li> */}
        {/* </ul> */}

        {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/projects" className="green_btn">
              Projects
            </Link>

            <Link href="/notifications" className="green_btn">
            {`Notifications (${0})`}
            </Link>

            <button className="green_btn" type="button" onClick={()=>{
              // setToggleDropdown(false);
                signOut();
              }}>
              Sign Out
            </button>

            <Link href="/profile" className="">
              <Image src={session?.user.image || ""}
                alt="Profile"
                width={37}
                height={37}
                className="object-contain" 
              />
            </Link>

          </div>
        ): (
          <>

            {
              providers && 
              Object.values(providers).map((provider)=>(
                <button 
                  type="button"
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className="green_btn"
                >
                  Sign In
                </button>
              ))
            }

          </>
        )}
      </div>
        

        {/* Mobile NAVIGATION */}
      <div className="sm:hidden flex relative">
               
        {session?.user ? (
          <div className="flex flex-col">
            <Image src={session.user.image || ""}
              alt="Profile"
              width={37}
              height={37}
              className="object-contain"
              onClick={()=>setToggleDropdown((prev)=>!prev)} 
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={()=>setToggleDropdown(false)}
                >
                  Profile
                </Link>

                <Link
                  href="/projects"
                  className="dropdown_link"
                  onClick={()=>setToggleDropdown(false)}
                >
                  Projects
                </Link>

                <Link
                  href="/notifications"
                  className="dropdown_link"
                  onClick={()=>setToggleDropdown(false)}
                >
                  {`Notifications (${0})`}
                </Link>
                <button className="mt-5 w-full inverted_green_btn" type="button" onClick={()=>{
                  setToggleDropdown(false);
                  signOut();
                }}>
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ): (
          <>

            {
              providers && 
              Object.values(providers).map((provider)=>(
                <button 
                  type="button"
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className="inverted_green_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>


    </nav>
  )
}

export default Nav