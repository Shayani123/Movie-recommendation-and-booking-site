import { HiCheckCircle } from "react-icons/hi";

export default function Hero() {
    return(
        <section className="bg-black w-full py-26 ">
            <div className="md:flex items-center gap-5 p-6 md:px-36 md:py-6 ">
                <div>
                    <h1 className="text-orange-400/60 font-bold text-xl py-5">Adventure Movie</h1>
                    <h1 className="text-white font-bold text-4xl ">Beauty And <br /> The Beast</h1>
                    <p className="text-white/70 mt-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam eveniet eum magnam doloribus explicabo. Cum veniam sed ab molestiae eaque, sint alias debitis aliquam minima hic quasi a. Omnis, accusamus.</p>

                    <div className="flex gap-10 mt-5 font-semibold">
                        <div className="flex items-center bg-orange-400 px-3 py-1 text-white gap-1">
                            <HiCheckCircle />
                            <button>More Info</button>
                        </div>
                        <div className="flex items-center bg-white px-3 py-1 gap-1 font-semibold">
                            <HiCheckCircle />
                            <button>Get Ticket</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="HeroSectionMovie.jpg" alt="movie image" className="py-10"/>
                </div>
            </div>
        </section>
    );
}