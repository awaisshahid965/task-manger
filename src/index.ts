import 'reflect-metadata'
import http from 'http'
import { setupExpressServer } from './adapters/express'

const PORT = process.env.PORT ?? 4000
const expressApp = setupExpressServer()

const httpServer = http.createServer(expressApp)

httpServer.listen(PORT, () => {
    console.log(`Server listening at Port: ${PORT}`)
})
