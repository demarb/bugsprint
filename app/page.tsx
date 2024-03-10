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

        <div className='w-3/4 h-screen mx-auto flex flex-col items-center py-2 lg:py-8'>
          <h1 className='head_text text-center py-16'>Track Bugs For Your Next Software Project</h1>

          <p className='text-center text-lg text-stone-800 md:py-8'>
            {/* Report, Document, Assign & Track Bugs For Your Development Team */}
            Streamline Your Development Workflow with Seamless Bug Reporting, Documentation, Assignment, and Tracking. Elevate Collaboration and Boost Productivity with Our Intuitive Bug Tracking Software.
          </p>

          <Link href="#desktop-preview" className="">
                
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

          <div id='desktop-preview' className='mx-auto w-11/12 lg:w-3/4'>
            <Image
              className=""
              src="/assets/images/Desktop green preview (2).png"
              alt="Desktop preview"
              width={1920}
              height={1080}
              // priority
            />
          </div>
          
        </div>


    </section>
  )
}
