import { Request, Response } from "express";
import * as TheaterServices from "../services/theater.services";

//Admin add theater
export const addTheaters = async(req:Request , res:Response) => {
  try {
    const data = req.body;
    console.log(data);
    const theaters = await TheaterServices.createTheater(data);
    res.status(201).json(theaters);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
 };

 //Admin update theater
 export const updateTheater = async(req: Request, res:Response) => {
   const theaterId = String(req.params.theaterId);
   const theaters = await TheaterServices.updateTheaterById(theaterId, req.body);
   if(!theaters) return res.status(404).json({message: "Theater not found"});
   res.json(theaters);
 };

 //Admin Delete Theater
 export const deleteByTheaters = async(req:Request, res:Response) => {
   const theaterId = Number(req.params.theaterId);
   await TheaterServices.deleteTheaterById(theaterId, req.body);
   res.json({message: "Theater Deleted"});
 };

 //All User see all theater 
 export const getAllTheaters = async(req:Request , res:Response) => {
    const theaters = await TheaterServices.getTheaters();
    res.json(theaters);
 };

 //User search any theater / get single theater
 export const getTheaterById = async(req:Request, res:Response) => {
   const theaterId = Number(req.params.theaterId);
   const theaters = await TheaterServices.getTheaterById(theaterId);
   if(!theaters) return res.status(404).json({message: "Movie not found"});
   res.json(theaters);
 };

