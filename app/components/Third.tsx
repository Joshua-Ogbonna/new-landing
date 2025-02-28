'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Third = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, textRef.current], {
        opacity: 0,
        y: 50
      });

      // Scroll-triggered animation
      gsap.to([titleRef.current, textRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section sticky-section bg-black z-[3] antialiased"
    >
      <div className="max-w-[1400px] mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">
        <h2 
          ref={titleRef} 
          className="text-[#CCFF00] text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8 [text-shadow:_0_0_50px_rgba(204,255,0,0.5),_0_0_25px_rgba(204,255,0,0.3)] text-center"
        >
          Join the Revolution
        </h2>
        <p 
          ref={textRef} 
          className="text-white text-2xl max-w-2xl mx-auto leading-relaxed font-bold [text-shadow:_0_0_20px_rgba(255,255,255,0.5)] text-center"
        >
          Be part of the next generation of sound. Where innovation meets
          your musical journey.
        </p>
      </div>
    </section>
  );
};

export default Third;
