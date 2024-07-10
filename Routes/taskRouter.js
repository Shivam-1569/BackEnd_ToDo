import express from 'express'
import { isAuthenticated } from '../utils/jwt.js'
import { newTask, getAllTasks, updateTask, deleteTask } from '../Controllers/Task.controllers.js'
const router = express.Router()

router.post('/new',isAuthenticated, newTask)
router.get('/all',isAuthenticated, getAllTasks)
router.route('/:id')
.put(isAuthenticated, updateTask)
.delete(isAuthenticated, deleteTask)

export default router