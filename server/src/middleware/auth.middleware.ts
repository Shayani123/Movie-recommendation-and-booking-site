import jwt from "jsonwebtoken";
import { Request, Response , NextFunction } from "express";

interface JwtPayload {
    userId: string,
    email: string,
    role: string,
}

export const auth = (req:Request , res:Response, next:NextFunction ) => {
    
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET! 
        ) as JwtPayload;

        req.body.user = decoded; //attach user data
        next();

    } catch (err) {
        res.status(403).json({message: "Invalid Token"});
    }
};