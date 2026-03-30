import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.DATABASE_NAME) {
    throw new Error("Database name not found in .env");
}

const pool = new Pool({
    // connectionString: process.env.DATABASE_NAME,
    // ssl: {
    //     rejectUnauthorized: false, // required for neon / cloud DB
    // },
    // max: 10, // optional
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),


});

pool.on("connect" , () => {
    console.log("Database Connected");
});

pool.on("error", (err) => {
    console.error("Unexpected DB error" , err);
    process.exit(1);
});

export default pool;