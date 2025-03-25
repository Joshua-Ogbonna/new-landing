import Image from "next/image";
import React from "react";

const Grow = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-10 font-poppins">
     <div className="w-full lg:max-w-[1440px] mx-auto bg-[#D9D9D914] rounded-[20px] sm:rounded-[40px] md:rounded-[67px] flex flex-col md:flex-row items-center justify-between px-6 sm:px-8">
    <div className="flex justify-center md:justify-start">
         <Image 
            src="/grow.jpg" 
            alt="man" 
            width={200} 
            height={200} 
            className="w-[200px] sm:w-[100px]  h-auto"
          />
        </div>
        <div className="text-center">
          <h2 className="font-normal md:font-medium lg:font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-Nebulica text-white md:text-left max-w-full">
          Grow Revenue <br />as an Artiste
          </h2>
          <div className="flex justify-center md:justify-start">
            <button className="w-full sm:w-auto px-6 py-3 md:py-4 lg:py-5 font-normal text-base sm:text-lg md:text-xl text-[#515151] bg-[#C2EE03] rounded-lg md:rounded-xl mt-4 md:mt-6 min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[289px]">
              Get Started
            </button>
          </div>
        </div>
      </div>

    
    </div>
    // <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-10 font-poppins">
    //   <div className="w-full lg:max-w-[1440px] mx-auto bg-[#D9D9D914] rounded-[20px] sm:rounded-[40px] md:rounded-[67px] flex flex-col md:flex-row items-center justify-between px-6 sm:px-8  py-8 sm:py-10 gap-6 md:gap-12">
    //     <div className="w-full md:w-auto flex justify-center md:justify-start">
    //       <Image 
    //         src="/grow.jpg" 
    //         alt="man" 
    //         width={200} 
    //         height={200} 
    //         className="w-[200px] sm:w-[100px] md:w-[350px] lg:w-[425px] h-auto"
    //       />
    //     </div>
    //     <div className="text-center">
    //       <h2 className="font-normal md:font-medium lg:font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-Nebulica text-white md:text-left max-w-full">
    //         Grow Revenue <br />as an Artiste
    //       </h2>
    //       <div className="flex justify-center md:justify-start">
    //         <button className="w-full sm:w-auto px-6 py-3 md:py-4 lg:py-5 font-normal text-base sm:text-lg md:text-xl text-[#515151] bg-[#C2EE03] rounded-lg md:rounded-xl mt-4 md:mt-6 min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[289px]">
    //           Get Started
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Grow;