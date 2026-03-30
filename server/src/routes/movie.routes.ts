// import { Router } from "express";
// import { createByMovie, createImage, createVideo, deleteMovie, getMovie, getMovieById, updateByMovie } from "../controllers/movie.controllers";
// import { upload } from "../middleware/movieUpload.middleware";

// const router = Router();

// //Admin
// router.post("/movies" , upload.fields([{name:"image" , maxCount:1} , {name:"video" , maxCount:1}]), createByMovie);
// router.post("/movies/image" , upload.single("file"), createImage);
// router.post("/movies/video", upload.single("file"), createVideo);
// router.put("/movies/:movieId" , updateByMovie);
// router.delete("/movies/:movieId" , deleteMovie);

// //User
// router.get("/movies" , getMovie);
// router.get("/movies/:movieId" , getMovieById);

// export default router;


import express ,{ Request, Response } from "express";
// import { upload } from "../middleware/upload.middleware";
// import pool from "../db";
import pool from "../config/db";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
// import { getByMovie } from "../controllers/movie.controller";
import { getMovieById } from "../controllers/movie.controllers";

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

//post request for Add-movie button
router.post("/movies" , upload.fields([ 
    // {name: "image", maxCount: 1},
    // {name: "video", maxCount:1},
    {name: "image"}, {name: "video"}, 
]),
async (req: Request,res: Response) => {
    try {
        const {title , description, image, video, rating,language ,genre ,runtime, release_year ,  created_at} = req.body;
        await pool.query(
            `INSERT INTO movies(title, description, image, video, rating,language, genre, runtime, release_year, created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [title, description, image, video, rating, language, genre, runtime, release_year, created_at]
        );
        res.json({message : "Movie add successfully",});
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Movie upload failed"});
    }
}
);

//get movie
router.get("/all", async(req,res) => {
    const movies = await pool.query("SELECT * FROM movies");
    res.json(movies.rows);
});

//Upload image
router.post("/image" , upload.single("file"), async(req: Request , res: Response) => {
    try {
        if(!req.file) {
            return res.status(400).json({message : "Image not Upload"});
        }

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {folder: "movies/images"}
        );

        return res.status(200).json({
            message: "Image upload successfully",
            image : result.secure_url,
            public_id: result.public_id, 
        });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({message : "Image upload failed"});
    }
});

//Upload video
router.post("/video" , upload.single("file"), async(req,res: Response) => {
    try {
        if(!req.file) return res.status(400).json({message : "Video not upload"});
    
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}` ,
            {
                resource_type: "video",
                folder : "movies/videos",
            }
        );
       
        res.json({
            message : "Video upload successfully",
            video : result.secure_url,
            public_id: result.public_id,
        });
        
    } catch (error) {
        res.status(500).json({message : "Video upload failed"});
    }
});

//get request for show Add-movies
router.get("/movies" , async(req,res) => {   
    try {
        const result = await pool.query("SELECT * FROM movies ORDER BY movieid DESC");
        const movie = result.rows.map(m => ({
            ...m,
            image: m.image ? `${m.image.toString("base64")}` : null,
            video: m.video ? `${m.video.toString("base64")}` : null,
        }));
        // res.json(result.rows);
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch movie" });
    }
});

router.get("/movies/:movieid" , getMovieById);

export default router;