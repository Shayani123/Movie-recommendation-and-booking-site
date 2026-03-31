import {createContext , useContext, useState} from "react";

const BookingContext = createContext<any>(null);

export const BookingProvider = ({children}:any) => {
    const[booking, setBooking] = useState<any>(null);

    return (
        <BookingContext.Provider value={{booking, setBooking}}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);