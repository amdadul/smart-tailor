import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

dotenv.config();

// Create MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Drizzle wrapper
export const db = drizzle(pool);
