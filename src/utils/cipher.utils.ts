import crypto from 'crypto'

class Cipher {
    private readonly secretKey: string
    private readonly algorithm: string

    constructor(secretKey: string) {
        this.secretKey = secretKey
        this.algorithm = 'aes-256-cbc'
    }

    encrypt(data: string): string {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), iv)
        let encrypted = cipher.update(data, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        return iv.toString('hex') + ':' + encrypted
    }

    decrypt(data: string): string {
        const parts = data.split(':')
        const iv = Buffer.from(parts.shift() as string, 'hex')
        const encryptedText = Buffer.from(parts.join(':'), 'hex')
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), iv)
        let decrypted = decipher.update(encryptedText.toString('hex'), 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }

    compare(plaintext: string, encryptedData: string): boolean {
        const decryptedData = this.decrypt(encryptedData)
        return decryptedData === plaintext
    }
}

export default new Cipher(process.env.AES_SECRET_KEY!)
