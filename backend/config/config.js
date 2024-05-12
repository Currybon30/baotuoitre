import mongoCredentials from "../../credentials.js"
const config = {
    env: 'development',
    port: process.env.PORT || 5000,
    jwtSecret: "YOUR_secret_key",
    mongoUri: mongoCredentials
  }
  
export default config
