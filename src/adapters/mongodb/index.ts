import mongoose from 'mongoose'

export const setupMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('connected to mongoodb!')
    } catch (error) {
        console.log('failed to connect to database', error)
        throw new Error()
    }
}
