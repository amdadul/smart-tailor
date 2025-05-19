import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
  schema: "./src/schema.js",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // Ensure port is a number
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
