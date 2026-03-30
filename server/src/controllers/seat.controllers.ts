import { Request , Response } from "express";
import * as SeatServices from "../services/seat.services";

// Create seat
export const addSeat = async(req:Request , res:Response) => {
    try {
        const seat = await SeatServices.createSeat(req.body);

        res.status(201).json({success: true, data:seat});
    } catch (err) {
        res.status(500).json({message: "Error creating seat" , success: false});
    }
};

//Get seats by show
export const getSeat = async(req:Request , res:Response) => {
    // try {
    //     const showId = Number(req.params.showId);
    //     const seats = await SeatServices.getSeatByShow(showId);
    //     res.status(200).json({success: true, data: seats});
    // } catch (err) {
    //     res.status(500).json({message: "Error fetching seats" , success: false});
    // }
    const seatId = String(req.params.seatId);
    const seat = await SeatServices.getSeatByShow();
    res.json(seat);
};

//Update Seat Status
export const updateSeatStatus = async(req:Request, res:Response) => {
    try {
        const seatId = Number(req.params.seatId);
        const {status} = req.body;  
        const updateSeat = await SeatServices.updateSeatStatus(seatId, status);
        res.status(200).json({success: true, data:updateSeat});
    } catch (err) {
        res.status(500).json({success:false , message: "Error updating seat status"});
    }
};

//Delete seat
export const deleteSeat = async(req:Request, res:Response) => {
    try {
        const seatId = Number(req.params.seatId);
        await SeatServices.deleteSeat(seatId);
        res.status(200).json({success: true , message: "Seat deleted successfully"});
    } catch (err) {
        res.status(500).json({success: false, message: "Error deleting seat"});
    }
};

export const getSeatByShowId = async(req:Request, res:Response) => {
    const showid = Number(req.params.showid);
    const seat = await SeatServices.getSeatByShowId(showid);
    res.json(seat);
};