import { Request, Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { ApplicationService } from '../services/application.service'

@controller('/')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @httpGet('/')
    index(_: Request, res: Response) {
        const message = this.applicationService.indexData()
        res.send(message)
    }
}
