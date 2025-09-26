// core auth js
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "./models/User"
import Payment from "./models/Payment"
import connectDb from "./db/connectDb"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  callbacks: {
    async signIn({ account, user }) {
      console.log("Are these parameters to the signIn callback working\n(defined in auth.js at the root)")
      console.log(`account: ${JSON.stringify(account)}`)
      console.log(`user: ${JSON.stringify(user)}`)

      if (account.provider == "github") {
        //Connect to the database
        await connectDb()

        // this users comes from github, hence function fetchUser from lib\actions\useractions.js can not be used
        const name = user?.name
        console.log(`name ${name}`)

        const email = user?.email
        console.log(`email : ${email}`)
        
        if (!email) {
          console.error("Email not found. Denying access.");
          return false;
        }
        // Check if user exist in database

        const currentUser = await User.findOne({ email: email });
        console.log(`currentUser: ${currentUser}`)

        if (!currentUser) {
          console.log("User not found in databse\nCreating new user")
          // Create new user
          const newUser = new User({
            name: name,
            email: email,
            username: email.split('@')[0],
          })
          await newUser.save()
          user.username = newUser.username
          console.log(`if user.username : ${user.username}`)
          console.log(`if user.name : ${user.name}`)
        }
        else {
          user.username = currentUser.username
          console.log(`else user.username : ${user.username}`)
          console.log(`else user.name : ${user.name}`)
        }
        console.log("Github be like: Main nahi bataonga")
      }
      console.log("Async be like: Allah ki kasam to aj khatam he")
      return true
    }
  }
})