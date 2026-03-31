import { error } from "console";
import {create} from "zustand";

type Show = {
    showid: number,
    // movieid: number,
    // theaterid: number,
    moviename: string,
    language: string,
    theatername: string,
    city: string,
    show_date: string,
    show_time: string,
    screen_number: number,
};

type ShowStore = {
    showDetails: Show | null;
    seats: [number, string][];
    totalPrice: number;
    userDetails: {email: string; phone: string} | null;
    loading: boolean;
    error: string | null;

    fetchShowDetails: (showid: number) => Promise<void>;
    setSeats: (seats: [number, string][]) => void;
    setTotalPrice: (price: number) => void;
    setUserDetails: (data: {email: string; phone: string}) => void;
    clearAll: () => void;
};

export const useShowStore = create<ShowStore>((set) => ({
    showDetails: null,
    seats: [],
    totalPrice: 0,
    userDetails: null,
    loading: false,
    error: null,

    fetchShowDetails: async(showid: number) => {
        try {
            set({loading: true, error: null});
            const showRes = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/show/${showid}`);
            const showData = await showRes.json();

            // const {movieid, theaterid} = showData.data;
            const movieid = showData?.data?.movieid || showData?.movieid;
            const theaterid = showData?.data?.theaterid || showData?.theaterid;

            if(!movieid || !theaterid) {
                throw new Error ("Missing movieid or theaterid");
            }

            console.log("Movieid : ", movieid);
            console.log("Theaterid : " , theaterid);

            //fetch movie + theater 
            // const[movieRes, theaterRes] = await Promise.all([
            //     fetch(process.env.NEXT_PUBLIC_API_URL + `/api/movies/${movieid}`),
            //     fetch(process.env.NEXT_PUBLIC_API_URL + `/api/theaters/${theaterid}`),
            // ]);

            const movieRes = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/movies/${movieid}`);
            const theaterRes = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/theater/${theaterid}`);

            const movieData = await movieRes.json();
            const theaterData = await theaterRes.json();



            //store combined data

            const formattedDate = new Date(showData.show_date).toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
            });

            const formattedTime = new Date(`1970-01-01T${showData.show_time}`).toLocaleTimeString("en-IN" , {
                hour: "numeric",
                minute:"2-digit",
                hour12: true,
            });

            set({
                showDetails: {
                    showid,
                    moviename: movieData.title,
                    language: movieData.language,
                    theatername: theaterData.name,
                    city: theaterData.city,
                    show_time: formattedTime,
                    show_date: formattedDate,
                    screen_number: showData.screen_number,
                },
                loading: false,
            });
        } catch (error: any) {
            console.error("Fetch error : ", error);
            set({
                error: error.message,
                loading: false,
            });
        }
    }, 
    setSeats: (seats: [number,string][]) => set({ seats }),
    setTotalPrice: (price: number) => set({totalPrice: price}),
    setUserDetails: (data) => set({userDetails:data}),
    
    clearAll: () => 
        set({
            showDetails: null,
            seats: [],
            totalPrice: 0,
        }),
    
}));