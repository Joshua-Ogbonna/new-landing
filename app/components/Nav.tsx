"use client";
// import { a } from "react-scroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Nav() {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div>
      <div 
        className="flex flex-row justify-between items-center p-2 md:px-32 
        bg-black/70 text-white fixed top-0 left-0 right-0 z-[1000] 
        backdrop-blur-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <div>
          <Link href="/">
            <Image src="/NewGreenLogo.png" alt="" width={100} height={100} />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 font-medium p-1 cursor-pointer">
          <Link
            href="#about"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            About Us
          </Link>
          <Link
            href="#objectives"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            Objectives
          </Link>
          <Link
            href="#values"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            Values
          </Link>
          {/* <Link
            href="#"
            className="text-[#d4ff03] text-[20px] hover:text-white transition-all"
          >
            Team
          </Link> */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden cursor-pointer" onClick={handleNav}>
          {nav ? (
            <AiOutlineClose size={30} />
          ) : (
            <AiOutlineMenu size={30} />
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 text-base">
          <Link
            href="/create"
            className={`bg-[#313133] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
          >
            Sign up
          </Link>
          <Link
            href="/signIn"
            className={`bg-[#CCFF00] text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
  className={`fixed top-0 left-0 w-full h-screen bg-[#CCFF00] 
  md:hidden transform transition-transform duration-300 
  ${nav ? 'translate-y-0' : '-translate-y-full'} 
  z-[999] flex flex-col items-start justify-start gap-6 pt-40 px-8`}
>
  <div className="absolute top-4 right-4" onClick={handleNav}>
    <AiOutlineClose size={30} className="text-black" />
  </div>

  <Link
    href="#"
    className="text-black text-3xl font-medium hover:text-yellow transition-all"
    onClick={handleNav}
  >
    About Us
  </Link>
  <Link
    href="#"
    className="text-black text-3xl font-medium hover:text-yellow transition-all"
    onClick={handleNav}
  >
    Our Objectives
  </Link>
  <Link
    href="#"
    className="text-black text-3xl font-medium hover:text-yellow transition-all"
    onClick={handleNav}
  >
    Our Values
  </Link>
  <Link
    href="#"
    className="text-black text-3xl font-medium hover:text-yellow transition-all"
    onClick={handleNav}
  >
    Our Team
  </Link>
  <Link
    href="#"
    className="text-black text-3xl font-medium hover:text-yellow transition-all"
    onClick={handleNav}
  >
    Contact Us
  </Link>
  <div className="flex flex-col items-start gap-4 mt-6">
    <Link
      href="/create"
      className={`bg-[#313133] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-xl`}
    >
      Sign up
    </Link>
    <Link
      href="/signIn"
      className={`bg-[#CCFF00] border-2 border-black text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-xl`}
    >
      Sign in
    </Link>
  </div>
</div>
    </div>
  );
}
