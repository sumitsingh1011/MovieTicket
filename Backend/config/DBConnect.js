
import mongoose, { connect } from "mongoose";

export const connectToDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Connect to data base"))
        await mongoose.connect(`${process.env.MONGODB_URL}/Movie-Ticket-Booking`)

    } catch (e) {
        console.log("------error----- INVALID")
        console.log(e.message)
    }
}