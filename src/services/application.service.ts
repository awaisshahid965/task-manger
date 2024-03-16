import { injectable } from 'inversify'

@injectable()
export class ApplicationService {
    indexData() {
        return 'express-ts server running...'
    }
}
