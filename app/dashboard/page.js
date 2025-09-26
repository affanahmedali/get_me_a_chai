import React from 'react'
import DashboardComponent from './dashboard_component'
import { getUsername } from '@/lib/actions/auth'
import { fetchUser } from '@/lib/actions/useractions'

const Dashboard = async () => {

  console.log("This is dashborad page")
  const usersname = await getUsername() // not username but the Name of the user (separate fiels in User Schema in database)
  console.log("username: ", usersname)
  const userData = await fetchUser(usersname) // fetching data of the user who is loged in 
  // if user does not exist in database then userData will be null
  // and hence oldUsername will be undefined (or false)
  let oldUsername = userData?.username
  console.log("old_username: ", oldUsername)
  console.log("userData : ", userData)

  return (
    <>
      <DashboardComponent old_username={oldUsername} userdata={userData} />
    </>
  )
}

export default Dashboard