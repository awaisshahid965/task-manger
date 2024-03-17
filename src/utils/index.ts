import { NextFunction, Request, Response } from 'express'
import ApiError from './error'
import { StatusCodes } from 'http-status-codes'

export function withErrorHandler(_: unknown, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        try {
            await originalMethod.call(this, req, res, next)
        } catch (error) {
            if (error instanceof ApiError) {
                const apiError = error as ApiError
                return sendServerResponse(res, apiError.statusCode, null, {
                    message: apiError.message,
                })
            }
            return sendServerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, {
                message: 'Internal Server Error',
            })
        }
    }
}

export function sendServerResponse<T>(
    responseInstance: Response,
    status: number,
    data: T,
    errors: Record<string, string> = {},
) {
    if (Object.values(errors).length) {
        const errorResponseData = {
            data: null,
            errors,
        }
        return responseInstance.status(status ?? 500).json(errorResponseData)
    }
    const successResponseData = {
        data,
        errors: null,
    }
    return responseInstance.status(status ?? 200).json(successResponseData)
}
