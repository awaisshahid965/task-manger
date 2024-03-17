import type { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import { sendServerResponse, withErrorHandler } from '../utils'
import { validateData } from '../middlewares/validation.middleware'
import { LoginRequestPayload, loginSchema } from '../schemas/auth.schema'
import AuthService from '../services/auth.service'
import { StatusCodes } from 'http-status-codes'

@controller('/auth')
class AuthController {
    constructor(private readonly authService: AuthService) {}

    @withErrorHandler
    @httpPost('/login', validateData(loginSchema))
    async login(req: Request, res: Response) {
        const { email, password } = req.body as LoginRequestPayload
        const { token } = await this.authService.verifyUserLoginAndGenerateToken(email, password)
        return sendServerResponse(res, StatusCodes.OK, {
            token,
        })
    }
}

export default AuthController
