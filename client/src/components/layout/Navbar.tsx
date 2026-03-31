import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import Login from "@/pages/login";
import { useRouter } from "next/router";
import Signup from "@/pages/signup";
// import Login from "@/pages/login";

interface User {
    userId: number,
    name: string,
    email: string,
    phone: string,
    role: string,
}

export default function Navbar() {
    // return <div className="bg-orange-500">hello</div>
    const [signup, setSignup] = useState(false);
    const [login , setLogin] = useState(false);
    const [currentUser , setCurrentUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user) {
            setCurrentUser(JSON.parse(user));
        }
    },[login, signup])
    return(
        <>
        <nav className="bg-black/80 w-full left-0 top-0 px-6 py-6 md:px-28 md:py-6 fixed">
            <div className="flex items-center justify-between ">
                {/* name */}
                <div>
                    <h1 className="text-white font-bold text-xl md:text-2xl "><strong className="text-orange-400">Movie</strong>Booking </h1>
                </div>
                <div className="hidden  md:flex gap-7 text-white">
                    <Link href="/ ">Home</Link>
                    <Link href="/about ">About Us</Link>
                    <Link href="/page/movies ">Movies</Link>
                    <Link href="/events ">Events</Link>
                    <Link href="/contact ">Contact Us</Link>
                </div>
                {/* search & profile */}
                <div className="hidden  md:flex  gap-7 items-center">
                    <IoIosSearch className="w-6 h-6 text-white"/>

                    {!currentUser && (
                        <>
                        <button onClick={() => setLogin(true)}
                        className="bg-orange-400 px-2 py-1 rounded text-white ">Sign In</button>
                        
                        <button onClick={() => setSignup(true)}
                        className="bg-orange-400 px-2 py-1 rounded text-white"
                        >Sign Up</button>
                        </>
                    )}

                    {currentUser && (
                        <>
                        <div className="flex ">
                            <button onClick={() => router.push("/profile")}><CgProfile className="w-7 h-7 text-white"/>  </button>
                            <RiArrowDropDownLine className="text-white w-7 h-7"/>
                        </div>
                        </>
                    )}
                    {login && <Login onClose={() => setLogin(false)}/> }
                    {signup && <Signup onClose={() => setSignup(false)}/> }
                    
                </div>

                {/* mobile menu icon */}
                <div className="md:hidden flex items-center gap-3">
                    <IoIosSearch className="w-6 h-6 text-white mt-2"/>
                    <a href="#" className="text-3xl text-white">&#8801;</a>
                </div>

            </div>
        </nav>
        </>
    );
}