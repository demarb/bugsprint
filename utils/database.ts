import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import type { PoolClient } from 'pg';
import { BugTypePRIMARY, ProjectTypePRIMARY, JoinRequestType, UserJoinRequestType } from '@/utils/definitions';

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

// Project related queries
export const createProjectQuery = async (project : ProjectTypePRIMARY) => {
    const client = await connectToDB()

    const project_id = nanoid()
    let access_code;
    do {
        access_code = Math.floor(100000000 + Math.random() * 900000000).toString().substring(0, 9);
    } while ((await checkUniqueAccessCodeQuery(access_code)));
    

    const {owner_id, title, description, industry, additional_notes} = project
    const project_client = project.client


    const query = `INSERT INTO projects (project_id, owner_id, title, description, industry, client, additional_notes, access_code) VALUES 
                    ('${project_id}', '${owner_id}', '${title}', '${description}', '${industry}', '${project_client}', '${additional_notes}', '${access_code}')`
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

export const getProjectByAccessCodeQuery = async (access_code: string) => {
    const client = await connectToDB()

    const query = `SELECT * FROM projects WHERE access_code='${access_code}' `
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


// Bug related queries
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

export const getBugQuery = async (bug_id: string) => {
    const client = await connectToDB()

    const query = `SELECT * FROM bugs WHERE bug_id='${bug_id}' `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rows.length>0){
            return response.rows[0]
        }
        

    } catch (error) {
        console.log("Error in getBugQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const updateBugQuery = async (bug: BugTypePRIMARY, bug_id: string) => {
    const client = await connectToDB()

    const { title, description, status, priority, severity, environment, is_user_reported } = bug

    const query = `UPDATE bugs 
        SET title='${title}', description='${description}', status='${status}', priority='${priority}', severity='${severity}', environment='${environment}', is_user_reported=${is_user_reported}
        WHERE bug_id='${bug_id}' `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rowCount===1){
            return true
        }
        

    } catch (error) {
        console.log("Error in updateBugQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const deleteBugQuery = async (bug_id: string) => {
    const client = await connectToDB()

    // const { title, description, industry, client: project_client, additional_notes} = project

    const query = `DELETE FROM bugs WHERE bug_id='${bug_id}'`
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rowCount===1){
            return true
        }
        

    } catch (error) {
        console.log("Error in deleteBugQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

//Join requests Queries
export const existingJoinRequestExistsQuery = async (joinrequest: {user_id: string, access_code: string}) => {

    const client = await connectToDB()

    const project : ProjectTypePRIMARY = await getProjectByAccessCodeQuery(joinrequest.access_code)

    const query = `SELECT COUNT(*) FROM joinrequests WHERE project_id = $1 AND user_id = $2 AND status = 'Pending'`
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        const result = await client.query(query, [project.project_id, joinrequest.user_id]);
        //Returns true if an existing pending join request is found
        return parseInt(result.rows[0].count) === 1;
    } catch (error) {
        console.log("Error in existingJoinRequestExistsQuery:")
        console.log(error)
    }finally{
        closeDBConnnection(client)
    }

    

}

export const createJoinRequestQuery = async (joinrequest : {user_id: string, access_code: string}) => {
    const client = await connectToDB()

    const {user_id, access_code} = joinrequest
    
    const project : ProjectTypePRIMARY = await getProjectByAccessCodeQuery(access_code)
    const {project_id} = project

    const query = `INSERT INTO joinrequests (user_id, project_id, status) VALUES 
                    ('${user_id}', '${project_id}', 'Pending')`
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
        console.log("Error in createJoinRequestQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const getAllProjectJoinRequestsQuery = async (project_id: string) => {
    const client = await connectToDB()

    

    const query = `SELECT joinrequests.id AS joinrequest_id, joinrequests.project_id AS project_id, users.user_id, users.email, users.username, users.image
                    FROM users
                    JOIN joinrequests ON users.user_id = joinrequests.user_id
                    WHERE joinrequests.project_id = '${project_id}'
                    AND joinrequests.status = 'Pending';`
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rows.length>0){
            console.log(response.rows)
            return response.rows
        }
        

    } catch (error) {
        console.log("Error in getAllProjectJoinRequestsQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const denyJoinRequestQuery = async (joinrequest_id: number) => {
    const client = await connectToDB()


    const query = `UPDATE joinrequests SET status='Denied' WHERE id=${joinrequest_id} `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rowCount===1){
            return true
        }
        

    } catch (error) {
        console.log("Error in denyJoinRequestQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

export const approveJoinRequestQuery = async (joinrequest_id: number) => {
    const client = await connectToDB()


    const query = `UPDATE joinrequests SET status='Approved' WHERE id=${joinrequest_id} `
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        
        const response = await client.query(query)

        if(response.rowCount===1){
            return true
        }
        

    } catch (error) {
        console.log("Error in approveJoinRequestQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}

// User project associations queries
export const createUserProjectAssociationQuery = async (user_id: string, project_id: string, role: string) => {
    const client = await connectToDB()

    // const {user_id, project_id} = joinrequest

    const query = `INSERT INTO user_project_associations (user_id, project_id, role) VALUES 
                    ('${user_id}', '${project_id}', '${role}')`
    console.log(`QUERY BEING EXECUTED: ${query}`)        

    try {
        
        const response = await client.query(query)

        console.log(`QUERY RESPONSE: `)
        console.log(response)
        console.log(`QUERY RESPONSE ROWS: `)
        console.log(response.rows)
        console.log(`QUERY ROW COUNT: `)
        console.log(response.rowCount)

        if(response.rowCount===1){
            return true
        }
        return false

    } catch (error) {
        console.log("Error in createUserProjectAssociationQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}


//Other utility functions to query database
export const checkUniqueAccessCodeQuery = async (access_code: string) => {
    const client = await connectToDB()
    const query = `SELECT COUNT(*) FROM projects WHERE access_code = '${access_code}'`;
    console.log(`QUERY BEING EXECUTED: ${query}`)

    try {
        const result = await client.query(query);
        //Returns true if project was found with this access code
        console.log(parseInt(result.rows[0].count))
        return parseInt(result.rows[0].count) === 1;
    } catch (error) {
        console.log("Error in checkUniqueAccessCodeQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }
    
}

