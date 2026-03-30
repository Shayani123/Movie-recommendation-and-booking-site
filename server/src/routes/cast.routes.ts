import express, {Request, Response} from "express";
import pool from "../config/db";
import multer from "multer";
import cloudinary from "../utils/cloudinary";

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.post("/casts" , upload.fields([{name: "image"}]), async(req: Request, res: Response) => {
    try {
        const {actor_name, role, image} = req.body;
        await pool.query(
            `INSERT INTO casts(actor_name, image, role) VALUES($1,$2,$3)`, [actor_name,image,role]
        );
        res.json({message: "Casts Added Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Casts upload failed"});
    }
});

router.get("/casts", async(req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM casts");
        const cast = result.rows.map(c => ({
            ...c,
            image: c.image ? `${c.image.toString("base64")}` : null,
        }));
        res.json(cast);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch cast"});
    }
});

router.post("/image" , upload.single("file"), async(req: Request, res:Response) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: "Image not upload"});
        }
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {folder: "casts/images"}
        );
        return res.status(200).json({
            message: "Image upload successfully",
            image: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.error("Database Error : ", error);
        res.status(500).json({message: "Image upload failed"});
    }
});

export default router;