// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import 'reflect-metadata'
import http from 'http'
import { setupExpressServer } from './adapters/express'
import { setupMongoDB } from './adapters/mongodb'

const PORT = process.env.PORT ?? 4000
const expressApp = setupExpressServer()

const httpServer = http.createServer(expressApp)

const initServer = async () => {
    try {
        await setupMongoDB()

        httpServer.listen(PORT, () => {
            console.log(`Server listening at Port: ${PORT}`)
        })
    } catch (_) {
        process.exit(1)
    }
}

initServer()
