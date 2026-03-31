export default function Header() {
    // return <div className="mt-5">Welcome </div>
    return (
        <section className="bg-black/80">
            <div>
                <img src="HeroSectionMovie.jpg" alt="Movie Image" className="container  w-full md:h-96 blur-sm"   />
                <div className="absolute inset-0   ">
                    <img src="HeroSectionMovie.jpg" alt="" className="container w-[60%] h-48 ml-24 mt-24 md:w-[60%] md:h-72 md:mt-32 md:ml-64"/>
                </div>
            </div>
        </section>
    );
}