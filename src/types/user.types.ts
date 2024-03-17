export enum UserRole {
    Admin = 'Admin',
    Client = 'Client',
}

export interface User {
    email: string
    password: string
    role: UserRole
}
