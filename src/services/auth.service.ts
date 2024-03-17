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

        const token = authTokenManager.generateSignedToken(
            {
                id: user._id,
                role: user.role,
            },
            '6h',
        )

        return {
            token,
        }
    }

    generateInviteToken(email: string) {
        const inviteToken = authTokenManager.generateSignedToken({
            email,
        })

        return {
            inviteToken,
        }
    }

    async signup(email: string, password: string, inviteToken: string) {
        const { isTokenValid, decodedData } = authTokenManager.validateAndDecodeToken(inviteToken)
        if (!isTokenValid) {
            throw new ApiError('invalid token!', StatusCodes.BAD_REQUEST)
        }
        if (decodedData.email !== email) {
            throw new ApiError('invite email did not matched the payload email', StatusCodes.BAD_REQUEST)
        }

        const user = await this.userRepository.getUserByEmail(email)
        if (user) {
            throw new ApiError('User already exists!', StatusCodes.CONFLICT)
        }

        const encryptedPassword = cipherUtils.encrypt(password)
        const newUser = await this.userRepository.createUser(email, encryptedPassword)

        return newUser
    }
}

export default AuthService
