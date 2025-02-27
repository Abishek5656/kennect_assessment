import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
           
            return res.status(401).json({
                message:"Unauthorized request",
                data:"",
                success: false
            })
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)

        const user = await User.findById(decodedToken?.userId).select("-password")
    
        if (!user) {
        
            return res.status(401).json({
                message:"Invalid Access Token",
                data:"",
                success: false
            })
        }
    
        req.admin = user;
        next()
    } catch (error) {
        return res.status(401).json({
            message:error?.message || "Invalid access token",
            data:"",
            success: false
        })
    }
    
}