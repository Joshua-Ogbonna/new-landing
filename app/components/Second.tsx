'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Second = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, textRef.current], {
        opacity: 0,
        y: 100,
        scale: 0.8
      });

      // Scroll-triggered animation
      gsap.to([titleRef.current, textRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      });

      // Background color animation
      gsap.fromTo(sectionRef.current,
        { backgroundColor: "#CCFF00" },
        {
          backgroundColor: "#CCFF00",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section sticky-section bg-[#CCFF00] z-[2] antialiased"
    >
      <div className="max-w-[1400px] mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">
        <h2 
          ref={titleRef} 
          className="text-black text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8 [text-shadow:_2px_2px_0px_#fff] text-center"
        >
          Experience Music
        </h2>
        <p 
          ref={textRef} 
          className="text-black text-2xl max-w-2xl mx-auto leading-relaxed font-bold text-center"
        >
          Immerse yourself in crystal clear sound, where every beat tells a story
          and every note comes alive.
        </p>
      </div>
    </section>
  );
};

export default Second;
