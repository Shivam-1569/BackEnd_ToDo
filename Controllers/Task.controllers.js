import { Tasks } from "../models/task.models.js"

export const newTask = async(req,res)=>{
    try{
        const {title, description} = req.body

        await Tasks.create({title, description, user: req.user})

        res.status(200).json({
            success: true,
            message: "Task Added"
        })
    }catch(e){
        console.log(`Error Occured: ${e}`);
    }

}

export const getAllTasks = async(req,res)=>{
    try{
        const allTasks = await Tasks.find({user: req.user._id})
        res.status(200).json({
        success: true,
        task: allTasks

        
    })

    }catch(e){
        console.log(`Error Occured: ${e}`);
    }
    

}

export const updateTask = async(req,res)=>{
    try{
        const taskId = req.params.id
        const task = await Tasks.findById(taskId)
        if(!task){
            res.status(400).json({
                success: false,
                message: "task not found"
        })
    }
    task.isCompleted = !task.isCompleted
    await task.save()
    res.status(200).json({
        success: true,
        message: "task updated",
        task: task
    })
    
    }catch(e){
        console.log(`Error Occured: ${e}`);
    }
    
}

export const deleteTask = async(req,res)=>{
    try{
        const taskId = req.params.id
        const task = await Tasks.findById(taskId)
        if(!task){
            res.status(400).json({
                success: false,
                message: "task not found"
            })
        }
        await task.deleteOne()
        
        res.status(200).json({
            success: true,
            message: "Deleted the task"
        })
    }catch(e){
        console.log(`Error Occured: ${e}`);
    }
}