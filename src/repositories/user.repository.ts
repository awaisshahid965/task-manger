import { injectable } from 'inversify'
import UserModel, { UserModelType } from '../models/user.model'

@injectable()
class UserRepository {
    private userModel: UserModelType
    constructor() {
        this.userModel = UserModel
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email }).lean()
        return user
    }
}

export default UserRepository
