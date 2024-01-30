"use client"

import Link from 'next/link'
import { useState } from 'react'
import { BugFormProps, ProjectTypePRIMARY } from "@/utils/definitions"


const BugForm = ({type, submitting, bug, setBug, handleSubmit} : BugFormProps) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [severity, setSeverity] = useState("")
    const [environment, setEnvironment] = useState("")

    const [isFormEditable, setFormEditable] = useState(false);

    const maxDescriptionLength = 2000
    const maxEnvironmentLength = 1000


  return (
    <form className="flex flex-col pt-2 md:pt-4" onFocus={() => setFormEditable(true)} onBlur={() => setFormEditable(false)}>
        <label className="text-lg py-2">Title
          <br className=""/>
          <input 
            type="text" name="bug-title" id="bug-title" 
            value={bug.title} onChange={(e)=>setBug({...bug, title: e.target.value})} 
            className="form_input readonly_form"
            required maxLength={200}
            readOnly={!isFormEditable}
          />
        </label>

        <label className="text-lg py-2">Description (including steps needed to reproduce the bug)
          <br className=""/>
          <textarea 
            name="bug-description" id="bug-description" 
            value={bug.description} onChange={(e)=>setBug({...bug, description: e.target.value})}
            className="form_textarea readonly_form"
            rows={24} maxLength={maxDescriptionLength}
            readOnly={!isFormEditable}
          />
          <p className="text-xs text-stone-500">{maxDescriptionLength - description.length} characters remaining</p>
        </label>

        <label className="text-lg py-2">Environment Details (browser, version, operating system, etc)
          <br className=""/>
          <textarea 
            name="bug-environment" id="bug-environment" 
            value={bug.environment} onChange={(e)=>setBug({...bug, environment: e.target.value})}
            className="form_textarea readonly_form"
            rows={12} maxLength={maxEnvironmentLength}
            readOnly={!isFormEditable}
          />
          <p className="text-xs text-stone-500">{maxEnvironmentLength - environment.length} characters remaining</p>
        </label>

        <label className="text-lg py-2">Attachment(s)
          <br className=""/>
          {/* <input 
            type="text" name="bug-title" id="bug-title" 
            value={bug.attachment} onChange={(e)=>setBug({...bug, attachment: e.target.value})}  
            className="form_input readonly_form"
            required
            readOnly={!isFormEditable} 
          /> */}
        </label>

        <label className="text-lg py-2">Status
          <br className=""/>
            <select required name="bug-status" id="bug-status" className='form_input' value={bug.status} onChange={(e)=>setBug({...bug, status: e.target.value as "Open" | "In Progress" | "Closed"})}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>
        </label>

        <label className="text-lg py-2">Priority
          <br className=""/>
            <select required name="bug-priority" id="bug-priority" className='form_input' value={bug.priority} onChange={(e)=>setBug({...bug, priority: e.target.value as "Low" | "Medium"| "High" | "Critical"})}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </select>
        </label>

        <label className="text-lg py-2">Severity
          <br className=""/>
            <select required name="bug-severity" id="bug-severity" className='form_input' value={bug.severity} onChange={(e)=>setBug({...bug, severity: e.target.value as "Minor" | "Moderate"| "Major" | "Critical"})}>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Major">Major</option>
                <option value="Critical">Critical</option>
            </select>
        </label>

        <div className='flex flex-col'>
            <h3 className='text-lg'>Was this bug reported by a user?</h3>
            <label>
                <input required readOnly={!isFormEditable} type="radio" name="isUserReportedRadio" value={"TRUE"} checked={bug.is_user_reported === true} className='mr-1 readonly_form' onChange={() => setBug({ ...bug, is_user_reported: true })}/>
                Yes
            </label>
            <label >
                <input type="radio" readOnly={!isFormEditable} name="isUserReportedRadio" defaultChecked={true} value={"FALSE"} checked={bug.is_user_reported === false} className='mr-1 readonly_form' onChange={() => setBug({ ...bug, is_user_reported: false })}/>
                No
            </label>
        </div>

        

        

        {/* <label className="text-lg py-2">Additional Notes
          <br className=""/>
          <textarea 
            name="bug-notes" id="bug-notes" 
            value={notes} onChange={(e)=>setNotes(e.target.value)} 
            className="form_input"
            rows={6} maxLength={maxNotesLength}
          />
          <p className="text-xs text-stone-500">{maxNotesLength - notes.length} characters remaining</p>

        </label> */}

        {/* <Link href="/bugs" className="ml-auto"> */}
          {/* <button type="button"
              key={}
              onClick={}
              className="green_btn mt-4 ">Submit Bug
          </button> */}
        {/* </Link> */}

        <div className="w-full lg:w-4/5 flex">
                <button type="button"
                    disabled={submitting}
                    //   key={}
                    onClick={handleSubmit}
                    className="green_btn ml-auto mt-4"
                >
                    {
                        type === "Create" ? 
                            (submitting ? "Submitting Bug" : "Submit") 
                            : (submitting ? "Updating Bug" : "Update")
                    }
                </button>
            </div>

      </form>
  )
}

export default BugForm