import postgres from "postgres";

const sql = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export default sql;
