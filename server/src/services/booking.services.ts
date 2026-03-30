import pool from "../config/db";

export const createBooking = async(
    email: string,
    phone: string,
    showid: number,
    seatid: [number,string][],
    total_price: number,
) => {
    console.log(seatid)
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        // const seatCheck = await client.query(
        //     `SELECT seatid
        //      FROM seats
        //      WHERE seatid = ANY($1::int[])
        //      AND showid=$2
        //      AND status = 'available' `,
        //      [seatid, showid]
        // );

        // if(seatCheck.rowCount !== seatid.length) {
        //     throw new Error ("Some seats are already booked");
        // }

        // Insert Booking
        const bookingRes = await client.query(
            `INSERT INTO bookings(email, phone, showid, total_price, status) 
             VALUES ($1,$2,$3,$4, 'confirmed') 
             RETURNING *`,
             [email, phone, showid, total_price]
        );

        const booking = bookingRes.rows[0];

        //Insert booking seats
        // for(let id of seatid) {
        //     await client.query(
        //         `INSERT INTO booking_seats(bookingid, seatid)
        //          VALUES($1,$2)`,
        //          [booking.bookingid, id]
        //     );
        // }
const seatIds = seatid.map(([id]) => id);

        //update seat status
        await client.query(
  `UPDATE seats
   SET status = 'booked'
   WHERE seatid = ANY($1::int[])`,
  [seatIds]
);
        await client.query("COMMIT");


        return booking;

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally{
        client.release();
    }
};

//get booking details 
export const getBookingById = async(bookingid : number) => {
    const result = await pool.query(
        `SELECT 
        FROM bookings b
        LEFT JOIN booking_seats bs
        ON b.bookingId = bs.bookingId
        WHERE b.bookingId = $1`, [bookingid]
    );
    return result.rows;
};

//cancle Booking
export const cancleBooking = async(bookingid: number) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        //Get seatIds from booking_seats
        const seatResult = await client.query(
            `SELECT seatid FROM booking_seats
            WHERE bookingId=$1`, [bookingid]
        );

        const seatid = seatResult.rows.map(row => row.seatid);

        //Free seat
        await client.query(
            `UPDATE seats 
            SET status = 'available' , updated_at = CURRENT_TIMESTAMP 
            WHERE seatid= ANY($1::text[])`, [seatid]
        );

        //update booking status
        await client.query(
            `UPDATE booking
            SET status = 'cancelled'
            WHERE bookingid=$1`,
            [bookingid]
        );

        await client.query("COMMIT");
        return {message: "Booking cancle successfully"};
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};

