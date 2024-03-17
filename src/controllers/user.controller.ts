import type { Request, Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { sendServerResponse, withErrorHandler } from '../utils'
import { StatusCodes } from 'http-status-codes'
import { authorizeUserAsAdmin } from '../middlewares/auth.middleware'
import UserService from '../services/user.service'

@controller('/api/user')
class UserController {
    constructor(private readonly userService: UserService) {}

    @withErrorHandler
    @httpGet('/all', authorizeUserAsAdmin)
    async getAllUsers(_: Request, res: Response) {
        const users = await this.userService.getAllUsers()

        return sendServerResponse(res, StatusCodes.OK, {
            users,
        })
    }
}

export default UserController
