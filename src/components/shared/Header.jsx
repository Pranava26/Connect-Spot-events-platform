"use client";
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Header = () => {

    const { status } = useSession();

    const onSignout = async () => {
        await signOut();
    }

    return (
        <header className="w-full border-b">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="w-36">
                    <h1 className="p-bold-20 text-primary-500">Connect Spot</h1>
                </Link>

                <div>
                    <nav className="md:flex-between hidden w-full max-w-xs">
                        <NavItems />
                    </nav>
                </div>

                <div className="flex items-center w-32 justify-end gap-3">
                    <div>
                        {status === 'authenticated' ? (
                            <Button className="rounded-full" size="lg">
                                <span onClick={onSignout}>Logout</span>
                            </Button>
                        ) : (
                            <Button asChild className="rounded-full" size="lg">
                                <Link href="/sign-in" >Login</Link>
                            </Button>
                        )}
                    </div>
                    <div>
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
