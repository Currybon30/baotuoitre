import mongoCredentials from "../../credentials.js"
const config = {
    env: 'development',
    port: 3000,
    jwtSecret: "YOUR_secret_key",
    mongoUri: mongoCredentials || process.env.MONGODB_URI
  }
  
export default config