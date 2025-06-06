"use client";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav2() {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };
    
    return (
        <div>
            <div 
                className="flex flex-row justify-between items-center p-2 md:px-32 
                bg-[#CCFF00]/90 text-white fixed top-0 left-0 right-0 z-[1000] 
                backdrop-blur-xs"
            >
                <div>
                    <Link href="/">
                        <Image src='/Newblacklogo.png' alt="" width={100} height={100} />
                    </Link>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-5 font-medium p-1 cursor-pointer">
                    <Link
                        href="#about"
                        className="text-black text-[20px] hover:text-white transition-all"
                    >
                        About Us
                    </Link>
                    <Link
                        href="#objectives"
                        className="text-black text-[20px] hover:text-white transition-all"
                    >
                        Objectives
                    </Link>
                    <Link
                        href="#values"
                        className="text-black text-[20px] hover:text-white transition-all"
                    >
                        Values
                    </Link>
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4 text-base">
                    <Link
                        href="/create"
                        className="bg-[#313133] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Sign up
                    </Link>
                    <Link
                        href="/signIn"
                        className="bg-black text-[#CCFF00] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Sign in
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden cursor-pointer" onClick={handleNav}>
                    {nav ? (
                        <AiOutlineClose size={30} className="text-black" />
                    ) : (
                        <AiOutlineMenu size={30} className="text-black" />
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-black 
                md:hidden transform transition-transform duration-300 
                ${nav ? 'translate-y-0' : '-translate-y-full'} 
                z-[999] flex flex-col items-center justify-start gap-6 pt-24 px-8`}
            >
                <div className="absolute top-4 right-4" onClick={handleNav}>
                    <AiOutlineClose size={30} className="text-[#CCFF00]" />
                </div>

                <Link
                    href="#about"
                    className="text-[#CCFF00] text-3xl font-medium hover:text-yellow-300 transition-all w-full text-center"
                    onClick={handleNav}
                >
                    About Us
                </Link>
                <Link
                    href="#objectives"
                    className="text-[#CCFF00] text-3xl font-medium hover:text-yellow-300 transition-all w-full text-center"
                    onClick={handleNav}
                >
                    Our Objectives
                </Link>
                <Link
                    href="#values"
                    className="text-[#CCFF00] text-3xl font-medium hover:text-yellow-300 transition-all w-full text-center"
                    onClick={handleNav}
                >
                    Our Values
                </Link>
                {/* <Link
                    href="#"
                    className="text-[#CCFF00] text-3xl font-medium hover:text-yellow-300 transition-all w-full text-center"
                    onClick={handleNav}
                >
                    Our Team
                </Link> */}
                {/* <Link
                    href="#"
                    className="text-[#CCFF00] text-3xl font-medium hover:text-yellow-300 transition-all w-full text-center"
                    onClick={handleNav}
                >
                    Contact Us
                </Link> */}
                
                {/* Mobile Auth Buttons - Fixed visibility */}
                <div className="flex flex-col w-full gap-4 mt-6">
                    <Link
                        href="/create"
                        className="bg-[#313133] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-xl text-center w-full"
                        onClick={handleNav}
                    >
                        Sign up
                    </Link>
                    <Link
                        href="/signIn"
                        className="bg-black border-2 border-[#CCFF00] text-[#CCFF00] py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-xl text-center w-full"
                        onClick={handleNav}
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}