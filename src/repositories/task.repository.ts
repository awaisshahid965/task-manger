import { injectable } from 'inversify'
import TaskModel, { TaskModelType } from '../models/task.model'
import { Task, TaskStatus } from '../types/task.types'

@injectable()
class TaskRepository {
    private taskModel: TaskModelType
    constructor() {
        this.taskModel = TaskModel
    }

    async getTaskById(id: string) {
        const task = await this.taskModel.findById(id).select('-__v').lean().exec()
        return task
    }

    async deleteTaskById(id: string) {
        const task = await this.taskModel.findByIdAndDelete(id).exec()
        return task
    }

    async createTask(title: string, description: string, userId: string) {
        const task = await this.taskModel.create({ title, description, user: userId })
        return {
            _id: task._id,
            status: task.status,
            title,
            description,
            userId,
        }
    }

    async getAllTasks(userId: string, limit: string, offset: string, status?: TaskStatus) {
        const tasks = await this.taskModel
            .find({
                user: userId,
                ...(status && { status }),
            })
            .skip(Number(offset))
            .limit(Number(limit))
            .lean()
            .exec()

        return tasks
    }

    async updateTask(taskId: string, updatedTaskData: Partial<Task>) {
        const task = await this.taskModel.findById(taskId)
        if (!task) {
            return null
        }

        if (updatedTaskData.title) {
            task.title = updatedTaskData.title
        }
        if (updatedTaskData.description) {
            task.description = updatedTaskData.description
        }
        if (updatedTaskData.status) {
            task.status = updatedTaskData.status
        }

        await task.save()
        return task
    }

    async getTasksByUserId(userId: string) {
        const tasks = await this.taskModel.find({ user: userId }).lean().exec()
        return tasks
    }
}

export default TaskRepository
