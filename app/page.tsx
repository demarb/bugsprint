import Image from 'next/image'
import Link from "next/link"
// import {getData} from '@/utils/database'

export default function Home() {

  // const fetchData = async () => {
  //   try {
  //     const data = await getData();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // fetchData()
  

  return (
    <section className="">

        <div className='w-3/4 h-screen mx-auto flex flex-col justify-normal items-center py-2 lg:py-4'>
          <h1 className='head_text text-center py-16'>Track Bugs For Your Next Software Project</h1>

          <p className='text-center text-lg text-stone-800 md:py-8'>
            {/* Report, Document, Assign & Track Bugs For Your Development Team */}
            Streamline Your Development Workflow with Seamless Bug Reporting, Documentation, Assignment, and Tracking. Elevate Collaboration and Boost Productivity with Our Intuitive Bug Tracking Software.
          </p>

          <Link href="#preview" className="">
                
            <Image
              className=""
              src="/assets/icons/down-arrow-50.png"
              alt="Scroll down arrow"
              width={50}
              height={50}
              // priority
            />
          </Link>
          
        </div>

        <div className='bg-primary-green py-2 lg:py-8'>

          {/* <div id='' className='mx-auto w-11/12 lg:w-3/4'>
            <Image
              className=""
              src="/assets/images/Desktop green preview (2).png"
              alt="Desktop preview"
              width={1920}
              height={1080}
              // priority
            />
          </div> */}

          <div id='preview' className='mx-auto w-11/12 lg:w-3/4 max-md:hidden'>
            <div className='py-16 text-5xl font-extrabold leading-[1.15] text-white sm:text-6xl text-center'>
              <h1 className=''>Create Projects.</h1>
              <h1 className=''>Join Shared Projects.</h1>
              <h1 className=''>Add and Track Bugs.</h1>
              <h1 className=''>Modify Team Permissions.</h1>
            </div>
            
            <Image
              className=""
              src="/assets/images/Desktop preview.png"
              alt="Desktop preview"
              width={1920}
              height={1080}
            />

          </div>

          <div id='preview' className='mx-auto w-11/12 lg:w-3/4 md:hidden'>
            <div className='py-16 text-5xl font-extrabold leading-[1.15] text-white sm:text-6xl text-center'>
              <h1 className=''>Create Projects.</h1>
              <h1 className=''>Join Shared Projects.</h1>
             </div>
            
            <div className=''>
              <Image
                className=""
                src="/assets/images/Mobile preview.png"
                alt="Mobile preview"
                width={1080}
                height={1920}
              />
            </div>

            <div className='py-16 text-5xl font-extrabold leading-[1.15] text-white sm:text-6xl text-center'>
              <h1 className=''>Add and Track Bugs.</h1>
              <h1 className=''>Modify Team Permissions.</h1>
             </div>
            
          </div>
          
        </div>


    </section>
  )
}
