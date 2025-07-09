import dotenv from 'dotenv'

dotenv.config()

interface EnvVariables {
  PORT: string 
  DB_URI: string
  NODE_ENV: 'development' | 'production'
}

const loadEnvVariables = (): EnvVariables => {
    const requiredEnvVariables = ['PORT', 'DB_URI', 'NODE_ENV']
    requiredEnvVariables.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`)
        }
    })
    return {
        PORT: process.env.PORT as string,
        DB_URI: process.env.DB_URI as string,
        NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    }
}

export const envVariables: EnvVariables = loadEnvVariables()

