import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Movie = {
    movieid: number,
    title: string,
    description: string,
    image: string,
    video: string,
    rating : number,
    language: string,
    genre: string,
    runtime: string,
    release_year: string,
};

export default function MoviePage() {
    const router = useRouter();
    const[movie, setMovie] = useState<Movie[]>([]);
    const[likedMovie, setLikedMovie] = useState<number[]>([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/api/movies")
         .then(res => res.json())
         .then(data => setMovie(data));
    },[]);
    const toggleLike = (movieid: number) => {
        if(likedMovie.includes(movieid)) {
            setLikedMovie(likedMovie.filter(id => id !== movieid));
        } else {
            setLikedMovie([...likedMovie, movieid]);
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
        localStorage.setItem("like", JSON.stringify(likedMovie));
    },[likedMovie]);
    return (
        <section className="bg-black py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-between gap-8 max-w-7xl mx-auto py-16 ">
            {movie.map((movies) => (
                <div key={movies.movieid} className="bg-gray-600/50 rounded-2xl px-4 py-3 h-full hover:-translate-y-1 transition duration-300">
                    <div className="overflow-hidden ">
                        <Link key={movies.movieid} href={`/page/movies/${movies.movieid}`}>
                        {/* {movies.image && <img src={movies.image} alt="movie-image" className="w-[60%] cursor-pointer " /> } */}
                        <img src={movies.image} alt="movie-image" className="object-contain  w-full h-64 cursor-pointer mb-3 mx-auto"/>
                        </Link>
                    </div>
                    <h3 className="text-white font-bold mb-2">{movies.title}</h3>
                    <h4 className="text-gray-400 mb-1 text-sm">{movies.genre}</h4>
                    <h4 className="text-gray-400 mb-3 text-sm">{movies.release_year}  • {movies.runtime} </h4>
                    {/* <video src={movies.video} className="w-[60%] "></video> */}
                    <div className="flex justify-between items-center">
                        <button onClick={() => router.push(`/page/movies/${movies.movieid}`)}
                         className="bg-orange-400 rounded px-2 py-1 font-semibold">Buy Ticket</button>
                        <h4 className="text-gray-400"><span className="text-orange-400">★</span> {movies.rating}</h4>
                    </div>
                </div>
            ))}

        </div>
        </section>
    );
}
