"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/sign-up", user)
            router.push("/sign-in");

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <>
            {loading ? "Processing..." : (
                <div className="bg-white p-8 rounded-lg">
                    <div className="mb-4">
                        <h2 className="text-center text-xl font-bold leading-tight">Create your account</h2>
                        <p className="mt-2 text-center text-sm text-black/60 dark:text-white">
                            Already have an account?&nbsp;
                            <Link
                                href="/sign-in"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <label htmlFor="username" >Username:</label>
                            <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full" id="username" />
                        </div>
                        <div>
                            <label htmlFor="email" >Email:</label>
                            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full" id="email" />
                        </div>
                        <div>
                            <label htmlFor="password" >Password:</label>
                            <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full" id="password" />
                        </div>
                        <button onClick={onSignup} disabled={buttonDisabled} className={`py-2 text-white ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600'} transition-all duration-200`}>Sign Up</button>
                    </div>
                </div>
            )}
        </>
    )
}