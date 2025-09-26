import React from 'react'
import { notFound } from 'next/navigation'
import UserPage from './userpage'
import { fetchUser, fetchPayments } from '@/lib/actions/useractions'

const Username = async ({ params }) => {

  // the username is taken from the request url
  const { username } = await params
  console.log("***************")
  console.log('username FIRST', username)

  const user = await fetchUser(username)
  if (!user) return notFound()
  
  const payments = await fetchPayments(username)

  console.log("payments: ", payments) // debugging
  console.log("User: ", user)

  return (
    <>
      <UserPage user={user} username={username} payments={JSON.parse(JSON.stringify(payments))} />
    </>
  )

}

export default Username