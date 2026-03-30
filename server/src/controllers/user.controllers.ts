import { Request, Response } from "express";
import * as UserService from "../services/user.services";
import bcrypt from "bcryptjs";
import pool from "../config/db";
import jwt from "jsonwebtoken";

//User register
export const registerUser = async(req:Request , res:Response) => {
    try {
       const { email, password} = req.body;
       if( !email || !password ) return res.status(400).json({message: "All fields are required"});

       //check user existing
       const existingUser = await UserService.getUserByEmail(email);
       if(existingUser) {
        return res.status(409).json({message: "User already exists"});
       }

       //create user
       const user = await UserService.createUser(email,password);
       return res.status(201).json({message: "User registered Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
};

//User login
export const loginUser = async(req:Request, res:Response) => {
    try {
        
        const {email , password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }

        const user = await UserService.getUserByEmail(email);
        if(!user ) {
            return res.status(404).json({message: "User not found"});
        }

        //check password 
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(401).json({message: "Password incorrect"});

        //generate token 
        const token = jwt.sign(
            {id: user.userId }, process.env.JWT_SECRET! , {expiresIn: "1d"}
        );
        res.json({
            message: "Login Successfully",
            token,
            user: {
                id: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
};

//User Profile
export const getProfile = async(req: any ,res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(req.headers);
        if(!authHeader) return res.status(401).json({message: "No token provided"});

        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const result = await pool.query(
            "SELECT userId, name, email, role FROM users WHERE userId=$1",
            [decoded.userId]
        );
        const user = result.rows[0];
        if(!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(401).json({message: "Invalid Token"});
    }
};

//User logout
export const logoutUser = async(req:Request, res:Response) => {
    const {refreshToken} = req.body;
    await pool.query("DELETE FROM refresh_tokens WHERE token=$1" , [refreshToken]);
    res.json({message:"Logout Successfully"});
};