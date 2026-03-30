import {z} from "zod";
import { Request , Response , NextFunction } from "express";

const bookingSchem = z.object({
    userId: z.number(),
    showId: z.number(),
    seatId: z.array(z.number()),
});

export const validateBooking = (req:Request , res:Response, next:NextFunction) => {
    try {
        bookingSchem.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({message: "Invalid booking data"});
    }
};