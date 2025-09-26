// import React from 'react'
// import connectDb from '@/db/connectDb'
// import User from '@/models/User'
// import { notFound } from 'next/navigation'
// import UserPage from './userpage'

// const Username = async({params}) => {

//   const {username} = await params
//   console.log("***************")
//   console.log('username FIRST', username)

//   const checkUser = async () => {
//     await connectDb()
//     let user = await User.findOne({ name: username })
//     if (!user) {
//       return notFound()
//     }
//     return user
//   }
//   await checkUser()

//   return (
//     <>
//     <UserPage username={params.username} />
//     </>
//   )

// }

// export default Username