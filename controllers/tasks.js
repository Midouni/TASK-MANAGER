const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper( async(req,res,next)=>{
        const tasks = await Task.find()
        res.status(200).json({ success:true,tasks:tasks })
})

const createTask = async (req,res)=>{
    try{
        const tasks = await Task.create(req.body)
        res.status(201).json({ tasks })
    } catch(err) {
        res.status(500).json({msg:err})
    }

}

const getTask = asyncWrapper( async(req,res,next)=>{
   
        const taskId = req.params.id
        const task = await Task.findOne({_id:taskId})
        if (!task){
            return next(createCustomError(`no task with id ${taskId}`,404))
            // return res.status(404).json({msg:`no task with id ${taskId}`}) /* it need return because without return will use the secpn res */
        }
        res.status(200).json({ task })

})


const deleteTask = async(req,res)=>{
    try{
        const taskId = req.params.id
        const task = await Task.findByIdAndDelete({"_id":taskId})
        if (!task){
            return res.status(404).json({msg:`no task with id ${taskId}`})
        }
        res.status(200).json({ task })
    } catch(error){
        res.status(500).json({msg1:error})
    }
    
}

const updateTask = async(req,res)=>{
    try{
        const taskId = req.params.id
        const task = await Task.findOneAndUpdate({_id:taskId},req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).json({msg:`no task with id ${taskId}`})
        }
        res.status(200).json({ task })
    }catch(error) {
        res.status(500).json({msg:error})
    }
}
module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask}