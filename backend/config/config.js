import dotenv from 'dotenv'
dotenv.config()
const config = {
    env: 'development',
    port: 8000,
    jwtSecret: "YOUR_secret_key",
    mongoUri: 'mongodb://localhost:27017/QC', // process.env.MONGODB_URI
  }
  
export default config
