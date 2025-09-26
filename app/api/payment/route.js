import { checkPaymentID, makePayment } from "@/lib/actions/useractions";
import { v4 as uuidv4 } from 'uuid'

async function HandlePayment(request) {
    try {
        const formdata = await request.json()

        // checks (for data received)
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

        if (!formdata.to_user) {
            return new Response(JSON.stringify({ error: "Missing recipient user"}),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
        }
        console.log("api/payment, formdata", formdata)

        //check if payment id/card number exist only then alow the payment to be saved to database
        // this formdata.email should be taken from backend not frontend
        const PaymentID = await checkPaymentID(formdata.email)
        if(!PaymentID){
            // IF Payment id (payment info) of user does not exist send response to ask user to input paymentid
            return new Response(JSON.stringify({ error: "Payment ID/info of user does not exist" }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // all checks passed, now generate donation id
        let donation_id = uuidv4()
        const newPayment = await makePayment(formdata.name, formdata.email, formdata.to_user, donation_id, formdata.amount, formdata.message)

        if (newPayment) {
            return new Response(JSON.stringify({
                message: "Payment Successful"
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        else if (!PaymentID){
            return new Response(JSON.stringify({
                message: "Payment unsuccessful"
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })}
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