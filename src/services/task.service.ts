import { injectable } from 'inversify'
import TaskRepository from '../repositories/task.repository'
import { Task, TaskStatus } from '../types/task.types'

@injectable()
class TaskService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async getTaskById(id: string) {
        const task = await this.taskRepository.getTaskById(id)
        return task
    }

    async deleteTaskById(id: string) {
        const task = await this.taskRepository.deleteTaskById(id)
        return task
    }

    async createTask(title: string, description: string, userId: string) {
        const task = await this.taskRepository.createTask(title, description, userId)
        return task
    }

    async getAllTasks(userId: string, limit: string, offset: string, status?: TaskStatus) {
        const tasks = await this.taskRepository.getAllTasks(userId, limit, offset, status)
        return tasks
    }

    async updateTask(taskId: string, updatedTaskData: Partial<Task>) {
        const updatedTask = await this.taskRepository.updateTask(taskId, updatedTaskData)
        return updatedTask
    }
}

export default TaskService
