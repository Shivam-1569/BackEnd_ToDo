import mongoose from "mongoose";

export const DB_conn = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI,{
        dbName: "TodoList",
    })
console.log("database Connected");
}
    catch(e){
        console.log("error occured in database connection:", e);
    }
    
}

