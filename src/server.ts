import {Server} from 'http'
import mongoose from 'mongoose'
import app from './app'
import { envVariables } from './app/config/env'


let server:Server 


const serverStart=async()=>{
  try {
    await mongoose.connect(envVariables.DB_URI)

    console.log('Database connected successfully')
    server=app.listen(envVariables.PORT,()=>{
      console.log(`Server is running on port ${envVariables.PORT}`)
    })

} catch (error) {
    console.log(error)
  }
}

process.on('unhandledRejection',(error)=>{
  console.log('Unhandled promise rejection:', error)
  if(server) {
    server.close(() => {
      console.log('Server closed due to unhandled promise rejection')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})

process.on('uncaughtException',(error)=>{
  console.log('Unhandled exception:', error)
  if(server) {
    server.close(() => {
      console.log('Server closed due to unhandled exception')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})
process.on('SIGTERM',()=>{
  console.log('SIGTERM received')
  if(server) {
    server.close(() => {
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})
process.on('SIGINT',()=>{
  console.log('SIGINT received...server shutting down....')
  if(server) {
    server.close(() => {
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})

serverStart();