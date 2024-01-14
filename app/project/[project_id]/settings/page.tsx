"use client"

import {useState} from 'react'
import Link from "next/link"

const ProjectSettingsPage = ({ params }: { params: { "project_id": string } }) => {

  const [confirmedProjectName, setConfirmedProjectName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [industry, setIndustry] = useState("")
  const [client, setClient] = useState("")
  const [notes, setNotes] = useState("")

  const maxDescriptionLength = 250
  const maxNotesLength = 500

  return (
    <section className='mx-auto py-2'>

      <div className=''>
        <div className='flex flex-col justify-between'>
          <h2 className='text-4xl text-primary-green'>Project Settings</h2>

          <div>
            <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>General Project Information</h2>

              <div>
                <h3 className='text-lg font-bold text-primary-green'>Project ID: 
                  <span className='text-black'>{` ExampleProjectID`}</span>
                </h3>
                <form className="flex flex-col pt-8">
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


                </form>

                <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                  Save
                </button>
                
              </div>
            </div>

            <hr />

            <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Bug Tracking</h2>

              <div className='flex flex-col'>

                

                <div className='flex flex-col'>
                  <h3 className='text-lg text-primary-green'>Allow Guests (eg. App users) To Submit Bugs?</h3>
                  <label>
                    <input type="radio" name="visibilityRadio" value="csv" className='mr-1'/>
                    Yes
                  </label>
                  <label >
                    <input type="radio" name="visibilityRadio" value="json" className='mr-1'/>
                    No
                  </label>
                  <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    Save
                  </button>
                </div>

                <div className='flex flex-col'>
                  <h3 className='text-lg text-primary-green'>Set a Default Assignee for New Bugs</h3>

                  <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    Save
                  </button>
                  
                </div>
                
              </div>
            </div>

            <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Access Control Settings</h2>

              <div className='flex flex-col'>

                

                <div className='flex flex-col'>
                  <h3 className='text-lg text-primary-green'>Project Visibility</h3>
                  <label>
                    <input type="radio" name="visibilityRadio" value="csv" className='mr-1'/>
                    Public
                  </label>
                  <label >
                    <input type="radio" name="visibilityRadio" value="json" className='mr-1'/>
                    Private
                  </label>
                  <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                    Save
                  </button>
                </div>

                <div className='flex flex-col'>
                  <h3 className='text-lg text-primary-green'>Access Permissions</h3>

                  <Link href={`/project/${params.project_id}/members`} className="my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max">
                    <button className=''>
                      Members
                    </button>
                  </Link>
                </div>
                
              </div>
            </div>

            <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Notification Preferences</h2>

              <div>
                
              </div>
            </div>

            <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Project Log</h2>

              <div>
                <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                  View Logs
                </button>
              </div>
            </div>

            

            <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Export Project Data</h2>

              <div className='flex flex-col'>

                <label>
                  <input type="radio" name="dataExportRadio" value="csv" className='mr-1'/>
                  CSV
                </label>
                <label >
                  <input type="radio" name="dataExportRadio" value="json" className='mr-1'/>
                  JSON
                </label>

                <button className='my-2 bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                  Download Data
                </button>
              </div>
            </div>
          </div>

          <hr />

          <div className='py-2 md:py-4'>
              <h2 className='text-2xl text-primary-green'>Delete Project</h2>

              <div className='flex flex-col justify-around'>

                <p className="text-md text-red-700 py-2">Type Project ID to confirm delete</p>

                <input 
                  type="text" name="project-client" id="project-client" 
                  value={confirmedProjectName} onChange={(e)=>setConfirmedProjectName(e.target.value)} 
                  className="form_input"
                />

                <button className='my-2 bg-red-700 border-red-700 border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800 w-max'>
                  Delete Project
                </button>

              </div>
            </div>
        </div>       
      </div>
      
    </section>
  )
}

export default ProjectSettingsPage