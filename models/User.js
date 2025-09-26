import mongoose from "mongoose";

const {Schema, model} = mongoose

const UserSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String},
    username : {type: String, required: true},
    profilepicture : {type: String},
    coverpicture : {type: String},
    paymentid : {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

// console.log("models/User.js")
const User = mongoose.models.User || mongoose.model("User", UserSchema);
// console.log("Model compiled")
// console.log(User)
// console.log(JSON.stringify(User))
export default User;
