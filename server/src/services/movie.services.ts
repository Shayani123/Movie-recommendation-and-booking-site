import pool from "../config/db";

export const createMovie = async(data: any) => {
    const {title , description , image , video , rating , created_by, created_at } = data;
    const result = await pool.query(
        "INSERT INTO movies(title , description , image, video , rating, created_by, created_at) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ",
        [title , description, image , video , rating, created_by, created_at]
    );
    return result.rows[0];
};

export const getAllMovie = async() => {
    const result = await pool.query(
        "SELECT * FROM movies ORDER BY created_at DESC",
    );
    return result.rows;
}

export const getMovieById = async(movieid:number) => {
    const result = await pool.query("SELECT * FROM movies WHERE movieid = $1" , [movieid]);
    return result.rows[0];
};

export const updateMovieById = async(movieid: number , data: any) => {
    const {title, description, image, video, rating} = data;
    const result = await pool.query(
        "UPDATE movies SET title=$1, description=$2, image=$3 , video=$4, rating=$5 WHERE movieid=$6 RETURNING * ",
        [title, description, image, video, rating , movieid]
    );
    return result.rows[0];
};

export const deleteMovieById = async(movieid: number , data:any) => {
    const result = await pool.query(
        "DELETE FROM movies WHERE movieid=$1 RETURNING *",
        [movieid]
    );
    return result.rows[0];
};