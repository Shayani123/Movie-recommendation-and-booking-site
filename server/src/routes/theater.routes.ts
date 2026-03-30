import { Router } from "express";
import { addTheaters, deleteByTheaters, getAllTheaters, getTheaterById, updateTheater } from "../controllers/theater.controllers";

const router = Router();

router.post("/theater" , addTheaters);
router.get("/theater" , getAllTheaters);
router.get("/theater/:theaterId" , getTheaterById);
router.put("/theater/:theaterId", updateTheater);
router.delete("/theater/:theaterId" , deleteByTheaters);

export default router;