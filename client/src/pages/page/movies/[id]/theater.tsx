import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

type Movie = {
    movieid: number,
    title: string , 
    language: string,
    runtime : string,
    genre: string,
}

type Theater = {
    theaterid: number,
    name: string,
    city: string
};

type Show = {
    showid: number,
    movie_name: string,
    theater_name: string,
    show_time: string,
    show_date: string,
};

export default function TheaterDetails() {
    const router = useRouter();
    const {id} = router.query;
    const[movie, setMovie] = useState<Movie | null>(null);
    const[theater, setTheater] = useState<Theater[]>([]);
    const[selectedDate, setSelectedDate] = useState(0);
    const[likedMovie, setLikedMovie] = useState<number[]>([]);
    const[show, setShow] = useState<Show[]>([]);
    const[seat, setSeat] = useState();
    
    const[showSeatPopup, setShowSeatPopup] = useState(false);
    const[selectedNumber, setSelectedNumber] = useState<number[]>([]);
    const[selectedShowId, setSelectedShowId] = useState<number | null>(null);

    const toggleLike = (movieId: number) => {
        if(likedMovie.includes(movieId)) {
            setLikedMovie(likedMovie.filter(id => id !== movieId));
        } else {
            setLikedMovie([...likedMovie , movieId]);
        }
    };
    
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `/api/movies/${id}`)
         .then(res => res.json())
         .then(data => setMovie(data));

        fetch(process.env.NEXT_PUBLIC_API_URL + "/api/theater")
         .then(res => res.json())
         .then(data => setTheater(data));

        fetch(process.env.NEXT_PUBLIC_API_URL + "/api/show")
         .then(res => res.json())
         .then(data => {
            const formatedShow = data.map((s: any) => {
                const formatedDates = new Date(s.show_date).toLocaleDateString("en-IN" , {timeZone: "Asia/Kolkata" ,});
                const formatedTimes = new Date(`1970-01-01T${s.show_time}`).toLocaleTimeString("en-IN" , {hour: "numeric" , minute: "2-digit", hour12: true})
                return{
                    ...s,
                    show_date: formatedDates,
                    show_time: formatedTimes,
                } 
            });
            setShow(formatedShow);
        });

    },[id]);

    const generateDates = () => {
        const days = [];
        const today = new Date();

        for(let i=0; i<7; i++) {
            const d = new Date();
            d.setDate(today.getDate() + i);

            days.push({
                day: d.toLocaleDateString("en-IN" , {weekday: "short"}).toUpperCase(),
                date: d.getDate(),
                month: d.toLocaleDateString("en-IN" , {month:"short"}).toUpperCase(),
                fullDate: d.toLocaleDateString("en-IN" , {timeZone: "Asia/Kolkata"})
                // fullDate: d.toISOString().split("T")[0],
            });
        }
        return days;
    };

    const dates = generateDates();
    const selectedFullDate = dates[selectedDate]?.fullDate;

    const handleShowClick = async(showid: number) => {
        const res = await fetch(
            `http://localhost:5175/api/seat/${showid}`
        );
        const data = await res.json();
        setSeat(data.data);
        setSelectedShowId(showid);
        setShowSeatPopup(true);
        // router.push(`/page/movies/${id}/seat/${showid}`);
    }

    const buttonNumber = Array.from({length:10}, (_, i) => i+1 );

    const handleClick = (number:any) => {
        setSelectedNumber(number);
    };

    const handleSelect = async() => {
        if(!selectedShowId) return;
        
        router.push(`/page/movies/${id}/seat/${selectedShowId}?count=${selectedNumber}`);
    }

    return(
        <>
        <section className="py-20">
            <div>
                <div className="max-w-7xl mx-auto py-6">
                    {movie && (
                        <div>
                            <h1 className="text-4xl font-medium tracking-wide mb-3">{movie.title} - <span>({movie.language})</span> </h1>
                            <div className="flex gap-5">
                                <h4 className="border rounded-2xl px-3 py-1 text-sm">Movie runtime : {movie.runtime}</h4>
                                <h4 className="border rounded-2xl px-3 py-1 text-sm ">{movie.genre}</h4>
                            </div>
                        </div>
                    )}
                </div>
                <hr className="border-gray-300 "/>
            </div>
            <div>
                <div className="max-w-7xl mx-auto flex gap-3 py-3">
                    {dates.map((d, index) => (
                        <div key={index} 
                        className={`cursor-pointer text-center px-4 py-2 text-sm font-medium rounded-2xl ${
                            selectedDate === index
                            ? "bg-orange-400 text-white" : "bg-white text-gray-600 "}`}
                        onClick={() => setSelectedDate(index)}>
                            <p>{d.day}</p>
                            <p>{d.date}</p>
                            <p>{d.month}</p>
                        </div>
                    ))}
                </div>
                <hr className="border-gray-300 mb-3"/>
            </div>
            <div className="">
                <div className="max-w-7xl mx-auto py-4">
                    {theater.map((theaters) => (
                        <div key={theaters.theaterid} className="px-5 py-3 border border-gray-300 flex gap-5 mb-5 w-[80%] h-[100px] mx-auto">
                            <div className="w-[300px]">
                                <h1 className="font-medium ">{theaters.name}</h1>
                                <h4 className="text-sm tracking-wide text-gray-500">{theaters.city} </h4>
                            </div>
                            <div>
                                <button className="p-3" onClick={() => toggleLike(theaters.theaterid)}>
                                    {likedMovie.includes(theaters.theaterid) ? (
                                        <FaHeart className="text-red-500 w-5 h-5"/>
                                    ) : (
                                        <FaHeart className="text-gray-300 w-5 h-5"/>
                                    )}
                                </button>
                            </div>
                            <div className="grid grid-cols-5 gap-3 items-center">
                                {show.filter((s) => s.theater_name === theaters.name && s.show_date === selectedFullDate).map((s) => (
                                    <div key={s.showid} className="border px-3 py-1">
                                        
                                        <button key={s.showid} onClick={() => handleShowClick(s.showid)}
                                    >{s.show_time}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    {showSeatPopup && (
                        <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center">
                            <div className="bg-white p-6 rounded-2xl w-[600px]">
                                <h1 className="text-center text-xl font-medium mb-6">How many seats ?</h1>

                                <div className="flex justify-between mb-5">
                                {buttonNumber.map((number: any) => (
                                    <div key={number} className="w-[50px]">
                                    <button onClick={() => handleClick(number)}
                                    className={` rounded-full px-4 py-2 font-medium text-center text-sm 
                                    ${selectedNumber === number ? "bg-orange-300" : "bg-white"}
                                    `}>{number}</button>
                                    </div>
                                ))}
                                </div>
                                <div>
                                    <button onClick={handleSelect}
                                    className="w-full bg-orange-400 rounded  py-1 text-white font-medium">Select Seat</button>
                                </div>
                            </div>
                        </div>
                    )}                        
                </div>
                <hr className="border-gray-300"/>
            </div>   
        </section>
        </>
    );
}