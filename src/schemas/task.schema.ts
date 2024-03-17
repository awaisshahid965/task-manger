import { z } from 'zod'
import { TaskStatus } from '../types/task.types'

export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
})

export const allTasksSchema = z.object({
    offset: z.string().optional(),
    limit: z.string().optional(),
    status: z.nativeEnum(TaskStatus).optional(),
})

export type CreateTaskPayload = z.infer<typeof createTaskSchema>
export type AllTasksPayload = z.infer<typeof allTasksSchema>
