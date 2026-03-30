import { Router } from "express";
import { likeMovie, unlikeMovie } from "../controllers/like.controllers";

const router = Router();

router.post("/like" , likeMovie);
router.delete("/like" , unlikeMovie);

export default router;