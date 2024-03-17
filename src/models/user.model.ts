import { Document, Schema, model } from 'mongoose'
import { User, UserRole } from '../types/user.types'

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole),
    },
})

const UserModel = model('User', userSchema)
export type UserModelType = typeof UserModel
export default UserModel
