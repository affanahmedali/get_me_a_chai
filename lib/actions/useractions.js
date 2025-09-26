"use server"
import User from "@/models/User";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";

// fetches user from database
// takes argument username which could be given from any source
// e.g: current loged in user OR the user whos page is being visited
export const fetchUser = async (username) => {
    console.log("fetchUser (from lib/actions/useractions.js) is running")
    await connectDb();
    const u = await User.findOne({ username: username })
    if (!u) {// handle null case
        console.log(`No user by the name of ${username} is found`)
        return null;
    }
    const user = u.toObject({ flattenObjectIds: true })
    return user
}

// fetches payments made to a specific user from database
// this one exclusively takes the username of person whos page we are visiting
export const fetchPayments = async (username) => {
    console.log("fetchPayment (from lib/actions/useractions.js) is running")
    await connectDb()
    let payments = await Payment.find({ to_user: username })
        .sort({ createdAt: -1 }) // sort in descending order
        .select("name amount message") // fields to select // No need to send entire data to app\[username]\page.js as it renders on client side
        .lean() // remove the mongoose function (retun JS objects)
    if (payments.length === 0) {
        console.log("No payments found for the user")
    }
    return payments
}

// data = info to update and oldusername = logedin user (from github auth)
export const updateProfile = async (data, oldusername) => {
    console.log("updateProfile (from lib/actions/useractions.js) is running")
    console.log("data: ", data)
    await connectDb()
    // making java object from data
    // only do it if it is not js object
    // let ndata = Object.fromEntries(data)

    // If username is being updated check if it already exist
    if (oldusername !== data.username) {
        console.log("if condition is running")
        let u = await User.findOne({ username: data.username })
        if (u) {
            console.log("nested if condition is working")
            return { error: "Username already exist" }
        }
        console.log("nested if did not work")
        // update user
        await User.updateOne({ email: data.email }, data)
        console.log("Update one has executed, dont know whether worked or not")
        //update all the entries in the Payment Schema
        // Note Payment Schema does not contain username of the donator
        await Payment.updateMany({ to_user: oldusername }, { to_user: data.username })
        console.log("Update Many has executed, dont know whether worked or not")
    }
    else {
        console.log("if condition did not run, else is running")
        //debugging: check if the user exist
        const existingUser = await User.findOne({ email: data.email });
        console.log("User found for email?", existingUser);

        //If aything other than username is being updated
        // await User.updateOne({ email: data.email }, data)
        const { _id, __v, createdAt, updatedAt, ...safeData } = data;
        const result = await User.updateOne({ email: data.email }, { $set: safeData });
        console.log("Update result:", result);
        await User.updateOne({ email: safeData.email }, { $set: safeData });

    }
}

export const makePayment = async (name, email, to_user, donation_id, amount, message) => {
    console.log("Running makePayment from useractions")
    try {
        await connectDb()
        const newPayment = new Payment({
            name: name,
            email: email,
            to_user: to_user,
            donation_id: donation_id,
            amount: amount,
            message: message,
            done: true
        })
        await newPayment.save()
        return true
    }
    catch(error) { 
        console.error("Error occured while making Paymetns\n Errror: ", error)
        return false
    }
}

export const checkPaymentID = async (email) => {
    console.log("Running checkPayment ID from useractions")
    // will check using any "One" attributte, using Email
    // why email because it remains constant
    await connectDb()
    const user = await User.findOne({email: email})
    const paymentID = user.paymentid
    if (paymentID) {
        console.log("Users payment id exist")
        return true
    }
}
