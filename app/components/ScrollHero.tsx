"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import Marquee from "./Marquee";

export default function ScrollHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(true); // Lock scroll initially
  const heroRef = useRef<HTMLDivElement>(null); // Ref for the hero section
  const titleRef = useRef(null);
  const ringsRef = useRef(null);
  const sectionRef = useRef(null);

  const Section1 = () => (
    <div>
      <Navbar
        background="#000000"
        color="text-[#515151]"
        hoverColor="#C2EE03"
        logo="/brl.png"
      />
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
            <div className="absolute top-[100px] left-[300px] z-20 select-none">
              <div className="relative w-[424px] h-[901px]">
                <Image
                  src="/ring.png"
                  alt="MySound App"
                  width={424}
                  height={901}
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

          <div className="flex flex-col items-center pt-[13%]" ref={titleRef}>
            <h1 className="text-[#CCFF00] reveal-text text-7xl lg:text-9xl font-bold text-center lg:text-right leading-none tracking-tight">
              Stream <br />
              <span className="text-[white]">out</span>{" "}
              <br className="hidden lg:block" />
              <span className="text-[white]">loud</span>
            </h1>
          </div>
        </div>

        <Marquee
          firstBg="bg-[#C2EE0382]"
          secondBg="bg-[#C2EE03]"
          color="#000000"
        />
      </section>
    </div>
  );

  const Section2 = () => (
    <>
      <Navbar
        background="#C2EE03"
        color="#515151"
        hoverColor="#C2EE03"
        logo="/darkl.png"
      />
      <section
        ref={sectionRef}
        className="section sticky-section hero-section relative w-full h-screen bg-[#C2EE03] overflow-hidden"
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
                        src="/dark.png"
                        alt="Back Ring Echo 1"
                        width={905}
                        height={531}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                    <div
                      className="absolute inset-0 pulse"
                      style={{ animationDelay: "1s" }}
                    >
                      <Image
                        src="/dark.png"
                        alt="Back Ring Echo 2"
                        width={1005}
                        height={631}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                    {/* Main image with reverberation */}
                    <div className="relative reverberate">
                      <Image
                        src="/dark.png"
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
            <div className="absolute top-[20px] left-[300px] z-20 select-none">
              <div className="relative w-[424px] h-[901px]">
                <Image
                  src="/ip.png"
                  alt="MySound App"
                  width={424}
                  height={901}
                  className="object-contain pointer-events-none"
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* Front ring - rotating clockwise */}
            <div className="absolute left-[250px] top-1/3 z-30 w-[188px] h-[188px] select-none">
              <Image
                src="/tcbb.png"
                alt="Front Ring"
                width={188}
                height={188}
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>

          <div className="flex flex-col items-center pt-[15%]" ref={titleRef}>
            <h1 className="text-[#000000] reveal-text text-7xl lg:text-9xl font-bold text-center lg:text-right leading-none tracking-tight">
              Earn
              <br />
              <span className="text-[black]">as you </span>{" "}
              <br className="hidden lg:block" />
              <span className="text-[black]">Grow</span>
            </h1>
          </div>
        </div>

        <Marquee
          firstBg="bg-black/40"
          secondBg="bg-[#000000]"
          color="text-[#C2EE03]"
        />
      </section>
    </>
  );

  const Section3 = () => (
    <>
      <Navbar
        background="#000000"
        color="text-[#515151]"
        hoverColor="#C2EE03"
        logo="/brl.png"
      />
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
            <div className="absolute top-[100px] left-[300px] z-20 select-none">
              <div className="relative w-[424px] h-[901px]">
                <Image
                  src="/ring1.png"
                  alt="MySound App"
                  width={424}
                  height={901}
                  className="object-contain pointer-events-none"
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* Front ring - rotating clockwise */}
            <div className="absolute left-[200px] top-1/4 z-30 w-[188px] h-[188px] select-none">
              <Image
                src="/rot.png"
                alt="Front Ring"
                width={188}
                height={188}
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>

          <div className="flex flex-col items-center pt-[15%]" ref={titleRef}>
            <h1 className="text-[#CCFF00] reveal-text text-9xl lg:text-8xl font-bold text-center lg:text-right leading-none tracking-tight">
              Your
              <br />
              <span className="text-[white]">music,</span>{" "}
              <br className="hidden lg:block" />
              <span className="text-[white]">your way </span>
            </h1>
          </div>
        </div>

        <Marquee
          firstBg="bg-[#C2EE0382]"
          secondBg="bg-[#C2EE03]"
          color="#000000"
        />
      </section>
    </>
  );

  const sections = [Section1, Section2, Section3];

  useEffect(() => {
    let isScrolling = false; // Flag to prevent multiple triggers

    const handleScroll = (event: WheelEvent) => {
      if (!isScrollLocked) return; // Exit if scroll is not locked

      event.preventDefault(); // Prevent default scroll behavior

      if (isScrolling) return; // Exit if already handling a scroll
      isScrolling = true;

      // Determine scroll direction
      const delta = Math.sign(event.deltaY);

      if (delta > 0) {
        // Scroll down: go to the next section
        setActiveIndex((prev) => {
          if (prev < sections.length - 1) {
            return prev + 1;
          } else {
            setIsScrollLocked(false); // Release scroll lock after last section
            return prev;
          }
        });
      } else if (delta < 0) {
        // Scroll up: go to the previous section
        setActiveIndex((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return prev; // Stay at the first section
          }
        });
      }

      // Add a small delay before allowing the next scroll
      setTimeout(() => {
        isScrolling = false;
      }, 1000); // 1-second delay between transitions
    };

    if (isScrollLocked) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isScrollLocked, sections.length]);

  // Reset activeIndex and re-enable scroll lock when re-entering the hero section
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Re-enable scroll lock and reset activeIndex when hero section is in view
          setIsScrollLocked(true);
          setActiveIndex(sections.length - 1); // Reset to the last section
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when 50% of the hero section is visible
    });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [sections.length]);

  return (
    <>
      <div className="scroll-container" ref={heroRef}>
        <section className="hero-section">
          {sections.map((Section, index) => {
            const SectionComponent = Section;
            return (
              <div
                key={index}
                className={`hero-wrapper ${
                  activeIndex === index ? "active" : "inactive"
                }`}
              >
                <SectionComponent />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
