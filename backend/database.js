// importing the postgres module to connect to the database 
import postgres from "postgres";
// importing the environmental variable for database connection 
import 'dotenv/config'

// Parse the DATABASE_URL to extract components
const connectionString = process.env.DATABASE_URL;

let database;

if (connectionString) {
  // Parse the connection string manually
  const url = new URL(connectionString);
  
  database = postgres({
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    database: url.pathname.split('/')[1], // Remove leading slash
    username: url.username,
    password: url.password,
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
    connect_timeout: 10,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    onnotice: () => {}, // Suppress notices
  });
} else {
  // Fallback to individual environment variables
  database = postgres({
    host: process.env.DB_URL,
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
    connect_timeout: 10,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
  });
}

export default database;