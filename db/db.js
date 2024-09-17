import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "desafios",
  password: "123456789",
  database: "likeme",
  port: 5432,
  allowExitOnIdle: true,
});

export { pool };
