import {create} from "zustand";

type Movie = {
    movieid: number;
    title: string,
    language: string,
};

type MovieStore = {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    fetchMovies: () => Promise<void>;
};

export const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    loading: false,
    error: null,

    fetchMovies: async() => {
        try {
            set({loading: true, error: null});
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/movies`);
            const data = await res.json();

            set({
                movies: data,
                loading: false,
            });
        } catch (error: any) {
            set({
                error: error.message,
                loading: false,
            });
        }
    },
}));