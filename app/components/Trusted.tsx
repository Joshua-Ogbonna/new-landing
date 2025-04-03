import React, { useState, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Wilson",
    role: "Marketing Director",
    company: "Music Inc.",
    image: "/per5.avif",
    text: "I'm glad I decided to work with you. The platform is incredibly easy to update and manage. I never have any issues."
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Content Creator",
    company: "Creative Studios",
    image: "/ind1.avif",
    text: "I never knew I needed MySound until I tried it. The recommendations are spot on, and the behind-the-scenes access makes me feel truly connected to the music I love. Absolutely brilliant."
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Producer",
    company: "Sound Wave Records",
    image: "/asi1.avif",
    text: "An incredible tool for music professionals. The features are exactly what I needed for my production work."
  },
  {
    id: 4,
    name: "Chisom Nnamdi",
    role: "Artist Manager",
    company: "Stellar Management",
    image: "/afr1.avif",
    text: "This platform has revolutionized how we handle our artist promotions. Highly recommended!"
  },
  {
    id: 5,
    name: "Justina Mbakwe",
    role: "Sound Engineer",
    company: "Audio Excellence",
    image: "/per6.avif",
    text: "MySound changed how I find music! Real-time event updates? Absolute game-changer"
  }
];

const Trusted = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial>(testimonials[0]);
  const globeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 font-poppins">
      <div className="w-full md:max-w-[1440px] mx-auto mt-16 sm:mt-24 md:mt-32 lg:mt-[200px] flex flex-col md:flex-row items-center justify-around">
        {/* left section - CSS 3D Globe */}
        <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[521px] aspect-square">
          {/* 3D world container with perspective */}
          <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
            <div 
              ref={globeRef} 
              className="relative w-full h-full"
            >
              {/* Front face - the world image */}
              <div className="absolute inset-0 backface-hidden">
                <Image 
                  src="/world.png" 
                  alt="world" 
                  width={521} 
                  height={527} 
                  className="relative z-10 w-full h-auto" 
                />
              </div>
              
              {/* Back face - a mirrored world image with different colors */}
              <div 
                className="absolute inset-0"
                style={{ transform: "rotateY(180deg)" }}
              >
                <Image 
                  src="/world.png" 
                  alt="world back" 
                  width={521} 
                  height={527} 
                  className="relative z-10 w-full h-auto filter" 
                />
              </div>
            </div>

            {/* Animated ring around the globe */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full border-2 border-[#C2EE03] rounded-full animate-spin-slow opacity-20" />
            </div>

            {/* 3D glow effect */}
            <div className="absolute inset-0 z-0 rounded-full bg-[#C2EE03] opacity-10 blur-xl animate-pulse"></div>
          </div>

          {/* Circular profile images - responsive positions */}
          {testimonials.map((testimonial, index) => {
            // Responsive positions that work on different screen sizes
            const positions = [
              'top-[5%] right-[5%] sm:top-[10%] sm:right-[0%]',
              'top-[25%] left-[5%] sm:top-[30%] sm:left-[0%]',
              'top-[40%] left-[40%] sm:top-[30%] sm:left-[50%]',
              'bottom-[25%] right-[5%] sm:bottom-[30%] sm:right-[0%]',
              'bottom-[5%] left-[25%] sm:bottom-[0%] sm:left-[30%]'
            ];
            
            return (
              <div 
                key={testimonial.id}
                className={`absolute ${positions[index]} z-20 transition-transform duration-300 hover:scale-110`}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  width={80} 
                  height={80} 
                  className={`cursor-pointer rounded-full border-2 transition-all duration-300 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover ${selectedTestimonial.id === testimonial.id ? 'border-[#C2EE03] scale-110 shadow-[0_0_15px_#C2EE03]' : 'border-white opacity-70'}`} 
                />
              </div>
            );
          })}

          {/* Decorative circles */}
          <div className="absolute top-1/4 -left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-[#C2EE03] rounded-full opacity-30" />
          <div className="absolute bottom-1/4 -right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#C2EE03] rounded-full opacity-30" />
          <div className="absolute top-1/3 right-0 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#C2EE03] rounded-full opacity-30" />

          {/* Line patterns */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full border-2 border-[#C2EE03] rounded-full opacity-10 animate-pulse" />
          </div>
        </div>
        
        {/* right section */}
        <div className="w-full md:w-1/2 lg:w-[548px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[#C2EE03] my-4 sm:my-6 md:mb-8 text-center md:text-left">
            Trusted in Over 5 Countries by over 300+ Users
          </h2>

          {/* testimonial section */}
          <div className="w-full min-h-[100px] sm:min-h-[250px] md:min-h-[200px] lg:min-h-[258px] border-solid border border-white rounded-[20px] sm:rounded-[30px] md:rounded-[43px] p-4 sm:p-6 md:p-8 relative">
            <p className="w-full text-lg sm:text-xl md:text-2xl lg:text-[30px] text-white font-normal mb-12 sm:mb-16">
              {selectedTestimonial.text}
            </p>

            <h5 className="text-white font-normal text-base sm:text-xl md:text-2xl lg:text-[24px] absolute bottom-4 sm:bottom-6 md:bottom-10">
              {selectedTestimonial.name}
            </h5>
          </div>
        </div>
      </div>

      {/* Add global styles for 3D transforms */}
      <style jsx global>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.05); opacity: 0.2; }
        }
        
        .animate-pulse {
          animation: pulse 3s infinite ease-in-out;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Trusted;