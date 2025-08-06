import dotenv from 'dotenv'

dotenv.config()

import mysql from 'mysql2/promise'

export const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

database.getConnection().catch(err =>
    console.error(err + ' ' + 'Error while connecting to database'))