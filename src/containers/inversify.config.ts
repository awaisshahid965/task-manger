import { Container } from 'inversify'
import { ApplicationController } from '../controllers/application.controller'
import AuthController from '../controllers/auth.controller'
import TaskController from '../controllers/task.controller'

const inversifyContainer = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton',
})

inversifyContainer.bind<ApplicationController>(ApplicationController).toSelf().inSingletonScope()
inversifyContainer.bind<AuthController>(AuthController).toSelf().inSingletonScope()
inversifyContainer.bind<TaskController>(TaskController).toSelf().inSingletonScope()

export { inversifyContainer }
