// // core auth js
// import NextAuth from "next-auth"
// import Github from "next-auth/providers/github"
// import mongoose from "mongoose"
// import User from "./models/User"
// import Payment from "./models/Payment"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Github],
//   callbacks: {
//     async signIn({ account, email, user, profile, credentials }) {
//       console.log("Are these parameters to the signIn working")
//       console.log(`account: ${account}`)
//       console.log(`account: ${JSON.stringify(account)}`)
//       console.log(`email: ${email}`)
//       console.log(`user: ${user}`)
//       console.log(`user: ${JSON.stringify(user)}`)
//       console.log(`profile: ${profile}`)
//       console.log(`profile: ${JSON.stringify(profile)}`)
//       console.log(`credentials: ${credentials}`)

//       if (account.provider == "github") {
//         //Connect to the database
//         const client = await mongoose.connect('mongodb://localhost:27017/chai')
//         console.log("client")
//         // console.log(client)
//         console.log("Connected to databse")
//         // Check if user exist in database
//         console.log(`email to use \nuser.email: ${user?.email}\nprofile.email: ${profile?.email}`)
//         const email = user?.email
//         console.log(`Name : ${user?.name}`)
//         if (!email) {
//           console.error("Email not found. Denying access.");
//           return false;
//         }

//         const currentUser = await User.findOne({ email: email });

//         console.log(`email : ${email}\ncurrentUser: ${currentUser}`)
//         if (!currentUser) {
//           console.log("Starting if condition")
//           // Create new user
//           const newUser = new User({
//             email: email,
//             username: email.split('@')[0],

//           })
//           await newUser.save()
//           user.name = newUser.username
//           console.log(`if user.name : ${user.name}`)
//         }
//         else {
//           user.name = currentUser.username
//           console.log(`else user.name : ${user.name}`)
//         }
//         console.log("Github be like: Main nahi bataonga")
//       }
//       console.log("Async be like: Allah ki kasam to aj khatam he")
//       return true
//     }
//   }
// })