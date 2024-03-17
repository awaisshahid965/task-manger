import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

class AuthTokenManager {
    generateSignedToken<T extends object>(data: T, expiresIn: string = '1h') {
        return jwt.sign(data, JWT_SECRET, {
            expiresIn,
        })
    }

    validateAndDecodeToken(token: string) {
        if (!token) {
            throw new Error()
        }

        try {
            const decodedData = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
            const currentTime = Math.floor(Date.now() / 1000)
            const isTokenExpired = decodedData.exp! <= currentTime

            if (isTokenExpired) {
                throw new Error()
            }

            return {
                isTokenValid: true,
                decodedData,
            }
        } catch (_) {
            return {
                isTokenValid: false,
                decodedData: {},
            }
        }
    }
}

export default new AuthTokenManager()
