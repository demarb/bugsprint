import Image from 'next/image'
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
    <section className="w-3/4 mx-auto flex flex-col items-center">
        <h1 className='head_text text-center py-16'>Track Bugs For Your Next Software Project</h1>

        <p className='text-center text-stone-800 md:py-8'>
          {/* Report, Document, Assign & Track Bugs For Your Development Team */}
          Streamline Your Development Workflow with Seamless Bug Reporting, Documentation, Assignment, and Tracking. Elevate Collaboration and Boost Productivity with Our Intuitive Bug Tracking Software.
        </p>
        
        <Image
          className=""
          src="/assets/icons/down-arrow-50.png"
          alt="Scroll down arrow"
          width={50}
          height={50}
          // priority
        />
    </section>
  )
}
