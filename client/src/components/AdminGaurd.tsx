import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminGuard({children}: {children: React.ReactNode}) {
    const router = useRouter();

    useEffect(()=> {
        const users = localStorage.getItem("user");
        if(!users) {
            router.replace("/login");
            return;
        } 
        const parsedUser = JSON.parse(users);
        if(parsedUser.role !== "ADMIN") {
            router.replace("/profile");
        }
    },[]);
    return <>{children}</>
}