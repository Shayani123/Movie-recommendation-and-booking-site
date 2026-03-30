import express from "express";
import pool from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
    // import { allowedNodeEnvironmentFlags } from "node:process";
    // import { timeStamp } from "node:console";
import authRoutes from "./routes/user.routes";
import movieRoutes from "./routes/movie.routes";
import likeRoutes from "./routes/like.routes";
import showRoutes from "./routes/show.routes";
import bookingRoutes from "./routes/booking.routes";
import theaterRoutes from "./routes/theater.routes";
import seatRoutes from "./routes/seat.routes";
import castRoutes from "./routes/cast.routes";

import { errorHandler } from "./middleware/error.middleware";

dotenv.config();
// const express = require("express");
const app = express();
const PORT = process.env.PORT || 5175

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET" ,"POST", "PUT", "DELETE" , "OPTIONS"],
        allowedHeaders: ["Content-type" , "Authorization"],
    })
);
app.use(cors());
app.use(express.json()); //parse json body
app.use("/api/auth" , authRoutes); //form data
app.use(errorHandler);
app.use(express.urlencoded({extended:true}));
app.use("/api" , movieRoutes);
app.use("/api" , likeRoutes);
app.use("/api" , showRoutes);
app.use("/api" , bookingRoutes);
app.use("/api" , theaterRoutes);
app.use("/api", seatRoutes);
// app.use("/api" , castRoutes);
app.use("/" , castRoutes);

app.get("/", async(req,res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.status(200).json({
            message: "Database connection successfully",
            result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database connection failed");
    }
});

app.listen(PORT , () => {
    console.log(`Server running on http://localhost:${PORT}`);
});