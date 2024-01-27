"use client"

import { useState } from "react"
import Link from "next/link"
import { ProjectFormProps, ProjectTypePRIMARY } from "@/utils/definitions"

const ProjectForm = ({type, submitting, project, setProject, handleSubmit} : ProjectFormProps) => {

    const [isFormEditable, setFormEditable] = useState(false);
  
    const maxDescriptionLength = 500
    const maxNotesLength = 1000

    return (
        <form className="flex flex-col pt-2 md:pt-4" onFocus={() => setFormEditable(true)} onBlur={() => setFormEditable(false)}>
            <label className="text-lg">Title
            <br className=""/>
            <input 
                type="text" name="project-title" id="project-title" 
                value={project.title} onChange={(e)=>setProject({...project, title: e.target.value})}
                className="form_input readonly_form"
                required maxLength={100}
                readOnly={!isFormEditable}
            />
            </label>

            <label className="text-lg">Description
            <br className=""/>
            <textarea 
                name="project-description" id="project-description" 
                value={project.description} onChange={(e)=>setProject({...project, description: e.target.value})} 
                className="form_textarea readonly_form"
                rows={6} maxLength={maxDescriptionLength}
                readOnly={!isFormEditable}
            />
            <p className="text-xs text-stone-500">{maxDescriptionLength - project.description.length} characters remaining</p>
            </label>

            <label className="text-lg">Industry
            <br className=""/>
            <input 
                type="text" name="project-industry" id="project-industry" 
                value={project.industry} onChange={(e)=>setProject({...project, industry: e.target.value})} 
                className="form_input readonly_form"
                maxLength={100}
                readOnly={!isFormEditable}
            />
            </label>

            <label className="text-lg">Client
            <br className=""/>
            <input 
                type="text" name="project-client" id="project-client" 
                value={project.client} onChange={(e)=>setProject({...project, client: e.target.value})} 
                className="form_input readonly_form"
                maxLength={100}
                readOnly={!isFormEditable}
            />
            </label>

            <label className="text-lg">Additional Notes
            <br className=""/>
            <textarea 
                name="project-notes" id="project-notes" 
                value={project.additional_notes} onChange={(e)=>setProject({...project, additional_notes: e.target.value})}
                className="form_input readonly_form"
                rows={12} maxLength={maxNotesLength}
                readOnly={!isFormEditable}
            />
            <p className="text-xs text-stone-500">{maxNotesLength - project.additional_notes.length} characters remaining</p>

            </label>

            {/* <Link href="/projects" className="ml-auto"> */}
            <div className="w-full lg:w-4/5 flex">
                <button type="button"
                    disabled={submitting}
                    //   key={}
                    onClick={handleSubmit}
                    className="green_btn ml-auto mt-4"
                >
                    {
                        type === "Create" ? 
                            (submitting ? "Creating Project" : "Create") 
                            : (submitting ? "Updating Project" : "Update")
                    }
                </button>
            </div>
            
            {/* </Link> */}

        </form>
  )
}

export default ProjectForm