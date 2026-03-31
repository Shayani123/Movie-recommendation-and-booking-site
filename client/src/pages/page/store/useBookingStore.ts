import {create} from "zustand";

export const useBookingStore = create((set) => {
    movie: null;
    theater: null;
    show: null;

    setMovie: (data:any) => set({movie: data});
    setTheater: (data:any) => set({theater: data});
    setShow: (data:any) => set({show: data});
});