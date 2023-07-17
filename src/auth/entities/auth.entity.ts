export class Auth {}

export interface TokenPayload {
    userId: number
    userEmail: string
    issuer: string
}