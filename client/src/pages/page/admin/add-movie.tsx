import AdminGuard from "@/components/AdminGaurd";
import { useState } from "react";

export default function AddMovie() {
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[image, setImage] = useState<string>("");
    const[video, setVideo] = useState<string>("");
    const[rating, setRating] = useState<number>(0);
    const[language, setLanguage] = useState("");
    const[genre, setGenre] = useState("");
    const[runtime, setRuntime] = useState("");
    const[release_year , setRelease_year] = useState("");

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

    const uploadVideo = async() => {
        if(!image) {
            alert("Please Select Video");
            return;
        } 
        const formData = new FormData();
        formData.append("file" , video);

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/video" , {
            method : "POST",
            body: formData,
        });

        const data = await res.json();
        if(res.ok) {
            setVideo(data.video) // save url
            alert("Video upload successfully");
        } else {
            alert(data.message || "Video not upload");
        }
    };

    // const uploadVideo = async() => {
    //     if(!video) {
    //         alert("Please Select Video");
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append("file" , video);

    //     const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/video" , {
    //         method: "POST", 
    //         body: formData,
    //     });
    //     const data = await res.json();
    //     console.log(res)
    //     if(res.ok) {
    //         setVideo(data.videourl);
    //         alert("video upload successfully");
    //     } else {
    //         alert(data.message || "video not upload");
    //     }
    // };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if(!title || !description) {
            alert("Title and Description required");
            return;
        }
        const formData = new FormData();
        formData.append("title" , title);
        formData.append("description" , description);
        formData.append("image" , image);
        formData.append("video" , video);
        formData.append("rating" , rating);
        formData.append("language" , language);
        formData.append("genre" , genre);
        formData.append("runtime" , runtime);
        formData.append("release_year" , release_year);

        const token = localStorage.getItem("token");
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/movies" , {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` ,} ,
            body: formData,
        });
        const data = await res.json();   
        if(res.ok) {
            alert("Movie added Successfully");
            window.location.reload();
        } else {
            alert(data.message || "Movie not added");
        }
    };

    return (
        <AdminGuard>
            <div className="absolute inset-0 backdrop-blur-2xl flex items-center justify-center p-10">
                <form> 
                    <div className="bg-black/80 text-white flex  justify-between p-6 rounded-2xl mt-36 mb-10"> 
                        <div>
                            <h1 className="font-bold text-2xl text-orange-400 text-center">Add Movie</h1>
                             <h1 className="font-semibold mt-6 text-white">Movie Title : <input onChange={(e) => setTitle(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full mt-1 text-black px-2"/></h1>
                            <p className="font-semibold mt-4 text-white">Description : <textarea onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-200 rounded w-full mt-1 text-black px-2"/> </p>
                            <h1 className="font-semibold mt-6 text-white">Language : <input onChange={(e) => setLanguage(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full mt-1 text-black px-2"/></h1>
                            <h1 className="font-semibold mt-6 text-white">Genre : <input onChange={(e) => setGenre(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full mt-1 text-black px-2"/></h1>
                            <h1 className="font-semibold mt-6 text-white">Runtime : <input onChange={(e) => setRuntime(e.target.value)}
                            type="text" className="bg-gray-200 rounded w-full mt-1 text-black px-2"/></h1>
                            <h1 className="font-semibold mt-6 text-white">Release Year : <input onChange={(e) => setRelease_year(e.target.value)}
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
                            <div className="flex items-center gap-5">
                                <h1 className="font-semibold text-white">Video : <input type="file" accept="video/mp4 , video/mkv, video/webm "
                                onChange={async (e) => {
                                    const file = e.target.files?.[0] || null;
                                    if(!file) return;
                                    setVideo(file);
                                }} 
                                className="bg-gray-200 mt-4 rounded w-[70%] text-gray-600 ml-9 px-2"/> </h1>
                                <button onClick={uploadVideo} type="button"
                                className="bg-orange-400 mt-4 px-2 py-1 rounded font-semibold text-white">Upload_Video</button>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="font-semibold text-white">Rating (1-5) : </label>
                                {/* <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="bg-gray-200/50 rounded px-2 py-1 ml-2 w-20" /> */}
                                <div className="flex gap-2 text-3xl cursor-pointer ">
                                    {[1,2,3,4,5,6,7,8,9,10].map((star) => (
                                        <span key={star} onClick={() => setRating(star)}
                                        className={star <= rating ? "text-yellow-400" : "text-gray-400"}>★</span>
                                    ))}
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Selected Rating : {rating} /5
                                </p>
                            </div>
                            <button onClick={handleSubmit} type="submit"
                            className="bg-orange-400 block mx-auto mt-6 px-4 py-2 rounded-2xl font-semibold text-white">Add Movie</button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminGuard>
    );
}