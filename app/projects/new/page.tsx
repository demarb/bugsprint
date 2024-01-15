"use client"

import { useState } from "react"
import Link from "next/link"

const NewProjectPage = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [industry, setIndustry] = useState("")
  const [client, setClient] = useState("")
  const [notes, setNotes] = useState("")

  const maxDescriptionLength = 250
  const maxNotesLength = 500

  return (
    <section className='w-4/5 mx-auto py-12'>

      <div className='flex justify-between items-center'>
        <h1 className='text-6xl font-extrabold text-primary-green'>New Project</h1>
     </div>
      
      <h2 className="py-2 md:py-4 text-lg text-primary-green font-bold">Note: All projects are private by default. You can modify this later.</h2>


      {/* <div className='flex flex-wrap justify-center gap-2 pt-8'>
        
      </div> */}

      <form className="flex flex-col pt-2 md:pt-4">
        <label className="text-lg">Title
          <br className=""/>
          <input 
            type="text" name="project-title" id="project-title" 
            value={title} onChange={(e)=>setTitle(e.target.value)} 
            className="form_input"
            required
          />
        </label>

        <label className="text-lg">Description
          <br className=""/>
          <textarea 
            name="project-description" id="project-description" 
            value={description} onChange={(e)=>setDescription(e.target.value)} 
            className="form_textarea"
            rows={3} maxLength={maxDescriptionLength}
          />
          <p className="text-xs text-stone-500">{maxDescriptionLength - description.length} characters remaining</p>
        </label>

        <label className="text-lg">Industry
          <br className=""/>
          <input 
            type="text" name="project-industry" id="project-industry" 
            value={industry} onChange={(e)=>setIndustry(e.target.value)} 
            className="form_input"
            required
          />
        </label>

        <label className="text-lg">Client
          <br className=""/>
          <input 
            type="text" name="project-client" id="project-client" 
            value={client} onChange={(e)=>setClient(e.target.value)} 
            className="form_input"
          />
        </label>

        <label className="text-lg">Additional Notes
          <br className=""/>
          <textarea 
            name="project-notes" id="project-notes" 
            value={notes} onChange={(e)=>setNotes(e.target.value)} 
            className="form_input"
            rows={6} maxLength={maxNotesLength}
          />
          <p className="text-xs text-stone-500">{maxNotesLength - notes.length} characters remaining</p>

        </label>

        <Link href="/projects" className="ml-auto">
          <button type="button"
            //   key={}
            //   onClick={}
              className="green_btn mt-4 ">Create
          </button>
        </Link>

      </form>


      
      
    </section>
  )
}

export default NewProjectPage