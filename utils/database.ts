import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import type { PoolClient } from 'pg';
import { BugTypePRIMARY, ProjectTypePRIMARY } from './definitions';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export const connectToDB = async () => {
    const client = await pool.connect();
    console.log("Database Connection Established.")
    return client
}

export const closeDBConnnection = (client: PoolClient) => {
    console.log("DB Connection closed")
    client.release();
};


export const userExistsQuery = async (email: string) => {
    console.log("userExistsQuery initiated")

    const client = await connectToDB()
    
    const query = `SELECT * FROM users WHERE email='${email}' `

    try {

        const response = await client.query(query)
        // console.log(`QUERY RESPONSE: `)
        // console.log(response)
        // console.log(`QUERY RESPONSE ROWS: `)
        // console.log(response.rows)
        // console.log(`QUERY RESPONSE LENGTH: `)
        // console.log(response.rows.length)


        if(response.rows.length>0){
            return true
        }
        return false

    } catch (error) {
        console.log("Error in userExistsQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const createUserQuery = async (email: string, username: string, image: string) => {
    const client = await connectToDB()

    const user_id = nanoid()

    const query = `INSERT INTO users (user_id, email, username, image) VALUES ('${user_id}', '${email}', '${username}', '${image}')`

    try {
        
        const response = await client.query(query)

        if(response.rowCount===1){
            return true
        }
        return false

    } catch (error) {
        console.log("Error in createUserQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const getUserQuery = async (email: string) => {
    const client = await connectToDB()

    const query = `SELECT * FROM users WHERE email='${email}' `
    // console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        

        if(response.rows.length>0){
            return response.rows[0]
        }
        

    } catch (error) {
        console.log("Error in getUserQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const createProjectQuery = async (project : ProjectTypePRIMARY) => {
    const client = await connectToDB()

    const project_id = nanoid()

    const {owner_id, title, description, industry, additional_notes} = project
    const project_client = project.client


    const query = `INSERT INTO projects (project_id, owner_id, title, description, industry, client, additional_notes) VALUES 
                    ('${project_id}', '${owner_id}', '${title}', '${description}', '${industry}', '${project_client}', '${additional_notes}')`
    console.log(`QUERY BEING EXECUTED: ${query}`)        

    try {
        
        const response = await client.query(query)

        // console.log(`QUERY RESPONSE: `)
        // console.log(response)
        // console.log(`QUERY RESPONSE ROWS: `)
        // console.log(response.rows)
        // console.log(`QUERY ROW COUNT: `)
        // console.log(response.rowCount)

        if(response.rowCount===1){
            return true
        }
        return false

    } catch (error) {
        console.log("Error in createProjectQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const getUserProjectsQuery = async (user_id: string) => {
    const client = await connectToDB()

    

    const query = `SELECT * FROM projects WHERE owner_id='${user_id}' `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rows.length>0){
            return response.rows
        }
        

    } catch (error) {
        console.log("Error in getUserProjectsQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const getProjectQuery = async (project_id: string) => {
    const client = await connectToDB()

    const query = `SELECT * FROM projects WHERE project_id='${project_id}' `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rows.length>0){
            return response.rows[0]
        }
        

    } catch (error) {
        console.log("Error in getProjectQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const updateProjectQuery = async (project: ProjectTypePRIMARY, project_id: string) => {
    const client = await connectToDB()

    const { title, description, industry, client: project_client, additional_notes} = project

    const query = `UPDATE projects 
        SET title='${title}', description='${description}', industry='${industry}', client='${project_client}', additional_notes='${additional_notes}'
        WHERE project_id='${project_id}' `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rowCount===1){
            return true
        }
        

    } catch (error) {
        console.log("Error in updateProjectQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const deleteProjectQuery = async (project_id: string) => {
    const client = await connectToDB()

    // const { title, description, industry, client: project_client, additional_notes} = project

    const query = `DELETE FROM projects WHERE project_id='${project_id}'`
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rowCount===1){
            return true
        }
        

    } catch (error) {
        console.log("Error in deleteProjectQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const createBugQuery = async (bug : BugTypePRIMARY) => {
    const client = await connectToDB()

    const bug_id = nanoid()

    const {project_id, creator_id, title, description, status, priority, severity, environment, is_user_reported} = bug
    


    const query = `INSERT INTO bugs (bug_id, project_id, creator_id, title, description, status, priority, severity, environment, is_user_reported) VALUES 
                    ('${bug_id}', '${project_id}', '${creator_id}', '${title}', '${description}', '${status}', '${priority}', '${severity}', '${environment}', ${is_user_reported})`
    console.log(`QUERY BEING EXECUTED: ${query}`)        

    try {
        
        const response = await client.query(query)

        // console.log(`QUERY RESPONSE: `)
        // console.log(response)
        // console.log(`QUERY RESPONSE ROWS: `)
        // console.log(response.rows)
        // console.log(`QUERY ROW COUNT: `)
        // console.log(response.rowCount)

        if(response.rowCount===1){
            return true
        }
        return false

    } catch (error) {
        console.log("Error in createBugQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const getAllProjectBugsQuery = async (project_id: string) => {
    const client = await connectToDB()

    

    const query = `SELECT * FROM bugs WHERE project_id='${project_id}' `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rows.length>0){
            return response.rows
        }
        

    } catch (error) {
        console.log("Error in getAllProjectBugsQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}