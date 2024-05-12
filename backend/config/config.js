import mongoCredentials from "../../credentials.js"
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: mongoCredentials || process.env.MONGODB_URI,
  }
  
export default config