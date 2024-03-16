import { InversifyExpressServer } from 'inversify-express-utils'
import { inversifyContainer } from '../../containers/inversify.config'
import express from 'express'
import type { Application } from 'express'

export const setupExpressServer = (): Application => {
    const expressServer = new InversifyExpressServer(inversifyContainer)

    // adding middlewares
    expressServer.setConfig((app) => {
        app.use(express.json())
    })

    const expressApp = expressServer.build()
    return expressApp
}
