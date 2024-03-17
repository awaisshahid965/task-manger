type ZodValidationError = {
    validation?: string
    code: string
    message: string
    path: Array<string>
    minimum?: number
    type?: string
    inclusive?: boolean
    exact?: boolean
}

export type ZodValidationErrors = Array<ZodValidationError>
