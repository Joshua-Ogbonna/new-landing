"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Nav from "./Nav";
import Image from "next/image";
import Nav2 from "./Nav2";
import MarqueeComp from "./MarqueeComp";
// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray("section") as HTMLElement[];

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });
    });
  }, []);
  return (
    <div>
         <section className="section font-Nebulica relative w-full min-h-screen bg-black overflow-hidden">
      <Nav />
      
      <div className="container  px-4 lg:px-8 xl:px-16 flex flex-col lg:flex-row md:justify-between items-center min-h-screen lg:min-h-[calc(100vh-100px)] space-y-8 lg:space-y-0 py-8 lg:py-0">
      {/* Image Section - Responsive across all devices */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start xl:justify-center items-center">
        <div className="relative w-full max-w-[450px] sm:max-w-[400px] lg:max-w-[450px] xl:max-w-[470px] aspect-square top-[100px] md:top-[30px] left-[20px] md:left-0">
          <Image
            src="/slider1.png"
            alt="Artist with headphones"
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </div>

      {/* Text Section - Responsive typography */}
      <div className="w-full lg:w-1/2 left-[20px] md:left-[90px] text-center lg:text-right  relative  top-[130px] md:top-[90px] sm:space-y-3 lg:space-y-4">
        <h1 className="text-[45px] md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-none">
          <span className="block">
            <span className="text-white font-bold">For the Culture,</span>
          </span>
          <span className="block mt-1 sm:mt-2 lg:mt-4">
            <span className="text-white">For the Future,</span>
          </span>
          <span className="block mt-1 sm:mt-2 lg:mt-4">
            <span className="text-[#CCFF00]">For the Sound.</span>
          </span>
        </h1>
      </div>
    </div>


      {/* Marquee Section - Full Width with Enhanced Styling */}
    <MarqueeComp />
    </section>
      {/* slider 2 */}
      <section className="relative font-Nebulica bg-[#CCFF00] text-black min-h-screen flex flex-col justify-between overflow-hidden">
      <Nav2 />
      
      <div className="container mx-auto mt-28 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-8 md:py-16 relative z-10 flex-grow">
        {/* Image Container - Responsive positioning */}
        <div className="flex items-center justify-center relative h-[400px] md:h-[500px] lg:h-auto order-1">
          <div className="absolute bottom-0 lg:bottom-[-20px]">
            <img
              src="/slide2.png"
              alt="Artist with headphones"
              className="w-[300px] h-[350px] sm:w-[400px] sm:h-[450px] md:w-[450px] md:h-[500px] object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        {/* Text Content - Maintains right alignment on desktop */}
        <div className="flex flex-col justify-center mt-7 space-y-4 md:space-y-6 order-1 lg:order-2">
          <h2 className="hidden md:block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center lg:text-right relative bottom-0 lg:bottom-[10px] leading-tight  md:left-[-70px] md:leading-[90px] font-semibold">
            Rhythm
            <br />
            Roots <br /> Rise <br />
            <span className="text-black">Shape Music&apos;s Future</span>
          </h2>
          <h2 className="block md:hidden text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-center lg:text-right relative bottom-[80px] lg:bottom-[10px] leading-tight md:leading-[90px] font-semibold">
          Rhythm
            Roots  Rise Shape Music&apos;s Future
          </h2>
          <p className="font-poppins relative md:text-sm text-center bottom-[80px] lg:bottom-[10px]  lg:text-right md:left-[-70px] text-base text-black max-w-lg mx-auto lg:ml-auto lg:mr-0">
            Celebrating global beats, honoring heritage, and elevating artists. MySoundsglobal connects culture, creativity, and community.
          </p>
        </div>
      </div>
      
      {/* Marquee Section - Stays at the Bottom */}
      <div className="w-full bg-[#CCFF00] text-black">
        <MarqueeComp />
      </div>
    </section>

      {/* slider 3 */}
      <section className="relative font-Nebulica bg-black text-white min-h-screen overflow-hidden flex flex-col">
        <Nav />
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-8 md:py-16 relative z-10 flex-grow">
          {/* Image Container - Responsive positioning */}
          <div className="flex items-center justify-center relative h-[400px] md:h-[500px] lg:h-auto order-1">
            <div className="relative block">
              <img
                src="/vert.png"
                alt="Vertical design element"
                className="w-[100px] md:w-[150px] lg:w-[200px] h-[60vh] md:h-[80vh] lg:h-[100vh] object-center"
              />
            </div>
            <div className="absolute">
              <img
                src="/slider3Per.png"
                alt="Artist with headphones"
                className="w-[280px] h-auto sm:w-[350px] md:w-[400px] lg:w-[450px] lg:h-[500px] rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Text Content - Maintains right alignment on desktop */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center lg:text-right leading-tight md:leading-[90px] font-semibold text-[#CCFF00]">
              Signup Today
              <br />
              <span className="text-white">Shape Music&apos;s Future</span>
            </h2>
            <p className="font-poppins text-sm text-center lg:text-right text-gray-300 max-w-lg mx-auto lg:ml-auto lg:mr-0">
              Join MySounds today and take part in redefining the future of music—where creativity, culture, and community unite.
            </p>
          </div>
        </div>
        
        {/* Marquee Section with responsive positioning */}
        <div className="relative z-30 mt-8 lg:mt-0 lg:bottom-[190px] w-full">
          <MarqueeComp />
        </div>
      </section>
    </div>
  )
}

export default Slider