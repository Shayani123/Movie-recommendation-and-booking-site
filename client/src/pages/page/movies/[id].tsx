import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";


type Movie = {
    movieid: number,
    title: string,
    description: string,
    image: string,
    video: string,
    rating: number,
    language: string,
    genre: string,
    runtime: string,
    release_year: number, 
};

type Cast = {
    actor_name: string,
    image: string,
    role: string,
};

export default function MovieDetails() {
    const router = useRouter();
    const { id } = router.query;

    // console.log("Movie id : " , id);
    const[movie , setMovie] = useState<Movie | null>(null);
    const[likedMovie , setLikedMovie] = useState<number[]>([]);
    const[cast, setCast] = useState<Cast[]>([]);

    const toggleLike = (movieId: number) => {
        if(likedMovie.includes(movieId)) {
            setLikedMovie(likedMovie.filter(id => id !== movieId));
        } else {
            setLikedMovie([...likedMovie , movieId]);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("like");
        if(saved) {
            setLikedMovie(JSON.parse(saved));
        }
        console.log(saved);
    },[]);

    useEffect(() => {
        // if(!router.isReady) return;
        fetch(`http://localhost:5175/api/movies/${id}`)
         .then(res => res.json())
         .then(data => setMovie(data));

        fetch("http://localhost:5175/api/casts")
         .then(res => res.json())
         .then(data => setCast(data));
        
    },[id]);

 
    return (
        <>
        <section className="p-4 bg-black py-16">
            <div className="max-w-5xl mx-auto px-16 py-12">
                {movie && (<div key={movie.movieid}>
                    <div className="flex gap-8 ">
                        {/* <div>{movie.image}</div> */}
                        <img src={movie.image } alt="" width={500} height={500} className="object-contain w-[500px] h-[500px]  "/>
                        <div>
                            <h4 className="text-orange-400 uppercase font-medium text-sm tracking-wide mb-2">{movie.language}</h4>
                            <h1 className="text-5xl text-white font-medium mb-2 tracking-wide">{movie.title}</h1>
                            <h5 className="text-sm mb-2 text-white"> <span className="text-orange-400 text-[18px]">★</span> {movie.rating}</h5>
                            <p className="text-gray-400 font-medium mb-2 ">{movie.description}</p>
                            <div className="flex text-white gap-3 text-sm mb-5">
                                <h5>{movie.runtime}</h5>
                                <h5> • {movie.genre}</h5>
                                <h5> • {movie.release_year}</h5>
                            </div>
                            <div className="flex gap-5">
                                <button className="bg-gray-500 flex gap-2 items-center px-2 py-2 rounded font-medium text-white "> 
                                    <span><IoCaretForwardCircleOutline className="w-5 h-5" /></span> 
                                    Watch Trailer
                                </button>
                                <button onClick={() => router.push(`/page/movies/${id}/theater`)}
                                className="bg-orange-500 text-white font-medium px-6 py-2 rounded">
                                    Buy Tickets
                                </button>
                                <button className="bg-gray-500 rounded-full p-3" onClick={() => toggleLike(movie.movieid)}>
                                {likedMovie.includes(movie.movieid) ? (
                                    <FaHeart className="text-red-500"/>
                                ) : (
                                    <FaHeart className="text-white"/>
                                )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>) }
            </div>
        </section>

        <section className="bg-black">
            <div className="max-w-7xl mx-auto ">
                <div>
                    <h1 className="text-white text-2xl mb-16">Your Favorite Crew</h1>
                    <div className="px-12 grid grid-cols-1 md:grid-cols-8 ">
                        {cast.map((casts, index) => (
                            <div key={index} className="">
                                <img src={casts.image} alt="" className="rounded-full h-[100px] w-[100px] object-cover mb-3" /> 
                                <h1 className="text-white px-2 text-lg">{casts.actor_name}</h1>
                                <h1 className="text-gray-300 px-2 text-sm font-medium mb-6">{casts.role}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
        
    );
}