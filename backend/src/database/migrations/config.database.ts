import { ConnectionOptions } from "mysql2";

export const sqlConfig: ConnectionOptions = {
  host: process.env.DB_SERVER || "localhost",
  database: process.env.DB_NAME || "airbnb_clone_db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: parseInt(process.env.DB_PORT || "3306"),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};
