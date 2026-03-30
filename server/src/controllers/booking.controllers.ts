import { Request , Response } from "express";
import * as BookingServices from "../services/booking.services";

//Create Booking
 export const createBooking = async(req:Request, res:Response) => {
    try {
        const {email, phone, showid,seatid, total_price} = req.body;
        const booking = await BookingServices.createBooking(email, phone, showid, seatid,total_price);

        res.status(201).json({success: true, data:booking});

    } catch (error: any) {
        res.status(400).json({success:false, message: error.message});
    }
 };

 //Get booking details
 export const getBooking = async(req: Request, res:Response) => {
    try {
        const bookingid = Number(req.params.bookingid);
        const booking = await BookingServices.getBookingById(bookingid);
        res.status(200).json({success: true, data: booking});
    } catch (error) {
        res.status(500).json({success: false , message: "Error fetching booking"});
    }
 };

 //Get user booking
 export const getUserBooking = async(req:Request, res:Response) => {
    try {
        const bookingid = Number(req.params.bookingid);
        const booking = await BookingServices.getBookingById(bookingid);
        res.status(200).json({success:true , data:booking});
    } catch (error) {
        res.status(400).json({success: false, message: "Error fetching Booking"});
    }
 };

 //Cancle Booking
 export const cancleBooking = async(req:Request, res:Response) => {
    try {
        const bookingId = Number(req.params.bookingId);
        const result = await BookingServices.cancleBooking(bookingId);

        res.status(200).json({success:true, message: result.message});
    } catch (error:any) {
        res.status(400).json({success:false, message: error.message});
    }
 };