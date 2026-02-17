import { User } from "../models/User.js";

export const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email ||  !password){
            return res.status(400).json({
                ststus: "BAD_REQUEST",
                message: "Please provide the valid fields."
            })
    } 
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({
            status: "BAD_REQUEST",
            message: "User already exists with this email."
        })
    }
    const newUser= await User.create({
        name,email,password
    });
    return res.status(200).json({
        status: "SUCCESS",
        message: "User registered successfully.",
        data: newUser,
    })

    }
    catch (error) {
        console.error("Error in registerUser", error);
        return res.status(500).json({
            status: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while registering the user.",
        });
    }
}