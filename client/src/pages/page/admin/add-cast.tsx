import AdminGuard from "@/components/AdminGaurd";
import { useState } from "react";

export default function AddCast() {
    const[name, setName] = useState("");
    const[image, setImage] = useState<string>("");
    const[role, setRole] = useState("");

    const uploadImage = async() => {
        if(!image) {
            alert("Please Select Image");
            return;
        } 
        const formData = new FormData();
        formData.append("file" , image);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image` , {
            method : "POST",
            body: formData,
        });

        const data = await res.json();
        if(res.ok) {
            setImage(data.image) // save url cloudinary secure_url
            alert("Image upload successfully");
        } else {
            alert(data.message || "Image not upload");
        }
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if(!name || !role) {
            alert("Name and role required");
            return;
        }

        const formData = new FormData();
        formData.append("actor_name" , name);
        formData.append("image" , image);
        formData.append("role" , role);

        const token = localStorage.getItem("token");
        const res = await fetch( "http://localhost:5175/api/casts" , {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`,},
            body: formData,
        });
        const data = await res.json();
        console.log("Cast Data : ", data);
        if(res.ok) {
            alert("Cast added successfully");
            window.location.reload();
        } else {
            alert(data.message || "Cast not added");
        }
    };

    return (
        <AdminGuard>
             <div className="absolute inset-0 backdrop-blur-2xl flex items-center justify-center p-10">
                <form onSubmit={handleSubmit}> 
                    <div className="bg-black/80 text-white flex  justify-between p-6 rounded-2xl mt-36 mb-10"> 
                        <div>
                            <h1 className="font-bold text-2xl text-orange-400 text-center">Add Cast</h1>
                             <h1 className="font-semibold mt-6 text-white">Name : <input onChange={(e) => setName(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full mt-1 text-black px-2"/></h1>
                            <h1 className="font-semibold mt-6 text-white">Role : <input onChange={(e) => setRole(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full mt-1 text-black px-2"/></h1>
                            
                            <div className="flex items-center gap-5">
                                <h1 className="font-semibold text-white">Image : <input type="file" accept=".png , .jpg , .jpeg , .pdf" 
                                onChange={async (e) => {
                                    const file = e.target.files?.[0] || null;
                                    if(!file) return;
                                    setImage(file);
                                }}
                                className="bg-gray-200 mt-4 rounded w-[70%] text-gray-600 ml-9 px-2"/></h1>
                                <button onClick={uploadImage} type="button"
                                className="bg-orange-400 mt-4 px-2 py-1 rounded font-semibold text-white">Upload_Image</button>
                            </div>
                            <button type="submit" 
                            className="bg-orange-400 block mx-auto mt-6 px-4 py-2 rounded-2xl font-semibold text-white">Add Cast
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminGuard>
    );
}