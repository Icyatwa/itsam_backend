// importing the postgres module to connect to the database 
import postgres from "postgres";
// importing the environmental variable for database connection 
import 'dotenv/config'

// getting the environmental variables 
const database_host = process.env.DB_URL
const database_port = process.env.DB_PORT
const database_name = process.env.DB_NAME
const database_user = process.env.DB_USER
const database_pass = process.env.DB_PASSWORD

// postgres oprions to use in connection 
const PGOPTIONS = {
    'host':database_host,
    'port':database_port,
    'database':database_name,
    'user':database_user,
    'password':database_pass
}

// connecting to the online database 
const database = postgres('postgresql://postgres:KgZWfeGUzzrGspZdDiGPqqDCzXubERCf@viaduct.proxy.rlwy.net:41501/railway',PGOPTIONS)

export default database