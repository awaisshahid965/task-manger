interface IError {
    statusCode: number
    message: string
}

class ApiError extends Error implements IError {
    public readonly statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)

        this.statusCode = statusCode

        Error.captureStackTrace(this)
    }
}

export default ApiError
