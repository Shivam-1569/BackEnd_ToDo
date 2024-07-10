import {User} from '../models/user.models.js'
import bcrypt from 'bcrypt'
import { generateJwtToken, isAuthenticated } from '../utils/jwt.js';
import cookieParser from 'cookie-parser';

export const RegisterUser = async(req, res)=>{
    const {name, email, password} = req.body;


 let user = await User.findOne({email})
    if(user){
        return res.status(404).json({
            success: false,
            message: "User Already Present"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
   
      user = await User.create(
        {
            name,
            email,
            password: hashedPassword
        }
    )
    const payload = {
        id: user.id,
        name: user.name,
    }
    const token = generateJwtToken(payload)
    
    res.status(200).cookie("token", token, { maxAge: 900000, httpOnly: true }).json({
        success: true,
        message: "User Created"
    })

    
}



export const LoginUser = async(req, res) =>{
    const { email, password } = req.body
    let user = await User.findOne({email}).select("+password")
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user Not found"
        })
    }

    const isCorrect = await bcrypt.compare(password, user.password)

    if(isCorrect===false) {
        return res.status(404).json({
            success: false,
            message: "password is incorrect"
        })
    }

    const payload = {
        id: user.id,
        name: user.name,
    }
    const token = generateJwtToken(payload)

    return res.status(200).cookie("token", token, { maxAge: 900000, httpOnly: true }).json({
        success: true,
        message: "Logged In"
    })
}

export const GetMyProfile = (req, res) =>{
    
    res.status(200).json({
        success:true,
        user: req.user
    })
}

export const LogOut = (req, res) =>{
    
    res.status(200).cookie("token","",{expires: new Date(Date.now())}).json({
        success:true,
        user: req.user
    })

}

