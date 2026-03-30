import pool from "../config/db";

export const likeMovie = async(userid: number , movieid: number) => {
    const result = await pool.query(
        `INSERT INTO likes(userid, movieid) DO NOTHING RETURNING *`,
        [userid , movieid]
    );
    return result.rows[0];
};

export const removeLiked = async(userid: number, movieid: number) => {
    const result = await pool.query(
        `DELETE FROM likes 
        WHERE userid=$1 AND movieid=$2` , [userid,movieid]
    );
    return result.rows[0];
};

//Check if like
export const isMovieLiked = async(userid: number , movieid: number) => {
    const result = await pool.query(
        `SELECT 1 FROM likes WHERE userid=$1 AND movieid=$2`,
        [userid,movieid]
    );
    return result.rows;
};