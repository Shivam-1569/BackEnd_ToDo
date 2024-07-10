import express from 'express'
import dotenv from 'dotenv'
import userRouter from './Routes/userRouter.js'
import taskRouter from './Routes/taskRouter.js'
import { DB_conn } from './Database/Db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()


app.use(cors({
    origin: process.env.FRONTEND_URL
}))
dotenv.config({
    path: './config.env'
})

DB_conn()
//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/users",userRouter)
app.use("/tasks", taskRouter)



app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on : ${process.env.PORT}`);
})
