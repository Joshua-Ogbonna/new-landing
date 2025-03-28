"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Nav from "./Nav";
import Image from "next/image";
import Nav2 from "./Nav2";
import Marq2 from "./Marq2";
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
          <div className="relative w-full max-w-[500px] xl:max-w-[600px] aspect-square">
            <Image
              src="/slide2.png"
              alt="Artist with headphones"
              fill
              priority
              className="object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 ease-in-out"
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
      <Marq2
        text="For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •"
        speed={10}
        className="border-4 border-solid border-[#CCFF00] bg-[#CCFF00] h-[60px] md:h-[100px] w-full py-2 md:py-5 text-black text-lg md:text-xl"
      />
    </section>
      {/* slider 2 */}
      <section className="section font-Nebulica sticky-section relative w-full min-h-screen bg-[#CCFF00] overflow-hidden">
      <Nav2 />
      <div className="container min-h-screen flex items-center justify-center">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-16 relative max-w-7xl">
          {/* Left section with layered images - precise desktop positioning */}
          <div className="hidden lg:flex items-center justify-center relative w-full h-[600px] xl:h-[700px]">
            {/* Background image - full coverage */}
            <div className="absolute inset-0 z-10">
              <Image
                src="/womring.png"
                alt="Background artist image"
                fill
                priority
                className="object-contain object-center"
              />
            </div>
            
            {/* Overlay image with enhanced hover effect */}
            <div className="absolute z-20 bottom-40 right-0 w-[350px] h-[350px] xl:w-[450px] xl:h-[450px]">
              <Image
                src="/slide2.png"
                alt="Foreground artist image"
                fill
                priority
                className="object-cover transform transition-all duration-500 hover:scale-105 hover:rotate-3 "
              />
            </div>
          </div>

          {/* Right section with text - precise desktop alignment */}
          <div className="flex flex-col text-black justify-center items-end space-y-6 w-full px-4 lg:px-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-right leading-[0.9] tracking-tighter">
              <span className="block text-black">Rhythm</span>
              <span className="block text-black">Roots</span>
              <span className="block text-[#000]">Rise</span>
            </h2>
            <p className="font-poppins font-semibold text-base md:text-lg lg:text-xl text-right max-w-md text-black/80">
              Celebrating global beats, honoring heritage, and elevating artists. MySoundsglobal connects culture, creativity, and community.
            </p>
          </div>
        </div>
      </div>
    </section>
      {/* slider 3 */}
      <section className="relative font-Nebulica bg-black text-white min-h-screen flex items-center overflow-hidden">
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

      </section>
    </div>
  )
}

export default Slider