import { useState } from "react";
import {signIn} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { FaApple } from "react-icons/fa";

export default function Signup({onClose} : {onClose : () => void}) {
    const [form , setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form , [e.target.name] : e.target.value});
    };
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/register" , {
            method: "POST" , 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if(!res.ok) {
            alert(data.message);
            return;
        }
        console.log("User Registered : ", data);
        alert("Register Successfully");
        onClose();
    };

    return (
        <>
        <div className=" fixed inset-0 backdrop-blur-2xl flex items-center justify-center ">
            <form onSubmit={handleSubmit}>
            <div className="flex bg-white  p-6  justify-between rounded-2xl ">
                    <div>
                        <h1 className="text-black text-2xl text-center font-semibold">Register</h1>
    
                        <h1>Email : </h1>
                        <input type="email" placeholder="Email" 
                        name="email" value={form.email} onChange={handleChange}
                        className="w-full px-3 py-1 bg-gray-200/50 mt-2 rounded "/>
                        <h1>Password : </h1>
                        <input type="password" placeholder="Password" 
                        name="password" value={form.password} onChange={handleChange}
                        className="w-full px-3 py-1 bg-gray-200/50 mt-2 rounded "/>
                        <button className="w-full bg-orange-400/60 mt-4 rounded px-3 py-1 text-white font-semibold" type="submit" >Register</button>
                        <div className="flex items-center justify-between p-3">
                            <hr className="w-44 border border-gray-200/60" />
                            <h1 className="text-gray-400" >OR</h1>
                            <hr className="w-44 border border-gray-200/60"/>
                        </div>
                        <div className="bg-white border border-gray-400/50 w-full flex items-center justify-center rounded">
                            <FcGoogle className="w-5 h-5 "/>
                            <button onClick={() => signIn("google")}
                            className=" p-2 font-semibold"> Continue with Google</button>
                        </div>
                        <div className="bg-white border border-gray-400/50 w-full flex items-center justify-center mt-7 rounded">
                            <MdOutlineMail className="w-5 h-5"/>
                            <button onClick={() => signIn("email")}
                            className=" p-2 font-semibold"> Continue with Email</button>
                        </div>
                        <div className="bg-white border border-gray-400/50 w-full flex items-center justify-center mt-7 rounded">
                            <FaApple className="w-5 h-5"/>
                            <button onClick={() => signIn("apple")}
                            className=" p-2 font-semibold"> Continue with Apple</button>
                        </div>
                    </div>
                    <div>
                        <button type="button" onClick={onClose} className="right-56 text-xl">X</button>
                    </div>
            </div>
            </form>
        </div>
        </>
    );
}