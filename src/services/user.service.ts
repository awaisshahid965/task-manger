import { injectable } from 'inversify'
import UserRepository from '../repositories/user.repository'

@injectable()
class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getAllUsers() {
        const users = await this.userRepository.getAllUsers()
        return users
    }
}

export default UserService
