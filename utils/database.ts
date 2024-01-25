import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import type { PoolClient } from 'pg';


let isConnected = false; //To track our db connection

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export const connectToDB = async () => {
    // if (isConnected) {
    //     console.log("Database already connected.")
    //     return;
    // }


    const client = await pool.connect();
    // isConnected = true
    console.log("Database Connection Established.")
    return client

    // try {

    //     // const client = await pool.connect();
    //     // isConnected = true
    //     console.log("Database Connection Established.")

    // } catch (error) {
    //     console.log(error)
    // } finally {
    //     client.release();
    // }
}

export const closeDBConnnection = (client: PoolClient) => {
    console.log("DB Connection closed")
    client.release();
};


export const userExistsQuery = async (email: string) => {
    console.log("userExistsQuery initiated")

    const client = await connectToDB()
    
    const query = `SELECT * FROM users WHERE email='${email}' `
    // console.log(`QUERY BEING EXECUTED: ${query}`)

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
    // console.log(`QUERY BEING EXECUTED: ${query}`)

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

        // console.log(`QUERY RESPONSE: `)
        // console.log(response)
        // console.log(`QUERY RESPONSE ROWS: `)
        // console.log(response.rows)
        // console.log(`QUERY ROW COUNT: `)
        // console.log(response.rowCount)

        if(response.rowCount===1){
            return response.rows[0]
        }
        

    } catch (error) {
        console.log("Error in getUserQuery:")
        console.log(error)
    } finally{
        closeDBConnnection(client)
    }

}


// export const getData = async () => {
//     const client = await pool.connect();

//     try {
//         const response = await client.query('SELECT version()');
//         console.log(response.rows[0]);
//         return response.rows[0];
//     } finally {
//         client.release();
//     }
// }

