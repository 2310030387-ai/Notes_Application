import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://2310030387:2310030387@cluster0.btrxytd.mongodb.net/notesapp')
            console.log("MongoDB connected")
        }catch (error) {
            console.error("Error in connecting mongodb", error)
        }
}
