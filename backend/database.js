// importing the postgres module to connect to the database 
import postgres from "postgres";
// importing the environmental variable for database connection 
import 'dotenv/config'

// Option 1: Use DATABASE_URL (Recommended for Render)
const database = process.env.DATABASE_URL 
  ? postgres(process.env.DATABASE_URL, {
      ssl: process.env.NODE_ENV === 'production' ? 'require' : false
    })
  : postgres({
      host: process.env.DB_URL,
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.NODE_ENV === 'production' ? 'require' : false
    });

export default database;