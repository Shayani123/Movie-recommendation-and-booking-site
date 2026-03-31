import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Movie = {
    movieid: number,
    title: string,
    description: string,
    image: string,
    rating: number,
    language: string,
    genre: string,
    runtime: string,
    release_year: string,
};
export default function MovieData() {
    const router = useRouter();
    const[movie, setMovie] = useState<Movie[]>([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/api/movies')
         .then(res => res.json())
         .then(data => setMovie(data));
    },[]);

    return(
        <>
        <section className="bg-black px-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-between max-w-7xl mx-auto py-10">
                {movie.slice(0,4).map((movies, index) => (
                    <div key={index} className="bg-gray-600/50 rounded-2xl overflow-hidden px-5">
                            <div className="overflow-hidden ">
                                <img
                                src={movies.image}
                                alt=""
                                className="object-contain w-full h-64 py-2 mx-auto" />
                            </div>
                            <h1 className="text-white font-medium  py-1 ">{movies.title}</h1>
                            <h1 className="text-gray-400 text-sm  mb-3">{movies.release_year} | {movies.runtime}</h1>
                            <button onClick={() => router.push(`/page/movies/${movies.movieid}`)}
                            className="bg-orange-400 rounded px-4 py-1 mb-4">Buy Ticket</button>
                    </div>
                ))}
            </div>
        </section>
        </>
    );
}