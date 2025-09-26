"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { authenticate } from '@/lib/actions/auth';
import { logout } from '@/lib/actions/auth';

const Navbar = () => {
  const [IsLogedin, setIsLogedin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await authenticate();
      setIsLogedin(authenticated);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    console.log("Initial part of handle Logout is working");
    const logedout = logout();
    setIsLogedin(false);
    console.log("Final part of handle logout is working");
  };

  return (
    <nav className='flex justify-between items-center mx-auto px-6 py-3 bg-gray-900'>
      <Link href={"/"}>
        <div className="logo text-lg font-bold flex justify-center items-center">
          <span><img src="tea.gif" alt="tea.gif" width={40} /></span>
          GetMeAChai
        </div>
      </Link>
      <div className='navbuttons'>
        {!IsLogedin && (
          <div className='login-btn'>
            <Link href={"/login"}>
              <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button>
            </Link>
          </div>
        )}
        
        {IsLogedin && (
          <div className='logedinButtons flex gap-4'>
            <div className="dashboard-btn bg-red-600 relative">
              <button
                id="dropdownDelayButton"
                onMouseEnter={() => setIsDropdownOpen(true)} 
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Dropdown hover 
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div id="dropdownDelay" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className='logout-btn'>
              <Link href={"/"}>
                <button onClick={() => handleLogout()} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Logout</button>
              </Link>
            </div>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
