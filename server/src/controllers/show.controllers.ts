import { Request , Response } from "express";
import * as ShowServices from "../services/show.services";
import pool from "../config/db";

export const addShow = async(req: Request , res: Response) => {
    try {
        //create show
        const {movieId, theaterId,show_date, show_time, screen_number, total_seats, available_seats} = req.body;
        const show = await ShowServices.createShow(movieId ,theaterId, show_date, show_time, screen_number, total_seats, available_seats);

        const showId = show.showid;

        // Generate seat Dynamically 
        const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        const seatsPerRow = Math.floor(total_seats / rows.length);
        let seatCount = 0;

        for(let i=0; i<rows.length; i++) {
            for(let j=1; j<=seatsPerRow; j++) {
                if(seatCount >= total_seats) break;

                let seatType = "Silver";
                let price = 150;

                if(i>=2 && i<4) {
                    seatType = "Gold" ;
                    price = 250;
                }
                if(i>=4) {
                    seatType = "Platinum";
                    price = 400;
                }

                await pool.query(
                    `INSERT INTO seats (showId , seat_number, row, seat_type, status, price , updated_at) VALUES($1 ,$2, $3, $4, $5, $6,NOW())`,
                    [showId , `${rows[i]}${j}` , rows[i], seatType , "available", price ]
                );
                seatCount++;
            }
        }
        res.status(201).json({message :"Show and seats created Successfully" , showId});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error creating now"});
    }
};

export const updateByShow = async(req:Request, res:Response) => {
    const showId = String(req.params.showId);
    const show = await ShowServices.updateShow(showId, req.body);
    if(!show) return res.status(404).json({message: "Show not found"});
    res.json(show);
};

export const deleteShow = async(req:Request, res:Response) => {
    const showId = Number(req.params.showId);
    await ShowServices.deleteShowById(showId, req.body);
    res.json({message: "Show Deleted"});
};

export const getAllShow = async(req:Request , res:Response) => {
    
    const show = await ShowServices.getShow();
    res.json(show);
};

export const getShowById = async(req:Request, res:Response) => {
    const showid = Number(req.params.showid);
    const show = await ShowServices.getShowById(showid);
    res.json(show);
};