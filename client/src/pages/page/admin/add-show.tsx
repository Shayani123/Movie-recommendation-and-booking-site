import AdminGuard from "@/components/AdminGaurd";
import { title } from "process";
import { useEffect, useState } from "react";

export default function AddShow() {
    const[movies, setMovies] = useState<any[]>([]);
    const[theaters , setTheaters] = useState<any[]>([]);
    const[filterTheaters , setFilterTheaters] = useState<any[]>([]);
    const[movieName , setMovieName] = useState("");
    const[theaterName, setTheaterName] = useState("");
    const[movieId , setMovieId] = useState<number | null>(null);
    const[theaterId, setTheaterId] = useState<number | null>(null);
    const[showDate , setShowDate] = useState("");
    const[showTime, setShowTime] = useState("");
    const[screenNumber , setScreenNumber] = useState<number>(0);
    const[total_seats , setTotal_seats] = useState<number>(0);
    const[availableSeats , setAvailableSeats] = useState<number>(0);
    // const[formData , setFormData] = useState({
    //     movieId: ""
    // });

    //Fetch movies + theaters 
    useEffect(() => {
        const fetchData = async() => {
            const movieRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/movies");
            const theaterRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/theater");

            const movieData = await movieRes.json();
            const theaterData = await theaterRes.json();

            setMovies(movieData);
            setTheaters(theaterData);
        };
        fetchData();
    },[]);

    //filter theater by movies
    useEffect(() => {
        if(!movieId) return;

        const filtered = theaters.filter(
            (theater) => theater.movieid === movieId
        );
        setFilterTheaters(filtered.length ? filtered : theaters);
    },[movieId , theaters]);

    //Submit show
    const handleAddShow = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch( process.env.NEXT_PUBLIC_API_URL + "/api/show" , {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`,
            },
            body: JSON.stringify({
                movieId, theaterId, show_date: showDate, show_time: showTime , screen_number: screenNumber, total_seats: total_seats, available_seats : availableSeats, 
            }),
        });
        const data = await res.json();
        if(res.ok) {
            alert("Show Added Successfully");
           window.location.reload();
        } else {
            alert(data.message || "Error adding show");
        }
    };

    return (
        <AdminGuard>
            <div className="fixed inset-0 backdrop-blur-2xl p-6 flex items-center justify-center ">
                <form onSubmit={handleAddShow}>
                    <div className="bg-black/80 flex justify-between rounded-2xl p-6">
                        <div>
                            <h1 className="text-2xl font-bold text-orange-400 text-center">Add Show</h1>

                            {/* Movie drop down */}
                            <div className="mt-6">
                                <label className="text-white font-semibold">Movie</label>
                                <select
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // const movie = movies.find((m) => m.movieid === Number(value));
                                    setMovieId(value ? Number(value) : null);
                                    // setMovieName(movie?.title || "");
                                }}
                                className="bg-gray-200 rounded w-full mt-1 " >
                                    <option value="">Select Movie</option>
                                    {movies.map((movie) => (
                                        <option key={movie.movieid} value={movie.movieid}>{movie.title}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Theater drop down */}
                            <div className="mt-6">
                                <label className="text-white font-semibold">Theater</label>
                                <select 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const theater = theaters.find((t) => t.theaterid === Number(value));
                                    setTheaterId(value ? Number(value) : null);
                                    setTheaterName(theater?.name || "");
                                }}
                                className="bg-gray-200 rounded w-full mt-1">
                                    <option value="">Select Theater</option>
                                    {theaters.map((theater) => (
                                        <option key={theater.theaterid} value={theater.theaterid}>{theater.name} ({theater.city})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div className="mt-6">
                                <label className="text-white font-semibold">Show Date</label>
                                <input onChange={(e) => setShowDate(e.target.value)}
                                type="date" className="bg-gray-200 rounded w-full mt-1"/>
                            </div>

                            {/* Time */}
                            <div className="mt-6">
                                <label className="text-white font-semibold">Show Time</label>
                                <input onChange={(e) => setShowTime(e.target.value)}
                                type="time" className="bg-gray-200 rounded w-full mt-1"/>
                            </div>

                            {/* Screen */}
                            <div className="mt-6">
                                <label className="text-white font-semibold">Screen Number</label>
                                <input onChange={(e) => setScreenNumber(Number(e.target.value))}
                                type="number" min="1" className="bg-gray-200 rounded w-full mt-1" />
                            </div>

                            {/* Seat */}
                            <div className="mt-6">
                                <label className="text-white font-semibold">Total Seats</label>
                                <input onChange={(e) => {
                                    const seats = Number(e.target.value);   
                                    setTotal_seats(seats);
                                    setAvailableSeats(seats);
                                }} 
                                type="number" min="1" className="bg-gray-200 rounded w-full mt-1" />
                            </div>

                            <button type="submit" 
                            className="bg-orange-400 text-white mt-6 px-4 py-2 rounded font-semibold text-white block mx-auto">Add Show</button>
                        </div>
                        <div>
                            <button type="button" className="right-56 text-xl text-white">X</button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminGuard>
    );

}