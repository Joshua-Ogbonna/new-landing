import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#C2EE03] text-[#121617] mt-[200px]">
      <div className="flex items-center justify-between w-full md:w-[1440px] mx-auto py-12 text-xl">
        <div>© My Sound {new Date().getFullYear()} all rights reserved</div>

        <div className="flex items-center gap-10">
          <div>
            <Link href="/">Terms & Condition</Link>
          </div>

          <div>
            <Link href="/">Privacy Policy</Link>
          </div>

          <div>
            <Link href="">Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
