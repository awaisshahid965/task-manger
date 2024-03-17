import { injectable } from 'inversify'
import UserRepository from '../repositories/user.repository'
import ApiError from '../utils/error'
import { StatusCodes } from 'http-status-codes'
import cipherUtils from '../utils/cipher.utils'
import authTokenManager from '../utils/auth-token-manager'

@injectable()
class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async verifyUserLoginAndGenerateToken(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) {
            throw new ApiError('User Not Found!', StatusCodes.NOT_FOUND)
        }

        const isPasswordValid = cipherUtils.compare(password, user.password)
        if (!isPasswordValid) {
            throw new ApiError('Invalid user password!', StatusCodes.UNAUTHORIZED)
        }

        const token = authTokenManager.generateSignedToken({
            id: user._id,
            role: user.role,
        })

        return {
            token,
        }
    }
}

export default AuthService
