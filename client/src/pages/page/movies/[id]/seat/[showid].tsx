import { useShowStore } from "@/pages/page/store/useShowStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    const { showid, count} = router.query;

    const[seat, setSeat] = useState<Seat[]>([]);
    const[selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const[seatCount, setSeatCount] = useState(1);
    const[showPopup , setShowPopup] = useState(false);
    const[paymentPopup, setPaymentPopup] = useState(false);

    const[email , setEmail] = useState("");
    const[phone, setPhone] = useState("");
    

    const {fetchShowDetails, setSeats, setTotalPrice , setUserDetails} = useShowStore();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `/api/seat/${showid}`)
         .then(res => res.json())
         .then(data => setSeat(data));
        if(showid) {
            fetchShowDetails(Number(showid));
        }

    }, [showid]);

    const groupedSeats = seat
    .sort((a: any , b:any) => a.seatid - b.seatid)
    .reduce((acc: any, seat:any) => {
        if(!acc[seat.seat_type]) {
            acc[seat.seat_type] = [];
        }
        acc[seat.seat_type].push(seat);
        return acc;
    }, {});

    useEffect(() => {
        if(count) {
            setSeatCount(Number(count));
        }
    },[count]);

    const handleSelectClick = (seatid: number) => {
        if(selectedSeats.includes(seatid)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatid));

        } else {
            if(selectedSeats.length >= seatCount) {
                alert(`You can only select ${seatCount} seats`);
                return;
            }
            setSelectedSeats([...selectedSeats, seatid]);
        }
    };

    const totalPrice = 
    selectedSeats.length === seatCount 
     ? seat
     .filter((s) => selectedSeats.includes(s.seatid))
     .reduce((total , s) => total + Number(s.price), 0)
     : 0 ;
    const handlePayment = (totalPrice : any) => {
        setShowPopup(totalPrice);
    };

    const handlePaymentDetail = () => {

        const seatNumber: [number, string][] = seat ?.filter((s: any) => selectedSeats.includes(s.seatid)).map((s: any) => [s.seatid, `${s.seat_type}${s.seat_number}`]) || [];
        // const seatNumber:Seat[] = seat.filter((id)=>{ selectedSeats.id == id})
        setSeats(seatNumber);
        setTotalPrice(totalPrice);
        setUserDetails({email, phone});
        setShowPopup(false);
        router.push(`/page/order-summary`);
    };
 
    return (
        <>
        <section className="py-32">
            <div className="px-[350px]">
                <h1>Select Seat</h1>
                <div className="">
                    {Object.keys(groupedSeats).map((type) => (
                        <div key={type} className="flex gap-5 mb-5 ">
                            <h1 className="w-[150px]">{type} {groupedSeats[type][0].price}</h1>

                            <div className="grid grid-cols-10 gap-2 ">
                                {groupedSeats[type].map((seat:any) => (
                                    <div key={seat.seatid} >
                                        <button onClick={() => handleSelectClick(seat.seatid )}
                                        disabled={seat.status === 'booked'}
                                        className={`border border-orange-500 px-2 py-1 w-[50px] text-black/30 font-medium rounded 
                                        ${seat.status === 'booked' ? "bg-orange-200" : selectedSeats.includes(seat.seatid) 
                                        ? "bg-orange-500 text-white" : "bg-white"}
                                        `}>
                                            {/* ${seat.status === 'booked' ? "bg-orange-300" : ""}
                                        ${selectedSeats.includes(seat.seatid) ? "bg-orange-500 text-white" : "bg-white"} */}
                                            {seat.seat_number}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                   <div>
                    <button onClick={ handlePayment} 
                    className="bg-orange-600 text-white px-2 py-2 rounded-xl w-full ">Price : {totalPrice} </button>

                    <div>
                        Seat : {seat.filter((s) => selectedSeats.includes(s.seatid))
                        .map((s) => s.seat_number).join(" , ")}
                    </div>
                   </div>
                   <div>
                    {showPopup && (
                        <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center  ">
                            <div className="bg-white w-[450px] p-5 rounded-2xl">
                                <div className="mb-2">
                                    <label className="font-medium">Email</label>
                                    <input type="email" placeholder="Enter your email" value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-2 py-1 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-50 transition-all placeholder:text-slate-400 placeholder:text-sm mt-2"/>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[#344054] font-medium mb-1.5">Phone number</label>
                                    <div className="flex gap-0 border border-[#D0D5DD] rounded-lg overflow-hidden focus-within:ring-slate-100 transition-all">
                                    <select className="px-2 py-1 text-sm focus:outline-none">
                                        <option>IND </option>
                                        <option>UK</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="+91 1234567890" value={phone} 
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-2 py-1  rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-50 transition-all placeholder:text-slate-400 placeholder:text-sm"
                                    />
                                    </div>
                                </div>

                                <button disabled={!email || !phone}  onClick={handlePaymentDetail}
                                className={`w-full px-3 py-1 text-white rounded-lg 
                                ${!email || !phone ? " bg-gray-300 cursor-not-allowed " : " bg-orange-300 "}  `}>Submit</button>
                            </div>
                        </div>
                    )}
                   </div>

                   <div>
                    {paymentPopup && (
                        <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center ">
                            <div className="bg-white w-[450px] p-5 rounded-2xl">
                                <h1 className="text-end text-green-600 font-medium mb-2">Pay : {totalPrice}</h1>
                                <hr />
                                
                            </div>
                        </div>
                    )}
                   </div>

                </div>
            </div>
        </section>
        </>
    );
}