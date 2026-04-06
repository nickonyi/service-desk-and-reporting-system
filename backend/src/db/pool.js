import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL_DEV,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = async (text, params = []) => {
  return pool.query(text, params);
};
