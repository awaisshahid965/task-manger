// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import mongoose from 'mongoose'
import { UserRole } from '../types/user.types'
import UserModel from '../models/user.model'
import Cipher from '../utils/cipher.utils'

async function seedAdminUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('connected to db successfully!')

        const admin = await UserModel.findOne({ role: UserRole.Admin })
        if (!admin) {
            const encryptedPassword = Cipher.encrypt('adminpassword')
            const adminUser = await UserModel.create({
                email: 'admin@example.com',
                password: encryptedPassword,
                role: UserRole.Admin,
            })
            console.log('Admin user created...', adminUser)
        } else {
            console.warn('Admin User already exists, existing...')
        }
    } catch (error) {
        console.error('Failed to seed Admin User...')
        console.error(error)
    } finally {
        await mongoose.disconnect()
    }
}

seedAdminUser()
