import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";

async function HandlePayment(request) {
    try {
        const formdata = await request.json()

        if (!formdata.name) {
            return new Response(JSON.stringify({ error: "Name is required." }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
        }
        if (!formdata.amount) {
            return new Response(JSON.stringify({ error: "Amount is required." }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
        }

        if (!formdata.donation_id || !formdata.to_user) {
            return new Response(JSON.stringify({ error: "Missing donation ID or recipient user"}),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
        }
        console.log("api/payment")
        console.log("formdata", formdata)

        //check if payment id/card number exisst only then alow the payment to be saved to database
        
        // connect to database
        await connectDb()
        
        // check if payment id is associated with donating users email
        const userEmail = formdata.email
        // should I save payment id in payment db records?
        const userData = await User.findOne({ email: userEmail})
        const PaymentID = userData.paymentid
        if(!PaymentID){
            // IF Payment id (payment info) of user does not exist send response and redirect to dashborad to input payment id
            return new Response(JSON.stringify({ error: "Payment ID/info of user does not exist" }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });

        }

        // this is a record for payment also include payment id/card number
        const donationID = formdata.donation_id

        // Check if payment credentials are found in databse
        const payment = await Payment.findOne({ donation_id: donationID })
        if (!payment) {
            console.log("Payment does not exit, creating a new payment")
            const newPayment = new Payment({
                name: formdata.name,
                email: formdata.email,
                to_user: formdata.to_user,
                donation_id: formdata.donation_id,
                amount: formdata.amount,
                message: formdata.message,
                done: true
            })
            await newPayment.save()

            return new Response(JSON.stringify({
                message: "Payment Successful"
            }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                })
        }

        //payment exist
        return new Response(JSON.stringify({ error: "Payment already exist confirmed by donation id" }),
            {
                status: 409,
                headers: { 'Content-Type': 'application/json' }
            });

    }
    catch (error) {
        return new Response(JSON.stringify({ error: "Something went wrong" }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
    }
}

export { HandlePayment as POST }