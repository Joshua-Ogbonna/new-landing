import Image from "next/image";
import React from "react";
import Link from "next/link";
const Grow = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-10 font-poppins">
      <div className="w-full md:px-20 px-10 flex flex-col md:flex-row items-center gap-10
      bg-[#D9D9D914] rounded-[20px] sm:rounded-[40px]">
        <div className="flex justify-center md:justify-start w-full">
  <Image
    src="/grow2.png"
    alt="man"
    width={200}
    height={200}
    className="w-full max-w-[900px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[425px] rounded-2xl my-6 md:my-10 h-auto md:h-[500px]"
  />


        </div>

        <div className="md:text-center">
          <h2 className="font-normal md:font-medium lg:font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-Nebulica text-white md:text-left max-w-full">
            Grow Revenue <br />as an Artiste
          </h2>
          <div className="flex justify-center md:justify-start">
          <Link href='/create'>
            <button className="w-full sm:w-auto px-6 py-3 md:py-4 lg:py-5 font-normal text-base sm:text-lg md:text-xl text-[#515151] bg-[#C2EE03] rounded-lg md:rounded-xl mt-4 md:mt-6 min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[289px] mb-10 md:mb-0">
              Get Started
            </button>
            </Link >
          </div>
        </div>
      </div>


    </div>

  );
};

export default Grow;