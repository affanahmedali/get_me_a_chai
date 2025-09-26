// // dashboard component before change

// "use client"
// import { authenticate } from "@/lib/actions/auth"
// import { fetchUser } from "@/lib/actions/useractions" //issue
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { userName } from "@/lib/actions/auth"

// const DashboardComponent = () => {

//   const [form, setform] = useState({})
//   const [ApiMessage, setApiMessage] = useState()
//   const [oldusername, setoldusername] = useState()

//   useEffect(() => {
//     getData()
    
//   }, [])
  
//   // for debugging only
//   useEffect(() => {
//     console.log(`form (updated after payment): ${JSON.stringify(form)}`)
//     console.log("form (updated after payment): ", form)
//   }, [form])

//   const getData = async () => {
//     const usersname = await userName() // not username but the Name of the user (separate fiels in User Schema in database)
//     const userData = await fetchUser(usersname)
//     setoldusername(userData.username)
//     setform(userData)
//   }
  
//   const handleChange = (e) => {
//     console.log("File: app/dashboard/page.js")
//     console.log("Function handleChange is working")
//     setform({...form, [e.target.name] : e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     console.log("File: app/dashboard/page.js")
//     console.log("Function handleSubmit is working")
//     const data_to_send = {form, oldusername}
//     console.log("data_to_send : ", data_to_send)
//     try{
//       const response = await fetch("/api/dashboard", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data_to_send)
//       });

//       const result = await response.json()
//       if (response.ok) {
//         setApiMessage(result.message)
//         // setform({})
//       }
//       else{
//         setApiMessage(result.error)
//       }
//     }
//     catch (error) {
//       console.error(error)
//     }
//   }

//   console.log(`Dashboard API Message: ${ApiMessage}`)
//   console.log("Dashboard API Message: ", ApiMessage)

//   return (
//     <div>
//       <div className="mt-12 mb-6 flex flex-col justify-center items-center">
//         <h1 className="text-4xl font-bold text-white">Welcome to Your Account</h1>
//       </div>

//       <div className="mb-16">
//         <form action={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-3">
//           <div>
//             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//             <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name="name" id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//           </div>
//           <div>
//             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//             <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name="email" id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//           </div>
//           <div>
//             <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
//             <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name="username" id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//           </div>
//           <div>
//             <label htmlFor="profilepicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
//             <input value={form.profilepicture ? form.profilepicture : ""} onChange={handleChange} type="text" name="profilepicture" id="profilepicture" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//           </div>
//           <div>
//             <label htmlFor="coverpicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
//             <input value={form.coverpicture ? form.coverpicture : ""} onChange={handleChange} type="text" name="coverpicture" id="coverpicture" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//           </div>
//           <div>
//             <label htmlFor="paymentid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment ID</label>
//             <input value={form.paymentid ? form.paymentid : ""} onChange={handleChange} type="text" name="paymentid" id="paymentid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//           </div>
//           <div className="my-2">
//             <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm">Save</button>
//           </div>

//         </form>

//       </div>
//     </div>
//   )
// }

// export default DashboardComponent