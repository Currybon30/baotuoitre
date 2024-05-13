import mongoCredentials from "../../credentials.js"
const config = {
    env: 'development',
    port: 8000,
    jwtSecret: "YOUR_secret_key",
    mongoUri: mongoCredentials
  }
  
export default config
