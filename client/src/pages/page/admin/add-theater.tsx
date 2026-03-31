import AdminGuard from "@/components/AdminGaurd";
import { useState } from "react";

export default function AddTheater({onClose} : {onClose : () => void}) {
    const [name , setName] = useState("");
    const[city, setCity] = useState("");
    const[address, setAddress] = useState("");
    const[totle_screens , setTotle_screens] = useState<number>(0);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if(!name || !address) {
            alert("Theater Name and Address Required");
            return;
        }

        const token = localStorage.getItem("token");
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/theater" , {
            method: "POST",
            headers: { "Content-Type" : "application/json" , Authorization: `Bearer ${token}`  },
            body: JSON.stringify({name, city, address, totle_screens}),
        });
        const data = await res.json();
        if(res.ok) {
            alert("Theater added successfull");
            window.location.reload();
        } else {
            alert( data.message + "Theater not added");
        }
    };

    return (
        <AdminGuard>
            <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center">
                <form onSubmit={handleSubmit} className="container ">
                    <div className="bg-black/80 flex  justify-between p-6 rounded-2xl ">
                        <div>
                            <h1 className="font-bold text-2xl text-orange-400 text-center">Add Theater</h1>
                             <h1 className="font-semibold mt-6 text-white">Name : <input onChange={(e) => setName(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full text-black px-2 mt-1"/></h1>
                            <h1 className="font-semibold mt-6 text-white">City : <input onChange={(e) => setCity(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full text-black px-2 mt-1" /></h1>
                            <p className="font-semibold mt-6 text-white">Address : <textarea onChange={(e) => setAddress(e.target.value)}
                            className="bg-gray-200 rounded w-full text-black px-2 mt-1"></textarea> </p>
                            <h1 className="font-semibold mt-6 text-white">Total Screen : <input onChange={(e) => setTotle_screens(Number(e.target.value))}
                            type="number" className="bg-gray-200 rounded w-full text-black px-2 mt-1" /></h1>
                            <button  type="submit" 
                            className="block mx-auto  bg-orange-400 mt-6 px-4 py-2 rounded-2xl font-semibold text-white">Add Theater</button>
                        </div>
                        <div>
                            <button type="button" onClick={() =>onClose()} className="right-56 text-xl text-white">X</button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminGuard>
    );
}