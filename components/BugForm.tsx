"use client"

import Link from 'next/link'
import { useState } from 'react'


const BugForm = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [severity, setSeverity] = useState("")
    const [environment, setEnvironment] = useState("")

    const [client, setClient] = useState("")

    const maxDescriptionLength = 1000
    const maxEnvironmentLength = 500


  return (
    <form className="flex flex-col pt-2 md:pt-4">
        <label className="text-lg py-2">Title
          <br className=""/>
          <input 
            type="text" name="project-title" id="project-title" 
            value={title} onChange={(e)=>setTitle(e.target.value)} 
            className="form_input"
            required
          />
        </label>

        <label className="text-lg py-2">Description (including steps needed to reproduce the bug)
          <br className=""/>
          <textarea 
            name="bug-description" id="bug-description" 
            value={description} onChange={(e)=>setDescription(e.target.value)} 
            className="form_textarea"
            rows={12} maxLength={maxDescriptionLength}
          />
          <p className="text-xs text-stone-500">{maxDescriptionLength - description.length} characters remaining</p>
        </label>

        <label className="text-lg py-2">Environment Details (browser, version, operating system, etc)
          <br className=""/>
          <textarea 
            name="bug-environment" id="bug-environment" 
            value={description} onChange={(e)=>setDescription(e.target.value)} 
            className="form_textarea"
            rows={6} maxLength={maxEnvironmentLength}
          />
          <p className="text-xs text-stone-500">{maxEnvironmentLength - environment.length} characters remaining</p>
        </label>

        <label className="text-lg py-2">Attachment(s)
          <br className=""/>
          {/* <input 
            type="text" name="project-title" id="project-title" 
            value={title} onChange={(e)=>setTitle(e.target.value)} 
            className="form_input"
            required
          /> */}
        </label>

        <label className="text-lg py-2">Status
          <br className=""/>
            <select name="bug-status" id="bug-status" className='form_input' value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>
        </label>

        <label className="text-lg py-2">Priority
          <br className=""/>
            <select name="bug-priority" id="bug-priority" className='form_input' value={priority} onChange={(e)=>{setPriority(e.target.value)}}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </select>
        </label>

        <label className="text-lg py-2">Severity
          <br className=""/>
            <select name="bug-severity" id="bug-severity" className='form_input' value={severity} onChange={(e)=>{setSeverity(e.target.value)}}>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Major">Major</option>
                <option value="Critical">Critical</option>
            </select>
        </label>

        <div className='flex flex-col'>
            <h3 className='text-lg'>Was this bug reported by a user?</h3>
            <label>
                <input type="radio" name="isUserReportedRadio" value={"True"} className='mr-1'/>
                Yes
            </label>
            <label >
                <input type="radio" name="isUserReportedRadio" value={"False"} className='mr-1'/>
                No
            </label>
        </div>

        

        

        {/* <label className="text-lg py-2">Additional Notes
          <br className=""/>
          <textarea 
            name="project-notes" id="project-notes" 
            value={notes} onChange={(e)=>setNotes(e.target.value)} 
            className="form_input"
            rows={6} maxLength={maxNotesLength}
          />
          <p className="text-xs text-stone-500">{maxNotesLength - notes.length} characters remaining</p>

        </label> */}

        <Link href="/projects" className="ml-auto">
          <button type="button"
            //   key={}
            //   onClick={}
              className="green_btn mt-4 ">Submit Bug
          </button>
        </Link>

      </form>
  )
}

export default BugForm