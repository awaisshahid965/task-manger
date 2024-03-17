import type { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import { withErrorHandler } from '../utils'
import { validateData } from '../middlewares/validation.middleware'
import { loginSchema } from '../schemas/auth.schema'

@controller('/auth')
class AuthController {
    @withErrorHandler
    @httpPost('/login', validateData(loginSchema))
    login(req: Request, res: Response) {
        console.log(req.body)
        res.end()
    }
}

export default AuthController
