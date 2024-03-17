import type { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import { sendServerResponse, withErrorHandler } from '../utils'
import { validateData } from '../middlewares/validation.middleware'
import {
    InviteRequestPayload,
    LoginRequestPayload,
    SignupRequestPayload,
    inviteSchema,
    loginSchema,
    signupSchema,
} from '../schemas/auth.schema'
import AuthService from '../services/auth.service'
import { StatusCodes } from 'http-status-codes'
import { authorizeUserAsAdmin } from '../middlewares/auth.middleware'

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

    @withErrorHandler
    @httpPost('/invite', authorizeUserAsAdmin, validateData(inviteSchema))
    invite(req: Request, res: Response) {
        const { email } = req.body as InviteRequestPayload
        const { inviteToken } = this.authService.generateInviteToken(email)

        return sendServerResponse(res, StatusCodes.OK, {
            inviteToken,
        })
    }

    @withErrorHandler
    @httpPost('/signup', validateData(signupSchema))
    async signup(req: Request, res: Response) {
        const { email, password, inviteToken } = req.body as SignupRequestPayload

        const newUser = await this.authService.signup(email, password, inviteToken)

        return sendServerResponse(res, StatusCodes.CREATED, {
            user: newUser,
        })
    }
}

export default AuthController
