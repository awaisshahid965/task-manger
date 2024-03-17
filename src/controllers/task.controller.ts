import type { Request, Response } from 'express'
import { controller, httpDelete, httpGet, httpPatch, httpPost } from 'inversify-express-utils'
import TaskService from '../services/task.service'
import { sendServerResponse, withErrorHandler } from '../utils'
import {
    AllTasksPayload,
    CreateTaskPayload,
    UpdateTaskPayload,
    allTasksSchema,
    createTaskSchema,
    updateTaskSchema,
} from '../schemas/task.schema'
import { StatusCodes } from 'http-status-codes'
import { authorizeUser } from '../middlewares/auth.middleware'
import { validateData } from '../middlewares/validation.middleware'
import ApiError from '../utils/error'
import { TaskStatus } from '../types/task.types'

@controller('/api/task')
class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @withErrorHandler
    @httpGet('/all', authorizeUser, validateData(allTasksSchema))
    async getAllTasks(req: Request, res: Response) {
        const { offset = '0', limit = '10', status } = req.query as AllTasksPayload
        const userId = req.id
        const tasks = await this.taskService.getAllTasks(userId, limit, offset, status)

        if (status !== undefined && !Object.values(TaskStatus).includes(status)) {
            throw new ApiError('Invalid status value', StatusCodes.BAD_REQUEST)
        }

        return sendServerResponse(res, StatusCodes.OK, {
            tasks,
        })
    }

    @withErrorHandler
    @httpGet('/:id', authorizeUser)
    async getTaskById(req: Request, res: Response) {
        const taskId = req.params.id
        const task = await this.taskService.getTaskById(taskId)
        if (!task) {
            throw new ApiError('task not found!', StatusCodes.NOT_FOUND)
        }

        return sendServerResponse(res, StatusCodes.OK, {
            task,
        })
    }

    @withErrorHandler
    @httpDelete('/:id', authorizeUser)
    async deleteTaskById(req: Request, res: Response) {
        const taskId = req.params.id
        const task = await this.taskService.deleteTaskById(taskId)
        if (!task) {
            throw new ApiError('task not found!', StatusCodes.NOT_FOUND)
        }

        return sendServerResponse(res, StatusCodes.OK, {
            task,
        })
    }

    @withErrorHandler
    @httpPost('/', authorizeUser, validateData(createTaskSchema))
    async createTask(req: Request, res: Response) {
        const { title, description } = req.body as CreateTaskPayload
        const userId = req.id
        const task = await this.taskService.createTask(title, description, userId)

        return sendServerResponse(res, StatusCodes.CREATED, {
            task,
        })
    }

    @withErrorHandler
    @httpPatch('/:id', authorizeUser, validateData(updateTaskSchema))
    async updateTask(req: Request, res: Response) {
        const taskId = req.params.id
        const updatedTaskPayload = req.body as UpdateTaskPayload

        const task = await this.taskService.updateTask(taskId, updatedTaskPayload)

        if (!task) {
            throw new ApiError('task not found!', StatusCodes.NOT_FOUND)
        }

        return sendServerResponse(res, StatusCodes.OK, {
            task,
        })
    }
}

export default TaskController
