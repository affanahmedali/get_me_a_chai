import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment"
import User from "@/models/User"

async function HandleDashboard(request) {
    try {
        const dashboardData = await request.json()
        console.log(`This is dashboard api, dashborad data recied ${dashboardData}`)

        if (!dashboardData.name || !dashboardData.email || !dashboardData.paymentid) {
            return new Response(JSON.stringify({
                error: "Name, Email and Payment id are required"
            }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }

        console.log("DashboradData: ", dashboardData)
        // save Data to database
        await connectDb()
        // check if user already exist
        const user = await User.findOne({ email: dashboardData.email })
        if (user) {
            // if user exist check if the payment id exist
            if (user.paymentid === dashboardData.paymentid) {
                //user already exist (with payment id)
                return new Response(JSON.stringify({
                    error: "Payment ID already exists for this user"
                }), {
                    status: 409,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            else {
                // if payment id does not exist in users record then add it
                user.paymentid = dashboardData.paymentid
                // update users record
                await user.save()
                // response
                return new Response(JSON.stringify({
                    message: "Updated User info, Payment id added"
                }),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
            }
        }

        else {

            const newUser = new User({
                email: dashboardData.email,
                name: dashboardData.name,
                username: dashboardData.username,
                paymentid: dashboardData.paymentid
            })

            return new Response(JSON.stringify({
                message: "New user added successfully"
            }),
                {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }
    }

    catch (error) {
        return new Response(JSON.stringify({
            error: "something went wrong with the server"
        }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
    }
}

export { HandleDashboard as POST }