import mongoose from "mongoose";
const {Schema, model} = mongoose

const PaymentSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String},
    to_user: {type: String, required: true},
    donation_id: {type: String, required: true},
    amount: {type: Number, required: true},
    message: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    done: {type: Boolean, default: false}
})

const Payment = mongoose.models.Payment || model("Payment", PaymentSchema);
export default Payment