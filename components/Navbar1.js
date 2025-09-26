"use client"
import React from 'react'
import Link from 'next/link'
import { authenticate } from '@/lib/actions/auth'
import { useState, useEffect } from 'react'
import { logout } from '@/lib/actions/auth'

const Navbar = () => {
  const [IsLogedin, setIsLogedin] = useState(false)

  useEffect(() => {

    const checkAuth = async () => {
      const authenticated = await authenticate();
      setIsLogedin(authenticated);
    }
    checkAuth()

  }, [])

  const handleLogout = () => {
    console.log("Initial part of handle Logout is working, Navbar1")
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
      <div className='buttons'>

        {IsLogedin ?

          (<div className='logout-btn'>
            <Link href={"/"}>
              <button onClick={() => {handleLogout()} } className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Logout</button>
            </Link>
          </div>)
          :
          (<div className='login-btn'>
            <Link href={"/login"}>
              <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button>
            </Link>
          </div>)
        }

      </div>
    </nav>
  )
}

export default Navbar