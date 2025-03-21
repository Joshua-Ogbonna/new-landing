"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import Marquee from "./Marquee";
import Marq2 from "./Marq2";
import Nav2 from "./Nav2";
export default function ScrollHead() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(true); // Lock scroll initially
  const heroRef = useRef<HTMLDivElement>(null); // Ref for the hero section
  const titleRef = useRef(null);
  const ringsRef = useRef(null);
  const sectionRef = useRef(null);

  const Section1 = () => (
    <div>
        <Nav2 />
        <section ref={sectionRef} className="section sticky-section relative w-full min-h-screen bg-black overflow-hidden">
          <div className="container  mx-auto px-4 h-full flex flex-col md:flex-row justify-center items-center mt-32">
            {/* Left section with animation */}
    
            <div className="w-full md:w-1/2 flex justify-center mx-auto items-center py-8 md:py-0" ref={ringsRef}>
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
                      width: 500px;
                      height: 500px;
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
                    right: -90px;
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
    
              <div className="loader-container">
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
                    className="object-contain z-10"
                  />
                </div>
              </div>
            </div>
    
            {/* Right section with text */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 px-4" ref={titleRef}>
              <h1 className="text-[#CCFF00] reveal-text text-4xl sm:text-5xl lg:text-7xl font-bold text-center md:text-left lg:text-right leading-none tracking-tight">
                Stream <br />
                <span className="text-white">out</span>{" "}
                <br className="hidden lg:block" />
                <span className="text-white">loud</span>
              </h1>
            </div>
          </div>
    
          {/* <Marquee
              firstBg="bg-[#C2EE0382]"
              secondBg="bg-[#C2EE03]"
              color="#000000"
            /> */}
          <Marq2
            text="For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •  For the Culture • For the Future • For the Sound •"
            speed={10}
            className=" bg-[#CCFF00] h-[100px] w-full py-5"
          />
        </section>
      </div>
  );

  const Section2 = () => (
    <div>
    <Nav2 />
    <section ref={sectionRef} className="section sticky-section relative w-full min-h-screen bg-black overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row justify-center items-center mt-32">
        {/* Left section with animation */}

        <div className="w-full md:w-1/2 flex justify-center items-center py-8 md:py-0" ref={ringsRef}>
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
                  width: 500px;
                  height: 500px;
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
                right: -90px;
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

          <div className="loader-container">
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
                className="object-contain z-10"
              />
            </div>
          </div>
        </div>

        {/* Right section with text */}
        <div className="w-full  md:w-1/2 mt-8 md:mt-0 px-4" ref={titleRef}>
          <h1 className="text-[#CCFF00] reveal-text text-4xl sm:text-5xl lg:text-7xl font-bold text-center md:text-left lg:text-right leading-none tracking-tight">
            Stream <br />
            <span className="text-white">out</span>{" "}
            <br className="hidden lg:block" />
            <span className="text-white">loud</span>
          </h1>
        </div>
      </div>

      {/* <Marquee
          firstBg="bg-[#C2EE0382]"
          secondBg="bg-[#C2EE03]"
          color="#000000"
        /> */}
      <Marq2
        text="For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •  For the Culture • For the Future • For the Sound •"
        speed={10}
        className=" bg-[#CCFF00] h-[100px] w-full py-5"
      />
    </section>
  </div>
  );

  const Section3 = () => (
    <div>
    <Nav2 />
    <section ref={sectionRef} className="section sticky-section relative w-full min-h-screen bg-black overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row justify-center items-center mt-32">
        {/* Left section with animation */}

        <div className="w-full md:w-1/2 flex justify-center items-center py-8 md:py-0" ref={ringsRef}>
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
                  width: 500px;
                  height: 500px;
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
                right: -90px;
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

          <div className="loader-container">
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
                className="object-contain z-10"
              />
            </div>
          </div>
        </div>

        {/* Right section with text */}
        <div className="w-full  md:w-1/2 mt-8 md:mt-0 px-4" ref={titleRef}>
          <h1 className="text-[#CCFF00] reveal-text text-4xl sm:text-5xl lg:text-7xl font-bold text-center md:text-left lg:text-right leading-none tracking-tight">
            Stream <br />
            <span className="text-white">out</span>{" "}
            <br className="hidden lg:block" />
            <span className="text-white">loud</span>
          </h1>
        </div>
      </div>

      {/* <Marquee
          firstBg="bg-[#C2EE0382]"
          secondBg="bg-[#C2EE03]"
          color="#000000"
        /> */}
      <Marq2
        text="For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •  For the Culture • For the Future • For the Sound •"
        speed={10}
        className=" bg-[#CCFF00] h-[100px] w-full py-5"
      />
    </section>
  </div>
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
