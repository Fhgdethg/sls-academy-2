import pg from "pg";

const DB_USER = `${process.env.DB_USER}`;
const DB_PASSWORD = `${process.env.DB_PASSWORD}`;
const DB_HOST = `${process.env.DB_HOST}`;
const DB_PORT = Number(`${process.env.DB_PORT}`);
const DB_NAME = `${process.env.DB_NAME}`;

const db = new pg.Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});
export default db;
