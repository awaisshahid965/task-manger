import mongoose from 'mongoose'

export enum TaskStatus {
    InProgress = 'InProgress',
    Completed = 'Completed',
}

export interface Task {
    title: string
    description: string
    status: TaskStatus
    user: mongoose.Types.ObjectId
}
