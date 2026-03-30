import { Router } from "express";
import { addShow, deleteShow, getAllShow, getShowById, updateByShow } from "../controllers/show.controllers";

const router = Router();

router.post("/show" , addShow);
router.get("/show" , getAllShow);
router.get("/show/:showid", getShowById);
router.put("/show/:showId" , updateByShow);
router.delete("/show/:showId" , deleteShow);

export default router;