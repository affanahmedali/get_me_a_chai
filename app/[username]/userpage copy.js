"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getEmail } from '@/lib/actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'

const UserPage = ({ user, username, payments = [] }) => {

  const router = useRouter()
  const [form, setform] = useState({})
  const [ApiMessage, setApiMessage] = useState()
  const [display_toast, setdisplay_toast] = useState(false)


  const handleChange = (e) => {
    console.log("File: app/[username]/page.js")
    console.log("Function handleChange is working")
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e, customForm = form) => {
    e.preventDefault()
    console.log("File: app/[username]/page.js")
    console.log("Function handleSubmit is working")
    console.log("custom form:", customForm);
    // setform(prev => ({...prev, to_user: username}))
    

    let user_email = await getEmail()
    const payload = { ...customForm, email: user_email, to_user: username }
    console.log("Submitting Payload", payload);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json()
      // response.ok allows me to check if dashboard info is present at the backend/api (payment/route.js)
      // logic I may implement (not necessary)
      //if dashboard data is present you the same payment id or a new 
      //if new go to the dashboard
      if (response.ok) {
        setApiMessage(result.message)
        // Display API message on UI
        setdisplay_toast(true)
        console.log(`Amount(after api call) : ${result.amount}`)
        setform({})
      }
      else if (response.status === 401) {
        // setApiMessage("Payment id/Payment Credentials of user does not exit\n", result.error)
        setApiMessage("Payment id/Payment Credentials of user does not exit")


        // setApiMessage("Payment id/Payment Credentials of user does not exit\n Redirecting to Dashboard")
        // localStorage.setItem("PaymentData", JSON.stringify(payload));
        // setform({})
        // router.push('/dashboard')

      }
      else {
        setApiMessage(result.error)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleDirectPayment = async (amount) => {
    console.log('function handleDirectPayment is working')
    const updatedForm = { ...form, amount }; // Ensure amount is added properly
    console.log(updatedForm)
    console.log('invoking set form')
    setform(updatedForm);
    // console.log(form) // will give old values
    console.log("Form is set")
    await handleSubmit({ preventDefault: () => { } }, updatedForm) //mimic event
    console.log(`Directly paid from $${amount} button`)
  }

  console.log(`Username API Message: ${ApiMessage}`)

  useEffect(() => {
    if (display_toast) {
      
    toast('🦄 Payment Done!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    setdisplay_toast(false)
  }

  }, [display_toast])


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="top">
        <div className="background relative">
          <img className="object-cover w-full h-[400px]" src={user.coverpicture} alt="cover picture" />
          <div className="profile-picture absolute bottom-[-50px] right-[46%] h-32 w-30">
            <img className="h-32 rounded-xl border-4 border-white" width={120} height={100} src={user.profilepicture} alt="" />
          </div>
        </div>
        <div className="profile-info my-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Web Dev with Affan Ahmed Ali</h1>
          <p className=" text-[#c4c4c4]">Creating websites for free</p>
          <div className="my-2">
            <ul className="flex flex-row gap-2 text-gray-500">
              <li>members</li>
              <li>.</li>
              <li>posts</li>
              <li>.</li>
              <li>releases</li>
            </ul>
          </div>
          <button type="button" className="mt-4 text-white bg-[#413694] hover:bg-[#4e439b] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Join for free</button>
        </div>
      </div>
      <div className="bottom flex justify-center mb-[80px]">
        <div className="payment w-[90%] flex justify-center gap-8">
          <div className="supporters px-8 py-2 pb-16 flex flex-col bg-slate-900 w-1/2">
            <h2 className="text-xl font-bold my-2 py-2">Supporters</h2>
            <ul className="mx-2 flex flex-col gap-1">

              {payments.length === 0 ? (
                <li className='text-gray-500'>No messages yet.</li>
              ) : (
                payments.map((payment, id) => (
                  <li key={id} className="flex gap-2 items-center">
                    <img width={35} src="avatar.gif" alt="user avatar" />
                    <span>{payment.name} donated
                      <span className="font-bold"> ${payment.amount} </span>
                      with a message "{payment.message}"
                    </span>
                  </li>
                ))
              )}

              {/* <li className="flex gap-2 items-center">
                <img width={35} src="avatar.gif" alt="user avatar" />
                <span>Hassan donated <span className="font-bold">30$</span> with a message "backchodi band karo 😡"</span>
              </li> */}

            </ul>

          </div>
          <form onSubmit={handleSubmit} className="make-payment px-8 py-2 pb-16 flex flex-col bg-slate-900 w-1/2">
            {/* <div className="make-payment px-8 py-2 pb-16 flex flex-col bg-slate-900 w-1/2"> */}
            <h2 className="text-xl font-bold my-2 py-2">Make Payment</h2>
            <div className="flex flex-col gap-4">
              <input onBlur={handleChange} className="w-full bg-slate-800 p-3 rounded-lg" type="text" name="name" id="" placeholder="Enter name" />
              <input onBlur={handleChange} className="w-full bg-slate-800 p-3 rounded-lg" type="text" name="message" id="" placeholder="Enter message" />
              <input onBlur={handleChange} className="w-full bg-slate-800 p-3 rounded-lg" type="number" name="amount" id="" placeholder="Enter amount" />

              <button type="submit" className="cursor-pointer text-white bg-gradient-to-br from-purple-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Pay</button>
            </div>
            {/* OR choose from these amounts */}
            <div className="my-3 flex gap-2">
              {/* recomended to add arrow function before setform */}
              <button onClick={() => handleDirectPayment(10)} name='amount' className="cursor-pointer bg-slate-800 p-3 rounded-lg">Pay $10</button>
              <button onClick={() => handleDirectPayment(20)} name='amount' className="cursor-pointer bg-slate-800 p-3 rounded-lg">Pay $20</button>
              <button onClick={() => handleDirectPayment(30)} name='amount' className="cursor-pointer bg-slate-800 p-3 rounded-lg">Pay $30</button>
            </div>

            {/* </div> */}
          </form>

        </div>
      </div>

    </>
  )
}

export default UserPage