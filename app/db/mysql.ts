import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'aphasia_therapy',
    waitForConnections: true,
})

export default pool