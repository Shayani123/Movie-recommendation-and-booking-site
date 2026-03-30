import { Router } from "express";
import {  deleteSeat, getSeat, getSeatByShowId, updateSeatStatus } from "../controllers/seat.controllers";

const router = Router();

// router.post("/seat/add" , addSeat);
router.get("/seat" , getSeat);
router.get("/seat/:showid", getSeatByShowId);
router.put("/seat/:seatId" , updateSeatStatus);
router.delete("/seat/:seatId", deleteSeat);

export default router;