import Link from "next/link"
import Image from "next/image"



const Nav = () => {
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
        

        <ul className='flex items-center'>
            {/* <li>Features</li>
            <li>Features</li>
            <li>Features</li> */}
            <li>
                <button type="button"
                //   key={}
                //   onClick={}
                  className="green_btn ">Sign In
                </button>
            </li>
        </ul>
    </nav>
  )
}

export default Nav