import { useEffect , useRef, useState } from "react";
import { useRouter } from "next/router";
import { LiaUserEditSolid } from "react-icons/lia";
import { TbSettings } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

type User = {
    id: string,
    name : string,
    email: string,
    role: string,
};

export default function Profile() {
    const router = useRouter();
    const [user , setUser] = useState<User | null>(null);
    const [open , setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        const token = localStorage.getItem("token");
        const storeUser = localStorage.getItem("user");
        if(!token || !storeUser) {
            router.push("/");
            return; 
        }

        setUser(JSON.parse(storeUser));
            
        fetch( process.env.NEXT_PUBLIC_API_URL + "/api/auth/profile" , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => {
            if(!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(data => setUser(data.user))
        .catch(() => {
            console.warn("Token validation failed");
        });
    } , [router]);

    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if(
                dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown" , handleClickOutSide);
        return () => document.removeEventListener("mousedown" ,handleClickOutSide);
    } ,[]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
        window.location.reload();
    };

    if(!user) return <p>Loading...</p>;

    return (
        <div className="absolute right-0 mr-6 rounded-2xl p-6 bg-white border border-gray-600  " ref={dropdownRef}>
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-xs text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-400">{user.role}</p>

            <button className="flex items-center gap-3 px-3 py-2 mt-3 hover:bg-gray-200 rounded-2xl font-semibold w-full cursor-pointer">
                <strong><LiaUserEditSolid  className="w-5 h-5"/></strong>
                Edit Profile
            </button>

            <button className="flex items-center gap-3 px-3 py-2 mt-2 hover:bg-gray-200 rounded-2xl font-semibold w-full cursor-pointer"> 
                <strong><TbSettings className="w-5 h-5"/></strong> 
                Setting
            </button>

            {user.role === "ADMIN" && (
                <button className="flex items-center gap-3 px-3 py-2 mt-2 hover:bg-gray-200 rounded-2xl font-semibold w-full cursor-pointer"
                onClick={() => router.push("/page/admin/dashboard")}> 
                    <strong><FaRegUser /></strong> 
                    Admin Profile
                </button>
            )}

            <hr className="w-full mt-3 text-gray-300 "/>

            <button className="flex items-center gap-3 px-3 py-2 mt-2 hover:bg-gray-200 rounded-2xl font-semibold w-full cursor-pointer"
            onClick={handleLogout}> 
                <strong><IoLogOutOutline className="w-5 h-5"/></strong> 
                Logout
            </button>
        </div>
    );
}