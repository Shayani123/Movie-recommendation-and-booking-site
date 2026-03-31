import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Theater = {
    theaterid: number,
    name: string,
};

type Show = {
    showid: number,
    theaterid: number,
    total_seats: number,
    available_seat: number,
};

type Seat = {
    seatid: number,
    showid: number,
    seat_number: string,
    row: string,
    seat_type: string,
    status: string,
    price: number,
};

export default function SeatBooking() {
    const router = useRouter();
    const {theaterid} = router.query;
    const{showid} = router.query;

    const[seat, setSeat] = useState<Seat[]>([]);
    const[theater, setTheater] = useState<Theater[]>([]);
    const[show, setShow] = useState<Show | null>(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `/api/theater`)
         .then(res => res.json())
         .then(data => setTheater(data))

        fetch(process.env.NEXT_PUBLIC_API_URL + `/api/show`)
         .then(res => res.json())
         .then(data => setShow(data));

        fetch(process.env.NEXT_PUBLIC_API_URL + `/api/seat`)
         .then(res => res.json())
         .then(data => setSeat(data));
    }, [theaterid,showid])

    
    return (
        <>
        <section>
            <div>
                <div>
                    {show && (
                        <div key={show.showid} className="grid grid-cols-5">
                            {/* <div>showid : {show.showid}</div> */}
                            {seat.map((seats) => (
                                <div key={seats.seatid} className="flex">
                                    <h1>{seats.row}</h1>
                                    <h1>{seats.seat_number}</h1>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
        </>
    );
}