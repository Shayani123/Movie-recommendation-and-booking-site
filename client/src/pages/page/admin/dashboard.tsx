// import AdminGuard from "@/components/AdminGaurd";
// import { useRouter } from "next/router";

// export default function AdminDashboard() {
//     const router = useRouter();

//     return(
//         <AdminGuard>
//             <div className="bg-white px-4 py-2">
//                 <h1 className="text-2xl font-semibold">Admin DashBoard</h1>
//                 <button onClick={() => router.push("/admin/add-movie")}
                 
//                 >Add Movie</button>
//             </div>
//         </AdminGuard>
//     );
// }

// import AdminGuard from "@/components/AdminGuard";
import AdminGuard from "@/components/AdminGaurd";
import { LiaUserEditSolid } from "react-icons/lia";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useRouter } from "next/router";


export default function AdminDashboard() {
    const router = useRouter();
    
    return (
        <AdminGuard>
            <div className=" bg-white px-4 py-26" >
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                <div className="flex items-center gap-14 ">
                    <button onClick={() => router.push("/page/admin/add-movie")} 
                    className="flex items-center gap-3  mt-3 hover:bg-gray-200 px-4 py-2 rounded-xl font-semibold">
                        <strong ><BiSolidMoviePlay className="w-5 h-5"/></strong> 
                        Add Movie
                    </button>

                    <button onClick={() => router.push("/page/admin/add-theater")} 
                    className="flex items-center gap-3  mt-3 hover:bg-gray-200 px-4 py-2 rounded-xl font-semibold">
                        <strong ><BiSolidMoviePlay className="w-5 h-5"/></strong> 
                        Add Theater
                    </button>

                    <button onClick={() => router.push("/page/admin/add-show")} 
                    className="flex items-center gap-3  mt-3 hover:bg-gray-200 px-4 py-2 rounded-xl font-semibold">
                        <strong ><BiSolidMoviePlay className="w-5 h-5"/></strong> 
                        Add Show
                    </button>

                    <button onClick={() => router.push("/page/admin/add-seat")} 
                    className="flex items-center gap-3  mt-3 hover:bg-gray-200 px-4 py-2 rounded-xl font-semibold">
                        <strong ><BiSolidMoviePlay className="w-5 h-5"/></strong> 
                        Add Seat
                    </button>

                    <button onClick={() => router.push("/page/admin/add-cast")} 
                    className="flex items-center gap-3  mt-3 hover:bg-gray-200 px-4 py-2 rounded-xl font-semibold">
                        <strong ><BiSolidMoviePlay className="w-5 h-5"/></strong> 
                        Add Cast
                    </button>
                </div>

                <div className="flex items-center gap-14">
                    <button className="flex items-center gap-3 mt-3 hover:bg-gray-200  px-4 py-2 rounded-xl font-semibold"> 
                        <strong><LiaUserEditSolid  className="w-5 h-5"/></strong>
                        Edit Movie 
                    </button>
                    <button className="flex items-center gap-3 mt-3 hover:bg-gray-200  px-4 py-2 rounded-xl font-semibold"> 
                        <strong><LiaUserEditSolid  className="w-5 h-5"/></strong>
                        Edit Theater 
                    </button>
                    <button className="flex items-center gap-3 mt-3 hover:bg-gray-200  px-4 py-2 rounded-xl font-semibold"> 
                        <strong><LiaUserEditSolid  className="w-5 h-5"/></strong>
                        Edit Show 
                    </button>
                    <button className="flex items-center gap-3 mt-3 hover:bg-gray-200  px-4 py-2 rounded-xl font-semibold"> 
                        <strong><LiaUserEditSolid  className="w-5 h-5"/></strong>
                        Edit Seat 
                    </button>
                </div>
            </div>  
        </AdminGuard>
    );
}