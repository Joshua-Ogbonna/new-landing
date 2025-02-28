import Image from "next/image";
import React, { useState } from "react";

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
    name: "John Doe",
    role: "Marketing Director",
    company: "Envato Pty Ltd",
    image: "/man.png",
    text: "I'm glad I decided to work with you. The platform is incredibly easy to update and manage. I never have any issues."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Content Creator",
    company: "Creative Studios",
    image: "/man.png",
    text: "The quality of service is exceptional. My audience engagement has increased significantly since using this platform."
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Producer",
    company: "Sound Wave Records",
    image: "/man.png",
    text: "An incredible tool for music professionals. The features are exactly what I needed for my production work."
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Artist Manager",
    company: "Stellar Management",
    image: "/man.png",
    text: "This platform has revolutionized how we handle our artist promotions. Highly recommended!"
  },
  {
    id: 5,
    name: "David Brown",
    role: "Sound Engineer",
    company: "Audio Excellence",
    image: "/man.png",
    text: "The audio quality and features are top-notch. It's become an essential part of our studio workflow."
  }
];

const Trusted = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial>(testimonials[0]);
  return (
    <div className="w-full md:max-w-[1440px] mx-auto mt-[200px] flex items-center justify-between">
      {/* left section */}
      <div className="relative">
        {/* World image with circular pattern */}
        <div className="relative">
          <Image src="/world.png" alt="world" width={521} height={527} className="relative z-10" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full border-2 border-[#C2EE03] rounded-full animate-spin-slow opacity-20" />
          </div>
        </div>

        {/* Circular profile images */}
        {testimonials.map((testimonial, index) => {
          const positions = [
            'top-[10%] right-[0%]',
            'top-[30%] left-[0%]',
            'top-[30%] left-[50%]',
            'bottom-[30%] right-[0%]',
            'bottom-[0%] left-[30%]'
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
                className={`cursor-pointer rounded-full border-2 transition-all duration-300 ${selectedTestimonial.id === testimonial.id ? 'border-[#C2EE03] scale-110 shadow-[0_0_15px_#C2EE03]' : 'border-white opacity-70'}`} 
              />
            </div>
          );
        })}

        {/* Decorative circles */}
        <div className="absolute top-1/4 -left-0 w-12 h-12 bg-[#C2EE03] rounded-full opacity-30" />
        <div className="absolute bottom-1/4 -right-0 w-8 h-8 bg-[#C2EE03] rounded-full opacity-30" />
        <div className="absolute top-1/3 right-0 w-4 h-4 bg-[#C2EE03] rounded-full opacity-30" />

        {/* Line patterns */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full border-2 border-[#C2EE03] rounded-full opacity-10 animate-pulse" />
        </div>
      </div>
      {/* right section */}
      <div className="w-full md:w-[548px]">
        <h2 className="w-full text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[#C2EE03] mb-8">
          Trusted in Over 5 Countries by over 300+ Users
        </h2>

        {/* testimonial section */}
        <div className="w-full md:w-[548px] min-h-[358px] border-solid border border-white rounded-[43px] p-8 relative">
          <p className="w-full text-[30px] text-white font-normal mb-8">
            {selectedTestimonial.text}
          </p>

          <h5 className="text-white font-normal text-[24px] absolute bottom-10">
            {selectedTestimonial.company}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Trusted;
