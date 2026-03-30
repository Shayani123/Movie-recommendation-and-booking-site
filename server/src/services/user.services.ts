import pool from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async(
   
    email: string,
    password: string,
) => {
    const hashPassword = await bcrypt.hash(password,8);
    const result = await pool.query(
        "INSERT INTO users( email , password ) VALUES($1,$2) RETURNING *",
        [email, hashPassword]
    );
    return result.rows[0];
};  

export const getUser = async(email:string) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );
    return result.rows[0];
};

export const getUserById = async(userId: number) => {
    const result = await pool.query(
        "SELECT id,name,email FROM users WHERE userId=$1",
        [userId]
    );
    return result.rows[0];
};

export const getUserByEmail = async(email: string) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );
    return result.rows[0];
};