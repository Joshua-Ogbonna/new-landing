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
        <section className="section font-Nebulica  sticky-section relative w-full min-h-screen bg-black overflow-hidden">
        <Nav />
        <div className="container mx-auto  h-[400px] flex flex-col md:flex-row justify-center items-center ">
        {/* Left section with animation */}

        <div className="w-full md:w-1/2 flex justify-center items-center py-20 md:py-0">
          <style jsx>
            {`
              .loader-container {
                position: relative;
                width: 280px;
                height: 280px;
                display: flex;
              
                justify-content: center;
                align-items: center;
              }

              .loader {
                position: absolute;
                width: 300px;
                height: 300px;
                transform-style: preserve-3d;
                transform: perspective(500px) rotateX(60deg);
              }

              @media (min-width: 768px) {
                .loader {
                  width: 400px;
                  height: 400px;
                }
              }

              @media (min-width: 1024px) {
                .loader {
                  width: 460px;
                  height: 460px;
                }
              }

              .loader span {
                position: absolute;
                display: block;
                border: 5px solid #c2ee03;
                box-shadow: 0 5px 0 #000;
                box-sizing: border-box;
                border-radius: 50%;
                opacity: 0.8;
              }

              /* Animation only for the outer 4 rings */
              .loader span:nth-child(1),
              .loader span:nth-child(2),
              .loader span:nth-child(3),
              .loader span:nth-child(4) {
                animation: waveMotion 4s ease-out infinite;
              }

              .image-container {
                position: absolute;
                z-index: 50;
                bottom: 20px;
                right: -70px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 400px;
                height: 400px;
              }

              @media (min-width: 768px) {
                .image-container {
                  width: 300px;
                  height: 300px;
                }
              }

              @media (min-width: 1024px) {
                .image-container {
                  width: 400px;
                  height: 400px;
                }
              }

              @keyframes waveMotion {
                0% {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
                50% {
                  transform: scale(1.05);
                  opacity: 1;
                }
                100% {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
              }

              .loader span:nth-child(1) {
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                animation-delay: 0s;
              }
              .loader span:nth-child(2) {
                top: 10px;
                bottom: 10px;
                left: 10px;
                right: 10px;
                animation-delay: -0.3s;
              }
              .loader span:nth-child(3) {
                top: 20px;
                bottom: 20px;
                left: 20px;
                right: 20px;
                animation-delay: -0.6s;
              }
              .loader span:nth-child(4) {
                top: 30px;
                bottom: 30px;
                left: 30px;
                right: 30px;
                animation-delay: -0.9s;
              }
              .loader span:nth-child(5) {
                top: 40px;
                bottom: 40px;
                left: 40px;
                right: 40px;
              }
              .loader span:nth-child(6) {
                top: 50px;
                bottom: 50px;
                left: 50px;
                right: 50px;
              }
              .loader span:nth-child(7) {
                top: 60px;
                bottom: 60px;
                left: 60px;
                right: 60px;
              }
            `}
          </style>

          <div className="loader-container   top-[120px] md:top-0 md:mt-[60px]">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="image-container">
              <Image
                src="/ip.png"
                alt="person"
                width={400}
                height={400}
                className="object-contain z-10 w-[270px] h-[270px] md:w-[400px] md:h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Right section with text */}
        <div className="w-full  md:w-1/2 mt-8 md:mt-0 px-4">
          <h1 className="text-[#CCFF00] reveal-text text-3xl md:text-6xl text-center md:text-left lg:text-right leading-none tracking-tight">
           
            <span className="text-white font-bold"> For the Culture,
            <br /></span>{" "}
            <span className="text-white">For the Future,</span>{" "}
            <br className="hidden lg:block" />
            <span className="">For the Sound.</span>
          </h1>
        </div>
      </div>

      <Marq2
        text="For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •  For the Culture • For the Future • For the Sound •"
        speed={10}
        className="border-4 border-solid border-[#CCFF00] bg-[#CCFF00] h-[100px] mt-[130px] md:mt-[-10px] w-full py-5 text-black"
      /> 
    </section>
        {/* slider 2 */}
        <section className="section font-Nebulica sticky-section relative w-full min-h-screen bg-[#CCFF00] overflow-hidden">
        <Nav2 />
        <div className="container mx-auto  h-[500px] flex flex-col md:flex-row justify-center items-center ">
        {/* Left section with animation */}

        <div className="w-full md:w-1/2 flex justify-center items-center py-20 md:py-0">
          <style jsx>
            {`
              .loader-container {
                position: relative;
                width: 280px;
                height: 280px;
                display: flex;
              
                justify-content: center;
                align-items: center;
              }

              .loader {
                position: absolute;
                width: 300px;
                height: 300px;
                transform-style: preserve-3d;
                transform: perspective(500px) rotateX(60deg);
              }

              @media (min-width: 768px) {
                .loader {
                  width: 400px;
                  height: 400px;
                }
              }

              @media (min-width: 1024px) {
                .loader {
                  width: 460px;
                  height: 460px;
                }
              }

              .loader span {
                position: absolute;
                display: block;
                border: 5px solid #000;
                box-shadow: 0 5px 0 #c2ee03;
                box-sizing: border-box;
                border-radius: 50%;
                opacity: 0.8;
              }

              /* Animation only for the outer 4 rings */
              .loader span:nth-child(1),
              .loader span:nth-child(2),
              .loader span:nth-child(3),
              .loader span:nth-child(4) {
                animation: waveMotion 4s ease-out infinite;
              }

              .image-container {
                position: absolute;
                z-index: 50;
                bottom: 20px;
                right: -70px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 400px;
                height: 400px;
              }

              @media (min-width: 768px) {
                .image-container {
                  width: 300px;
                  height: 300px;
                }
              }

              @media (min-width: 1024px) {
                .image-container {
                  width: 400px;
                  height: 400px;
                }
              }

              @keyframes waveMotion {
                0% {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
                50% {
                  transform: scale(1.05);
                  opacity: 1;
                }
                100% {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
              }

              .loader span:nth-child(1) {
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                animation-delay: 0s;
              }
              .loader span:nth-child(2) {
                top: 10px;
                bottom: 10px;
                left: 10px;
                right: 10px;
                animation-delay: -0.3s;
              }
              .loader span:nth-child(3) {
                top: 20px;
                bottom: 20px;
                left: 20px;
                right: 20px;
                animation-delay: -0.6s;
              }
              .loader span:nth-child(4) {
                top: 30px;
                bottom: 30px;
                left: 30px;
                right: 30px;
                animation-delay: -0.9s;
              }
              .loader span:nth-child(5) {
                top: 40px;
                bottom: 40px;
                left: 40px;
                right: 40px;
              }
              .loader span:nth-child(6) {
                top: 50px;
                bottom: 50px;
                left: 50px;
                right: 50px;
              }
              .loader span:nth-child(7) {
                top: 60px;
                bottom: 60px;
                left: 60px;
                right: 60px;
              }
            `}
          </style>

          <div className="loader-container   top-[120px] md:top-0 md:mt-[60px]">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="image-container">
              <Image
                src="/ring1.png"
                alt="person"
                width={400}
                height={400}
                className="object-contain z-10 w-[270px] h-[270px] md:w-[400px] md:h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Right section with text */}
        <div className="w-full  md:w-1/2 mt-8 md:mt-0 px-4">
          <h1 className="text-black reveal-text text-3xl md:text-6xl text-center md:text-left lg:text-right leading-none tracking-tight">
           
            <span className=" font-bold"> Sign Up Today 
 <br /></span>{" "}
            <span className=" ">Start Shaping the </span>{" "}
            <br className="hidden lg:block" />
            <span className="">
            Future of Music.</span>
          </h1>
        </div>
      </div>

      <Marq2
        text="For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •  For the Culture • For the Future • For the Sound •"
        speed={10}
        className=" bg-black text-[#CCFF00] h-[100px] mt-[130px] md:mt-[-10px] w-full py-5"
      /> 
    </section>
        {/* slider 3 */}
        <section className="section font-Nebulica sticky-section relative w-full min-h-screen bg-black overflow-hidden">
        <Nav />
        <div className="container mx-auto  h-[500px] flex flex-col md:flex-row justify-center items-center ">
        {/* Left section with animation */}

        <div className="w-full md:w-1/2 flex justify-center items-center py-20 md:py-0">
          <style jsx>
            {`
              .loader-container {
                position: relative;
                width: 280px;
                height: 280px;
                display: flex;
              
                justify-content: center;
                align-items: center;
              }

              .loader {
                position: absolute;
                width: 300px;
                height: 300px;
                transform-style: preserve-3d;
                transform: perspective(500px) rotateX(60deg);
              }

              @media (min-width: 768px) {
                .loader {
                  width: 400px;
                  height: 400px;
                }
              }

              @media (min-width: 1024px) {
                .loader {
                  width: 460px;
                  height: 460px;
                }
              }

              .loader span {
                position: absolute;
                display: block;
                border: 5px solid #c2ee03;
                box-shadow: 0 5px 0 #000;
                box-sizing: border-box;
                border-radius: 50%;
                opacity: 0.8;
              }

              /* Animation only for the outer 4 rings */
              .loader span:nth-child(1),
              .loader span:nth-child(2),
              .loader span:nth-child(3),
              .loader span:nth-child(4) {
                animation: waveMotion 4s ease-out infinite;
              }

              .image-container {
                position: absolute;
                z-index: 50;
                bottom: 20px;
                right: -70px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 400px;
                height: 400px;
              }

              @media (min-width: 768px) {
                .image-container {
                  width: 300px;
                  height: 300px;
                }
              }

              @media (min-width: 1024px) {
                .image-container {
                  width: 400px;
                  height: 400px;
                }
              }

              @keyframes waveMotion {
                0% {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
                50% {
                  transform: scale(1.05);
                  opacity: 1;
                }
                100% {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
              }

              .loader span:nth-child(1) {
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                animation-delay: 0s;
              }
              .loader span:nth-child(2) {
                top: 10px;
                bottom: 10px;
                left: 10px;
                right: 10px;
                animation-delay: -0.3s;
              }
              .loader span:nth-child(3) {
                top: 20px;
                bottom: 20px;
                left: 20px;
                right: 20px;
                animation-delay: -0.6s;
              }
              .loader span:nth-child(4) {
                top: 30px;
                bottom: 30px;
                left: 30px;
                right: 30px;
                animation-delay: -0.9s;
              }
              .loader span:nth-child(5) {
                top: 40px;
                bottom: 40px;
                left: 40px;
                right: 40px;
              }
              .loader span:nth-child(6) {
                top: 50px;
                bottom: 50px;
                left: 50px;
                right: 50px;
              }
              .loader span:nth-child(7) {
                top: 60px;
                bottom: 60px;
                left: 60px;
                right: 60px;
              }
            `}
          </style>

          <div className="loader-container   top-[120px] md:top-0 md:mt-[60px]">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="image-container">
              <Image
                src="/ring1.png"
                alt="person"
                width={400}
                height={400}
                className="object-contain z-10 w-[270px] h-[270px] md:w-[400px] md:h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Right section with text */}
        <div className="w-full  md:w-1/2 mt-8 md:mt-0 px-4">
          <h1 className="text-[#CCFF00] reveal-text text-3xl md:text-6xl text-center md:text-left lg:text-right leading-none tracking-tight">
           
            <span className="text-white font-bold"> Empowering Artists.   <br /></span>{" "}
            <span className="text-white font-bold">Engaging Listeners.</span>{" "}
            <br className="hidden lg:block" />
            <span className="">Building Culture.</span>
          </h1>
        </div>
      </div>

      <Marq2
        text="For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •  For the Culture • For the Future • For the Sound •"
        speed={10}
        className=" bg-[#CCFF00] text-black h-[100px] mt-[130px] md:mt-[-10px] w-full py-5"
      /> 
    </section>
    </div>
  )
}

export default Slider