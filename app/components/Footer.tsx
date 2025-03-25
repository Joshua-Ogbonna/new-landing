import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#C2EE03] text-[#121617] font-poppins mt-[200px] px-6">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto py-6 text-lg  md:text-left">
        <div>© My Sound {new Date().getFullYear()} All rights reserved</div>

        <div className="flex flex-wrap justify-start  md:justify-end items-center gap-6 mt-4 md:mt-0">
          <Link href="/" className="hover:underline">Terms & Condition</Link>
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Cookies</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
