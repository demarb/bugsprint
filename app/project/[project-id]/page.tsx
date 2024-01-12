import Image from 'next/image'

const ProjectPage = () => {
  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex justify-between'>
          <h2 className='text-3xl text-primary-green'>Bugs</h2>
          <div className='flex'>
            <button type="button"
            //   key={}
            //   onClick={}
              className="rounded-md hover:border hover:border-primary-green "
            >
              <Image
                className=""
                src="/assets/icons/filter-60.png"
                alt="Filter icon"
                width={35}
                height={35}
                // priority
              />    
            </button>

            <button type="button"
            //   key={}
            //   onClick={}
              className="green_btn mx-2">Submit New Bug
            </button>
          </div>
        </div>       
      </div>
      

      
        

        

     

    </section>
  )
}

export default ProjectPage