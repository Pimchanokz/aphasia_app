// "use server"
// import pool from '@/app/db/mysql'
// import { currentUser } from '@clerk/nextjs/server'

// export const fetchUsers = async () => {
//   try {
//     const clerkUser = await currentUser()
//     let sqlUser = null

//     // Connect to the database
//     const connection = await pool.getConnection();

//     // Find the user in the database
//     const [rows] = await connection.query('SELECT * FROM users WHERE clerkUserId = ?', [clerkUser?.id])
//     sqlUser = rows[0]

//     if (!sqlUser) {
//       let username = clerkUser?.username
//       if (!username) {
//         username = clerkUser?.firstName + " " + clerkUser?.lastName
//       }
//       const newUser = {
//         clerkUserId: clerkUser?.id,
//         username,
//         email: clerkUser?.emailAddresses[0].emailAddress,
//         profilePic: clerkUser?.imageUrl
//       }

//       // Insert the new user into the database
//       const result = await connection.query('INSERT INTO users SET ?', newUser)
//       sqlUser = { id: result.insertId, ...newUser }
//     }

//     // Find all quiz results for the user
//     const [quizResults] = await connection.query('SELECT * FROM quizResults WHERE userId = ?', [sqlUser.id])

//     connection.release(); // Release the connection back to the pool

//     return {
//       data: {
//         user: sqlUser,
//         quizResults
//       }
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }