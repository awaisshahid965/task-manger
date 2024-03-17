import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { sendServerResponse } from '../utils'
import { ZodValidationErrors } from '../types/error.types'

const generateErrorObjectFromZodErrors = (errors: ZodValidationErrors) => {
    const errorObject: Record<string, string> = {}
    errors.forEach((error) => {
        errorObject[error.path[0]] = error.message
    })
    return errorObject
}

export function validateData(schema: z.Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = generateErrorObjectFromZodErrors(error.errors as ZodValidationErrors)
                sendServerResponse(res, StatusCodes.BAD_REQUEST, null, errors)
            } else {
                sendServerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, { error: 'Internal Server Error' })
            }
        }
    }
}
