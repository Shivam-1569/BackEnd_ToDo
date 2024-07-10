import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

export const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.status(400).json({
            success:false,
            message: "Login First"
        })
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    req.user = await User.findById(decoded.id)
    next()
}

export const generateJwtToken = (payload)=>{
    const token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn:60*15})
    return token
}