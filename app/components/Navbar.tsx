"use client";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  background: string;
  logo: string;
  color: string;
  hoverColor: string;
}

const Navbar = ({
  background,
  logo,
  color,
  hoverColor,
}: NavbarProps) => {
  return (
    <nav
      className="w-full"
      style={{
        backgroundColor: background,
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center w-[144px] h-[91px]">
          <Image
            src={logo}
            alt="MySound Logo"
            width={244}
            height={191}
            className="w-full h-full"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link
            href="/"
            className={`${color} hover:text-[${hoverColor}] transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${color} hover:text-[${hoverColor}] transition-colors`}
          >
            About us
          </Link>
          <Link
            href="/courses"
            className={`${color} hover:text-[${hoverColor}] transition-colors`}
          >
            Course Page
          </Link>
          <Link
            href="/community"
            className={`${color} hover:text-[${hoverColor}] transition-colors`}
          >
            Community
          </Link>
          <Link
            href="/contact"
            className={`${color} hover:text-[${hoverColor}] transition-colors`}
          >
            Talk to Us
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 text-base">
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
    </nav>
  );
};

export default Navbar;
