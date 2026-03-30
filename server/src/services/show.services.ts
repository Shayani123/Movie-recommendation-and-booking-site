import pool from "../config/db";

export const createShow = async (
    movieId: number, theaterId: number, show_date: number, show_time: string, screen_number: number, total_seats: number, available_seats: number,
) => {
    const result = await pool.query(
        "INSERT INTO shows(movieId, theaterId, show_date, show_time, screen_number, total_seats, available_seats) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING showid ",
        [movieId, theaterId, show_date, show_time, screen_number, total_seats, available_seats]
    );
    return result.rows[0];
};

export const getShow = async() => {
    const result = await pool.query(
        `SELECT s.showId , m.title as movie_name, t.name as theater_name , show_date, show_time, total_seats, available_seats
        FROM shows s
        JOIN movies m 
        ON s.movieId = m.movieId
        JOIN theaters t
        ON s.theaterId = t.theaterId
        ORDER BY s.show_date , s.show_time` ,
        
    );
    return result.rows;
};

export const getShowById = async(showid: number) => {
    const result = await pool.query(
        "SELECT * FROM shows WHERE showid = $1", [showid]
    );
    return result.rows[0];
};

export const updateShow = async(id: string, data: any) => {
    const {show_date, show_time} = data;
    const result = await pool.query(
        "UPDATE shows SET show_date=$1, show_time=$2 WHERE id=$3 RETURNING *", [show_date, show_time]
    );
    return result.rows[0];
};

export const deleteShowById = async(id: number, data: any) => {
    const result = await pool.query(
        "DELETE FROM shows WHERE id=$1", [id]
    );
    return result.rows[0];
};