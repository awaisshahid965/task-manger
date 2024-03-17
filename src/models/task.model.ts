import { Document, Schema, model } from 'mongoose'
import { Task, TaskStatus } from '../types/task.types'

interface TaskDocument extends Task, Document {}

const TaskSchema = new Schema<TaskDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.InProgress,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const TaskModel = model('Task', TaskSchema)
export type TaskModelType = typeof TaskModel
export default TaskModel
