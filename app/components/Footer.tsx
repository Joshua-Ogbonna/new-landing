import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#C2EE03] text-[#121617] font-poppins mt-[70px] px-6">
      {/* <div className="flex flex-col-reverse md:flex-row justify-start md:justify-between max-w-[1440px] py-6 text-lg  md:text-left">
        <div>© My Sound {new Date().getFullYear()} All rights reserved</div>

        <div className="flex flex-col md:flex-row flex-wrap justify-start  md:justify-end items-center gap-6 mt-4 md:mt-0">
          <Link href="/" className="hover:underline">Terms & Condition</Link>
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Cookies</Link>
        </div>
      </div> */}
    <div className="flex flex-col-reverse md:flex-row md:justify-between py-6">
    <div>© My Sound {new Date().getFullYear()} All rights reserved</div>
    <div className="flex flex-col md:flex-row  md:justify-end md:items-center gap-6 mt-4 md:mt-0">
          <Link href="/" className="hover:underline">Terms & Condition</Link>
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Cookies</Link>
        </div>
    </div>

      {/* <div className="bg-[#C2EE03] text-[#121617] font-poppins mt-[200px] px-6">
  <div className="flex flex-col max-w-[1440px] mx-auto py-6 text-lg">
    <div className="flex flex-col md:flex-row flex-wrap gap-6 mb-4 md:mb-0">
      <Link href="/" className="hover:underline">Terms & Condition</Link>
      <Link href="/" className="hover:underline">Privacy Policy</Link>
      <Link href="/" className="hover:underline">Cookies</Link>
    </div>
    
    <div className="text-left">© My Sound {new Date().getFullYear()} All rights reserved</div>
  </div>
</div> */}
    </div>
  );
};

export default Footer;
