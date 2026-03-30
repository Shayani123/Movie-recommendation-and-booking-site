import { Request , Response } from "express";
import * as MovieSevice from "../services/movie.services";
import { upload } from "../middleware/movieUpload.middleware";
import cloudinary from "../utils/cloudinary";
import multer from "multer";

//Admin create movie
export const createByMovie = async(req:Request, res:Response) => {
    try {
        const movie = await MovieSevice.createMovie(req.body);
        // console.log(movie);
        // const userId : req.user.userId;  
        // const uploads = upload.fields([
        //     {name: "image" , maxCount:1},
        //     {name: "video" , maxCount:1}
        // ]);
        res.status(201).json({message: "Movie Add Successfully" ,
            data: movie 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Movie upload failed"});
    }
};

//Admin upload image 
export const createImage = async(req:Request , res:Response) => {
    // const uploads = upload.single("file");
    try {
        if(!req.file) return res.status(400).json({message: "Image not upload"});
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {folder: "movies/images"}
        );
        res.json({
            message : "Image upload successfully",
            imageurl : result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        res.status(500).json({message: "Failed upload image"});
    }
};

//Admin upload video
export const createVideo = async(req:Request, res:Response) => {
    try {
        if(!req.file) return res.status(400).json({message : "Video not upload"});
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {folder: "movies/videos"}
        );
        res.json({
            message: "Video upload successfully",
            videourl: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        res.status(500).json({message: "Failed upload video"});
    }
};
//Admin update movie 
export const updateByMovie = async(req:Request , res:Response ) => {
    const movieId = Number(req.params.movieId);
    const movie = await MovieSevice.updateMovieById(movieId, req.body);
    if(!movie) return res.status(404).json({message: "Movie not found"});
    res.json(movie);
};

//Admin Delete movie
export const deleteMovie = async(req:Request , res:Response) => {
    const movieId = Number(req.params.movieId);
    await MovieSevice.deleteMovieById(movieId, req.body);
    res.json({message: "Movie Deleted"});
};

//All User see all movie
export const getMovie = async(req:Request, res:Response) => {
    try {
        const result = await MovieSevice.getAllMovie(); 
        console.log("Result :",result);
        if(result.length === 0) {
            return res.status(404).json({message: "No movies found"});
        }
        const movie = result.map((m: any)=> ({
            ...m,
            // image: m.image ? `${m.image.toString("base64")}` : null,
            // video: m.video ? `${m.video.toString("base64")}` : null,
            image: m.image,
            video: m.video

        }));
        console.log("Movie Data : ", movie);
        res.json(movie);
        
    } catch (error) {
        console.error("GET MOVIE ERROR: ", error);
        res.status(500).json({message: "Failed to fetch movies"});
    }
};

//All user search any movie / get Single movie
export const getMovieById = async(req:Request, res:Response) => {
    const movieid = Number(req.params.movieid);
    const movie = await MovieSevice.getMovieById(movieid);
    if(!movie) return res.status(404).json({message : "Movie not found"});
    res.json(movie);
};
