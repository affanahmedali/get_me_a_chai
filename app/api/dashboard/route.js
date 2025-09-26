import { updateProfile } from "@/lib/actions/useractions"

async function HandleDashboard(request) {
    try {
        const dashboardData = await request.json()
        console.log("DashboradData: ", dashboardData)
        const newData = dashboardData.form
        const oldUsername = dashboardData.old_username

        if (!newData.name || !newData.email || !newData.paymentid) {
            return new Response(JSON.stringify({
                error: "Name, Email and Payment id are required"
            }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }

        console.log("No Errors in Dashborad data")
        // save Data to database
        // if oldUsername contain something meaning the user already exist in the database
        if (oldUsername) {
            // user exist in database, so we will update profile
            await updateProfile(newData, oldUsername)

            return new Response(JSON.stringify({
                message: "Updated User info"
            }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }
        else{
            // user does not exist in database, so create a new User
            // but we dont need to create a new user as user are created in auth js as soon as they are authenticated (from github)
            // without authentication user can not access dashboard page
            // dont even know if it will ever come to this (else section)
            return new Response(JSON.stringify({
                error: "You need to login first"
            }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                });
        }


    }

    catch (error) {
        return new Response(JSON.stringify({
            error: error.message || "something went wrong with the server"
        }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
    }
}

export { HandleDashboard as POST }