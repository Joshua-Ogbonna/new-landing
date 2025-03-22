"use client";
// import { a } from "react-scroll";
import { AiOutlineMenu } from "react-icons/ai";
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
      <div className="flex flex-row justify-between items-center p-5 md:px-32 bg-black text-white sticky shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div>
          <Link href="/">
            <Image src="/brl.png" alt="" width={100} height={100} />
          </Link>
        </div>
        <nav className="hidden mt-7 md:flex gap-5 font-medium p-1 cursor-pointer">
          <Link
            href="#"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            Objectives
          </Link>
          <Link
            href="#"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            Values
          </Link>
          <Link
            href="#"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            Team
          </Link>
        </nav>
        <div className="flex md:hidden cursor-pointer" onClick={handleNav}>
          <div className="p-2">
            <AiOutlineMenu size={30} />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-base">
          <Link
            href="/#"
            className={`bg-[#313133] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
          >
            Sign up
          </Link>
          <Link
            href="/#"
            className={`bg-[#CCFF00] text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
          >
            Sign in
          </Link>
        </div>
      </div>
      <div
        className={`md:hidden flex flex-col absolute mt-4 right-[300px] text-center bg-[#d4ff03] w-full h-fit transition-all duration-300 font-semibold py-8 gap-6 ${
          nav ? "opacity-100 visible" : "opacity-0 invisible hidden"
        }`}
      >
        {/* mobile nav */}
        <Link
          href="#"
          className="text-white text-[20px] hover:text-[#d4ff03] transition-all"
        >
          About Us
        </Link>
        <Link
          href="#"
          className="text-white text-[20px] hover:text-[#d4ff03] transition-all"
        >
          Our Objectives
        </Link>
        <Link
          href="values"
          className="text-white text-[20px] hover:text-[#d4ff03] transition-all"
        >
          Our Values
        </Link>
        <Link
          href="#"
          className="text-white text-[20px] hover:text-[#d4ff03] transition-all"
        >
          Our Team
        </Link>
        <Link
          href="#"
          className="text-white text-[20px] hover:text-[#d4ff03] transition-all"
        >
          Contact Us
        </Link>
        {/* Added sign up and sign in buttons to mobile menu */}
        <div className="flex flex-col items-center gap-4 mt-2">
          <Link
            href="/#"
            className={`bg-[#313133] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-32`}
          >
            Sign up
          </Link>
          <Link
            href="/#"
            className={`bg-black text-[#d4ff03] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-32`}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}