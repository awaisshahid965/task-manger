import { Container } from 'inversify'
import { ApplicationController } from '../controllers/application.controller'

const inversifyContainer = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton',
})

inversifyContainer.bind<ApplicationController>(ApplicationController).toSelf().inSingletonScope()

export { inversifyContainer }
