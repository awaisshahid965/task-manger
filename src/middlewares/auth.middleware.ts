/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express'
import authTokenManager from '../utils/auth-token-manager'
import { sendServerResponse } from '../utils'
import { StatusCodes } from 'http-status-codes'
import { UserRole } from '../types/user.types'

declare global {
    namespace Express {
        interface Request {
            id: string
            role: string
        }
    }
}

const authorizeUserAsAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization ?? ''
    const token = authorizationHeader.slice(7)
    const { isTokenValid, decodedData } = authTokenManager.validateAndDecodeToken(token)
    const { id, role } = decodedData

    if (!isTokenValid || !id || !role) {
        return sendServerResponse(res, StatusCodes.BAD_REQUEST, null, {
            message: 'invalid token!',
        })
    }
    if (decodedData.role !== UserRole.Admin) {
        return sendServerResponse(res, StatusCodes.UNAUTHORIZED, null, {
            message: 'unauthorized!',
        })
    }
    req.id = decodedData.id
    req.role = decodedData.role
    next()
}

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization ?? ''
    const token = authorizationHeader.slice(7)
    const { isTokenValid, decodedData } = authTokenManager.validateAndDecodeToken(token)
    const { id, role } = decodedData

    if (!isTokenValid || !id || !role) {
        return sendServerResponse(res, StatusCodes.BAD_REQUEST, null, {
            message: 'invalid token!',
        })
    }

    req.id = decodedData.id
    req.role = decodedData.role
    next()
}

export { authorizeUserAsAdmin, authorizeUser }
