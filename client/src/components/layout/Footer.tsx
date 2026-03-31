import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";

export default function Footer() {
    // return <div className="bg-blue-500">Thank you</div>
    return (
        <>
        <footer className="bg-black/80 w-full px-6 py-6 md:px-28 md:py-6">
            <div>
                <div className="md:flex items-center justify-between">
                    <div>
                        <h1 className="text-white text-xl md:text-2xl font-bold "><strong className="text-orange-400">Movie</strong>Booking </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-gray-200/50">Help / Privacy Policy </h1>
                        <div className="flex gap-4">
                            <button className="rounded-full bg-gray-500/50 p-2 "><FaTwitter  className="text-white w-4 h-4 "/></button>
                            <button className="rounded-full bg-gray-500/50 p-2"><FaFacebookF className="text-white w-4 h-4"/></button>
                            <button className="rounded-full bg-gray-500/50 p-2"><FiInstagram className="text-white w-5 h-5" /></button>
                        </div>
                    </div>
                </div>

                <div className="md:flex md:justify-between md:mt-9 ">
                    <div className="mt-2">
                        <p className="text-white">Buy movie tickets easily with <br /> Avois system nationwide</p>
                        <button className="bg-orange-400 text-white px-4 py-2 mt-4 font-bold">Get Your Ticket</button>
                    </div>
                    <div className="flex gap-28 mt-2">
                        <div className="">
                            <h1 className="text-orange-400/80 font-bold">Movies</h1>
                            <h3 className="text-gray-200/50">Action</h3>
                            <h3 className="text-gray-200/50">Adventure</h3>
                            <h3 className="text-gray-200/50">Animation</h3>
                            <h3 className="text-gray-200/50">Thriller</h3>
                            <h3 className="text-gray-200/50">Crime</h3>
                            <h3 className="text-gray-200/50">Comedy</h3>
                        </div>
                        <div>
                            <h1 className="text-orange-400/80 font-bold">Links</h1>
                            <h3 className="text-gray-200/50">About Us</h3>
                            <h3 className="text-gray-200/50">My Account</h3>
                            <h3 className="text-gray-200/50">News</h3>
                            <h3 className="text-gray-200/50">Latest Events</h3>
                            <h3 className="text-gray-200/50">Privacy</h3>
                            <h3 className="text-gray-200/50">Contact Us</h3>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h1 className="text-orange-400/80 font-bold">Newsletter</h1>
                        <p className="text-gray-200/50">Subscribe to leitmotif newsletter this <br /> very day.</p>
                        <div className="flex justify-between bg-white px-6 py-3 mt-4">
                        <button className="text-gray-400/70 font-semibold">Enter your email  </button>
                        <button><IoIosSend className="w-5 h-5 text-orange-400"/></button>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" className="w-4 h-4 "/>
                            <p className="text-gray-200/50">I agree to all terms and policies of the company.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div className="bg-black/70 p-5">
            <p className="text-gray-200/50 text-center font-semibold">© 2026 Movie Booking. All Rights Reserved </p>
        </div>
        </>
        
    );
}