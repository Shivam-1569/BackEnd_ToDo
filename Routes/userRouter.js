import express from 'express'
import {LoginUser, RegisterUser, GetMyProfile, LogOut} from '../Controllers/User.controllers.js'
import { isAuthenticated } from '../utils/jwt.js'

const userRouter = express.Router()

userRouter.post('/register',RegisterUser)
userRouter.post('/login', LoginUser)
userRouter.get('/me',isAuthenticated, GetMyProfile)
userRouter.get('/logout',isAuthenticated, LogOut)


export default userRouter