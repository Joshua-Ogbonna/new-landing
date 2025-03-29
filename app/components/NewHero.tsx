"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Nav from "./Nav";
import Image from "next/image";
import Nav2 from "./Nav2";
import MarqueeComp from "./Marq2";
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
      
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 flex flex-col lg:flex-row justify-between items-center min-h-[calc(100vh-100px)] space-y-8 lg:space-y-0">
        {/* Image Section - Desktop Optimization */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start xl:justify-center items-center">
          <div className="relative top-[100px] w-full max-w-[500px] xl:max-w-[470px] aspect-square">
            <Image
              src="/slider1.png"
              alt="Artist with headphones"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>

        {/* Text Section - Desktop Typography and Alignment */}
        <div className="w-full lg:w-1/2 text-center lg:text-right space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-none">
            <span className="block">
              <span className="text-white font-bold">For the Culture,</span>
            </span>
            <span className="block mt-2 lg:mt-4">
              <span className="text-white">For the Future,</span>
            </span>
            <span className="block mt-2 lg:mt-4">
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
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-16 relative z-10 flex-grow">
        {/* Image Container */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="absolute bottom-[-20px]">
            <img
              src="/slide2.png"
              alt="Artist with headphones"
              className="w-[450px] h-[500px] rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl text-right relative bottom-[10px] leading-[90px] md:text-6xl max-w-lg font-semibold">
            Rhythm
            <br />
            Roots <br /> Rise <br />
            <span className=" text-black">Shape Music&apos;s Future</span>
          </h2>
          <p className="font-poppins relative text-sm text-right text-black max-w-lg">
            Celebrating global beats, honoring heritage, and elevating artists. MySoundsglobal connects culture, creativity, and community.
          </p>
        </div>
      </div>
      
      {/* Marquee Section - Stays at the Bottom */}
      <div className="w-full bg-[#CCFF00] text-black">
           {/* Marquee Section - Full Width with Enhanced Styling */}
    <MarqueeComp />
      </div>
    </section>

      {/* slider 3 */}
      <section className="relative font-Nebulica bg-black text-white min-h-screen  items-center overflow-hidden">
        <Nav />
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-16 relative z-10">
          {/* Image Container */}
          <div className="hidden lg:flex items-center justify-center relative">

            <div className="relative">
              <img
                src="/vert.png"
                alt="Artist with headphones"
                className="w-[200px] h-[100vh] object-center "
              />
            </div>
            <div className="absolute ">
              <img
                src="/slider3Per.png"
                alt="Artist with headphones"
                className="w-[450px] h-[500px] rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          {/* Text Content */}
          <div className="flex flex-col  justify-center space-y-6">
            <h2 className="text-4xl text-right leading-[90px] md:text-7xl max-w-lg font-semibold text-[#CCFF00]">
              Signup Today
              <br />
              <span className=" text-white">Shape Music&apos;s Future</span>
            </h2>
            <p className="font-poppins text-sm text-right  text-gray-300 max-w-lg">
              Join MySounds today and take part in redefining the future of music—where creativity, culture, and community unite.
            </p>

          </div>
        </div>
        
        {/* Decorative Elements */}
 {/* Marquee Section - Full Width with Enhanced Styling */}
 <MarqueeComp/>
      </section>
    </div>
  )
}

export default Slider