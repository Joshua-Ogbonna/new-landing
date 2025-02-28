import Image from "next/image";
import React from "react";

const Grow = () => {
  return (
    <div className="w-full md:max-w-[1440px] mx-auto bg-[#D9D9D914] rounded-[67px] md:min-h-[744px] flex items-center px-12 gap-12">
      <Image src="/man.png" alt="man" width={625} height={633} />

      <div>
        <h2 className="font-[600] text-7xl text-white w-[628px]">Grow Revenue <br />as an Artiste</h2>
        <button className="w-[289px] h-[80px] font-normal text-xl text-[#515151] bg-[#C2EE03] rounded-xl px-6 py-3 mt-6">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Grow;
