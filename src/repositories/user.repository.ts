import { injectable } from 'inversify'
import UserModel, { UserModelType } from '../models/user.model'
import { UserRole } from '../types/user.types'

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

    async createUser(email: string, password: string) {
        const user = await UserModel.create({
            email: email,
            password: password,
            role: UserRole.Client,
        })
        return {
            _id: user._id,
            email,
            role: UserRole.Client,
        }
    }

    async getAllUsers() {
        const users = await this.userModel.find().lean().exec()
        return users
    }
}

export default UserRepository
