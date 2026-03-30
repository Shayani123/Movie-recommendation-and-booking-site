import pool from "../config/db";

//Admin create seat
export const createSeat = async(data: any) => {
    const {showId, seat_number, row, seat_type, status, price} = data;
    const result = await pool.query(
        "INSERT INTO seats(showId , seat_number, row, seat_type, status, price) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
         [showId, seat_number, row, seat_type, status || "available" , price] 
    );
    return result.rows[0];
};

//Get seats by show id
// export const getSeatByShow = async(data: any) => {
//     const{seatid, showid, seat_number, row, seat_type, status, price} = data;
//     const result = await pool.query(
//         `SELECT seatid, showid, seat_number, row, seat_type, status, price
//         FROM seats
//         WHERE showid=$1
//         ORDER BY row, seat_number`,
//         [seatid, showid, seat_number, row, seat_type, status, price]
//     );
//     return result.rows[0];
// };

export const getSeatByShow = async() => {
    const result = await pool.query("SELECT * FROM seats ORDER BY seatid ASC");
    return result.rows;
};

//Update seat
export const updateSeatStatus = async(seatId:number, status:string) => {
    const result = await pool.query(
        // `UPDATE seats
        // SET status=$1, updated_at = CURRENT_TIMESTAMP 
        // WHERE seatid=$2 
        // RETURNING *`,
        `UPDATE seats
        SET status = 'booked'
        WHERE showid = $1
        AND seat_number = ANY($2::text[])
        ORDER BY seatid ASC
        RETURNING *`,
        [seatId, status]
    );
    
    return result.rows[0];
};

//Delete seat
export const deleteSeat = async(seatId: number) => {
    await pool.query("DELETE FROM seats WHERE id=$1" , [seatId]);
};
 
export const getSeatByShowId = async(showid: number) => {
    const result = await pool.query(
        "SELECT * FROM seats WHERE showid=$1" , [showid]
    );
    return result.rows;
};