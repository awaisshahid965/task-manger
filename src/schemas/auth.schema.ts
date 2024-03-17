import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const inviteSchema = z.object({
    email: z.string().email(),
})

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    inviteToken: z.string(),
})

export type LoginRequestPayload = z.infer<typeof loginSchema>
export type InviteRequestPayload = z.infer<typeof inviteSchema>
export type SignupRequestPayload = z.infer<typeof signupSchema>
