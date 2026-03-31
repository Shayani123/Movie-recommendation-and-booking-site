import { useEffect, useState } from "react";
import { useShowStore } from "../store/useShowStore";
import { useRouter } from "next/router";

export default function OrderSummary () {

    const router = useRouter();

        const{showDetails, seats, totalPrice, userDetails} = useShowStore();
        const[upiId, setUpiId] = useState("");
        
        const[ticket, setTicket] = useState(false);
        const ticketPrice = totalPrice || 0;
        const convenienceFee = 51.92;
        const gst = convenienceFee * 0.18;

        const totalPay = ticketPrice + convenienceFee + gst;

        const handleBookTicket = async() => {
            try {
                const seatId = Array.isArray(seats) ?  seats : [];
                
                const bookingDetails = {
                    email: userDetails?.email,
                    phone: userDetails?.phone,
                    showid: showDetails?.showid,
                    seatid: seatId,
                    total_price: totalPay,
                };
                
                const res = await fetch(  "http://localhost:5175/api/booking" , {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json", 
                    },
                    body: JSON.stringify(bookingDetails),
                });
               
                const data = await res.json();
                if(!res.ok){
                    throw new Error("Booking Failed");
                }
                console.log("Booking success :  ",data);

                await Promise.all(
                    Array.isArray(seats)
                    ? seats.map(async (seat:any) => {
                        return fetch(`http://localhost:5175/api/seat/${seat.seatid}` , {
                            method: "PUT",
                            headers: {
                                "Content-Type" : "application/json",
                            },
                            body: JSON.stringify({
                                // showid: showDetails?.showid,
                                // seat_number: seat.seat_number,
                                status: 'booked',
                            }),
                        });
                    }) : []
                );
                setTicket(true);
                alert("Ticket booked successfully");
               
            } catch (error) {
                console.error(error);
            }
            
        };

        return (
            <section className="relative inset-0 bg-gray-400">
                <nav className="bg-white text-4xl px-4 py-2  h-[60px] mb-6">{showDetails?.moviename} </nav>
                <div className="">
                    <div className="flex flex-col md:flex-row gap-10 px-4 md:px-28 ">
                        <div className="w-full bg-white rounded-2xl px-4">
                            <h1 className="text-lg font-medium py-4">Payment Options</h1>
                            <hr className="w-full border-gray-300 mb-3"/> 
                            <div className="flex ">
                                <div className="w-[150px]">
                                    <button 
                                     className="py-3 text-sm px-1 text-gray-400 font-medium">Pay by any UPI App</button>
                                    <hr className="w-full border-gray-300"/>
                                    <button 
                                     className="py-3 text-sm px-1 text-gray-400 font-medium">Debit/Credit Card</button>
                                    <hr className="w-full border-gray-300"/>
                                    <button 
                                     className="py-3 text-sm px-1 text-gray-400 font-medium">Mobile Wallets</button>
                                    <hr className="w-full border-gray-300"/>
                                    <button 
                                     className="py-3 text-sm px-1 text-gray-400 font-medium">Gift Voucher</button>
                                    <hr className="w-full border-gray-300"/>
                                    <button 
                                     className="py-3 text-sm px-1 text-gray-400 font-medium">Net Banking</button>
                                    <hr className="w-full border-gray-300"/>
                                    <button 
                                     className="py-3 text-sm px-1 text-gray-400 font-medium">Redeem Points</button>
                                    <hr className="w-full border-gray-300"/>
                                </div>
                                
                                <div className="border border-gray-300"></div>
                                <div className="w-full px-4">
                                    <h1 className="font-medium py-3">Pay by any UPI App</h1>
                                    <div className="border border-gray-300 w-full mb-3 px-4 rounded-xl py-2">
                                        <h1 className="font-medium">Scan QR code</h1>
                                        <p className="text-xs text-gray-400">You need to have a registered UPI ID</p>
                                    </div>
                                    <label className="font-medium ">Enter UPI ID : <input type="text" 
                                    placeholder="1234567890@upi" value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="bg-gray-200 w-full mt-2 px-2 py-2 rounded mb-4" /> </label>
                                    <button disabled={!upiId} onClick={handleBookTicket}
                                    className={`mx-auto px-3 py-2 text-lg font-medium rounded text-white
                                    ${!upiId ? "bg-gray-400 cursor-not-allowed " : "bg-green-600"}`}>Pay Now</button>
                                </div>
                            </div>
                            
                        </div>
                        <div className="w-full rounded-2xl px-4">
                            
                            <div className="bg-white rounded pt-2 mb-3">
                                <div className="flex justify-between ">
                                <h1 className="px-4">{showDetails?.moviename} </h1>
                                <h1 className="px-6">2</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="font-medium text-sm px-4">{showDetails?.show_date} | {showDetails?.show_time}</h1>
                                    <button className="text-orange-600 font-medium text-sm px-6">Box Office</button>
                                </div>
                                <h1 className="text-gray-500 px-4 text-sm font-medium">{showDetails?.language}</h1>
                                <h1 className="text-gray-500 px-4 text-sm font-medium">{seats.map(([number, string]) => string).join(" , ")} | screen : {showDetails?.screen_number}</h1>
                                <h1 className="text-gray-500 px-4 text-sm font-medium">{showDetails?.theatername}</h1>
                                <h1 className="bg-orange-300/40 w-full px-4 py-2 font-medium rounded">Cancellation Unavailable 
                                    <br />
                                    <span className="text-sm font-normal text-gray-600">This venue does not support booking cancellation.</span>
                                </h1>
                            </div>
                        
                            <div className="bg-white rounded p-5 mb-3">
                                <div className="flex justify-between mb-2">
                                    <h1 className="text-gray-500 font-medium">Ticket(s) price </h1>
                                    <h1>{totalPrice}</h1>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <h1 className="text-gray-500 font-medium">Convenience fees</h1>
                                    <h1>{convenienceFee}</h1>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <h1 className="text-gray-600 font-medium">GST</h1>
                                    <h1>{gst.toFixed(2)}</h1>
                                </div>
                                <hr className="border border-gray-200 mb-2"/>
                                <div className="flex justify-between">
                                    <h1 className="font-medium">Total Pay</h1>
                                    <h1>{totalPay.toFixed(2)}</h1>
                                </div>
                            </div>
                            <div className="bg-white rounded p-5 mb-5">
                                <div className="flex justify-between">
                                    <h1 className="font-medium">For Sending Booking Details</h1>
                                    <button className="text-orange-600 font-medium text-sm">Edit</button>
                                </div>
                                <h1 className="text-gray-400 text-sm font-medium">{userDetails 
                                ? `${userDetails.phone} | ${userDetails.email}` : "phone number | email"}</h1>
                            </div>
                            <div>
                                <button 
                                className="bg-orange-400 text-white px-4 py-2 rounded">Ticket Book</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {ticket && (
                        <div className="fixed inset-0 backdrop-blur-2xl flex items-center">
                            <div className="bg-white w-[600px] mx-auto px-4 py-4 rounded-2xl">
                                <div className="flex mb-2 ">
                                    <h1 className="font-medium text-lg">{showDetails?.moviename}</h1>
                                    <button onClick={() => router.push("/") } className="absolute  right-1/3 text-xl">X</button>
                                    <h4></h4>
                                </div>
                                <h4 className="font-medium mb-1">{showDetails?.show_date} | {showDetails?.show_time}</h4>
                                <h4 className="font-medium mb-1">Seat Number : {seats.map(([number, string]) => string).join(",")}</h4>
                                <h4 className="font-medium mb-1">Screen : {showDetails?.screen_number}</h4>
                                <h4 className="font-medium mb-1">{showDetails?.theatername} ({showDetails?.city})</h4>
                            </div>

                        </div>
                    )}
                </div>
            </section>
        );
}