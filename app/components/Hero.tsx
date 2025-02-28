"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Marquee from "./Marquee";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ringsRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, textRef.current], {
        opacity: 0,
        y: 50,
      });

      // Text animation on load
      gsap.to([titleRef.current, textRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Scroll-triggered animations
      gsap.to(ringsRef.current, {
        rotate: 360,
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(phoneRef.current, {
        y: 100,
        scale: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar background="#000000" color="#515151" hoverColor="#C2EE03" logo="/brl.png" />
      <section
        ref={sectionRef}
        className="section sticky-section hero-section relative w-full h-screen bg-black overflow-hidden"
      >
        <div className="md:w-[1440px] w-full mx-auto px-6 relative flex justify-between items-start">
          <div>
            <div className="w-full flex flex-col-reverse lg:flex-row h-full">
              <div className="relative">
                <div ref={ringsRef} className="relative h-[1017px]">
                  {/* Back ring */}
                  <style jsx>{`
                    @keyframes reverberate {
                      0% {
                        transform: scale(1);
                        opacity: 1;
                      }
                      50% {
                        transform: scale(1.02);
                        opacity: 0.9;
                      }
                      100% {
                        transform: scale(1);
                        opacity: 1;
                      }
                    }

                    @keyframes pulse {
                      0% {
                        transform: scale(1);
                        opacity: 0.3;
                      }
                      50% {
                        transform: scale(1.05);
                        opacity: 0.1;
                      }
                      100% {
                        transform: scale(1);
                        opacity: 0.3;
                      }
                    }

                    .reverberate {
                      animation: reverberate 4s ease-in-out infinite;
                    }

                    .pulse {
                      animation: pulse 4s ease-in-out infinite;
                    }
                  `}</style>
                  <div className="absolute top-[100px] w-[905px] h-[531px] z-10 select-none">
                    {/* Pulse effect layers */}
                    <div
                      className="absolute inset-0 pulse"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Image
                        src="/rdb.png"
                        alt="Back Ring Echo 1"
                        width={1005}
                        height={631}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                    <div
                      className="absolute inset-0 pulse"
                      style={{ animationDelay: "1s" }}
                    >
                      <Image
                        src="/rdb.png"
                        alt="Back Ring Echo 2"
                        width={1005}
                        height={631}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                    {/* Main image with reverberation */}
                    <div className="relative reverberate">
                      <Image
                        src="/rdb.png"
                        alt="Back Ring"
                        width={1005}
                        height={631}
                        className="w-full h-full object-contain pointer-events-none"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone - centered */}
            <div className="absolute top-[-104px] left-[0] z-20 select-none">
              <div className="relative w-[1041px] h-[817px]">
                <Image
                  src="/pho.png"
                  alt="MySound App"
                  width={1041}
                  height={817}
                  className="object-contain pointer-events-none"
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* Front ring - rotating clockwise */}
            {/* <div className="absolute left-[200px] top-1/2 z-30 w-[188px] h-[188px] select-none">
              <Image
                src="/rot.png"
                alt="Front Ring"
                width={188}
                height={188}
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div> */}
          </div>

          <div className="flex flex-col items-center pt-[15%]" ref={titleRef}>
            <h1 className="text-[#CCFF00] reveal-text text-7xl lg:text-8xl font-bold text-center lg:text-right leading-none tracking-tight">
              Stream <br />
              <span className="text-[white]">out</span>{" "}
              <br className="hidden lg:block" />
              <span className="text-[white]">loud</span>
            </h1>
          </div>
        </div>

        <Marquee firstBg="bg-[#C2EE0382]" secondBg="bg-[#C2EE03]" color="#000000" />
      </section>
    </>
  );
};

export default Hero;
