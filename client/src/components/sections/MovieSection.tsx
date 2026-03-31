import { FaVideo } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { FaMicrophone } from "react-icons/fa";


export default function MovieSection() {
    return (
        <section className="bg-white w-full py-10">
            <div className="">
                <div className="md:flex md:justify-center gap-16 px-8 py-6">
                    <div className="flex bg-black justify-center gap-5 px-8 py-3 mt-6">
                        <div>
                            <h1 className="text-white text-xs">Join Now</h1>
                            <h1 className="text-white font-bold text-xl">Upcoming <br />Film Festivals</h1>
                        </div>    
                        <div>
                            <button className="rounded-full bg-orange-400 p-4 mt-3"><FaVideo className="text-white w-7 h-7"/></button>
                        </div>
                    </div>
                    <div className="flex bg-black justify-center gap-5 px-8 py-3 mt-6">
                        <div>
                            <h1 className="text-white text-xs">Watch Now</h1>
                            <h1 className="text-white font-bold text-xl">Watch Film <br />Awards</h1>
                        </div>
                        <div>
                            <button className="rounded-full bg-orange-400 p-4 mt-3"><TbMovie className="text-white w-7 h-7"/></button>
                        </div>
                    </div>
                    <div className="flex bg-black justify-center gap-5 px-8 py-3 mt-6">
                        <div>
                            <h1 className="text-white text-xs">Get Ticket</h1>
                            <h1 className="text-white font-bold text-xl">Comedy TV  <br /> Shows</h1>
                        </div>
                        <div>
                            <button className="rounded-full bg-orange-400    p-4 mt-3"><FaMicrophone className="text-white w-7 h-7"/></button>
                        </div>
                    </div>
                </div>

                <div className="grid place-items-center py-5">
                    <TbMovie className="text-orange-400 w-5 h-5 "/>
                    <h1 className="text-xs p-3 text-black">Watch New Movies</h1>
                    <h1 className="text-3xl font-bold text-black">Movies Now Playing</h1>
                </div>

            </div>
        </section>
    );
}