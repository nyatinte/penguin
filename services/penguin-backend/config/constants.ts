import dotenv from 'dotenv'

dotenv.config()

export const APOLLO_SERVER_PORT = process.env.APOLLO_SERVER_PORT ?? 4000
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN ?? ''
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE ?? ''
