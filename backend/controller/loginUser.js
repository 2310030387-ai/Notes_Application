import { User} from "../models/User.js";

export const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;
        if(!email ||  !password){
            return res.status(400).json({
                status: "BAD_REQUEST",
                message: "Please provide email and password."
            });
        }
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({
                status: "NOT_FOUND",
                message: "Invaild credentials."
            })
        }

        const storedPassword = existingUser.password;
        if(storedPassword !== password){
            return res.status(404).json({
                status: "NOT_FOUND",
                message: "Invaild credentials."
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: "Logged in successfully.",
            data: existingUser,
        })
    }catch (error) {
        console.error("Error in loginUser", error);
        return res.status(500).json({
            status: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while logging in the user.",
        })
    }
}