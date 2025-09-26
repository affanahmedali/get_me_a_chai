"use client"
import React from 'react'
import Link from 'next/link'
import { authenticate, userName } from '@/lib/actions/auth'
import { useState, useEffect } from 'react'
import { logout } from '@/lib/actions/auth'

const Navbar = () => {
  const [IsLogedin, setIsLogedin] = useState(false)
  const [showDropdown, setshowDropdown] = useState(false)
  const [Name, setName] = useState(null)

  useEffect(() => {

    const checkAuth = async () => {
      console.log("checkAuth from Navbar is running")
      const authenticated = await authenticate();
      console.log("Navbar has called authenticate method from @/lib/actions/auth ")
      setIsLogedin(authenticated);
      const userNameData = await userName()
      console.log("Navbar has called userName method from lib/actions/auth ")
      setName(userNameData)
    }
    checkAuth()

  }, [])

  const handleLogout = () => {
    console.log("Initial part of handle Logout is working")
    const logedout = logout();
    setIsLogedin(false);
    console.log("Final part of handle logout is working")
  }


  return (
    <nav className='flex justify-between items-center mx-auto px-6 py-3 bg-gray-900'>
      <Link href={"/"}>
        <div className="logo text-lg font-bold flex justify-center items-center">
          <span><img src="tea.gif" alt="tea.gif" width={40} /></span>
          GetMeAChai
        </div>
      </Link>
      <div className='navbuttons'>

        {!IsLogedin && <div className='login-btn'>
          <Link href={"/login"}>
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button>
          </Link>
        </div>
        }

        {IsLogedin &&
          <div className='logedinButtons flex gap-4'>
            <div className="dashboard-btn relative">

              <button onClick={() => setshowDropdown(!showDropdown)} onBlur={() => {setTimeout(() => {
                setshowDropdown(false)
              }, 100); }} id="dropdownDelayButton"  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700" type="button">Welcome {Name}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
              </button>

              {/* <!-- Dropdown menu --> */}
              <div id="dropdownDelay" className={`absolute right-0 z-10 ${showDropdown?"": "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                  <li>
                    <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                  <li>
                    {/* Need to update logic for href */}
                    <Link href={"/affanahmedali"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
                  </li>
                  <li>
                    <Link href={"/earnings"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                  </li>
                  <li>
                    {/* Need to handle href for signout */}
                    <Link href={"/login"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                  </li>
                </ul>
              </div>
              
            </div>

            <div className='logout-btn'>
              <Link href={"/"}>
                <button onClick={() => handleLogout()} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Logout</button>
              </Link>
            </div>

          </div>}

      </div>
    </nav>
  )
}

export default Navbar