"use client";

import Image from "next/image";

const Stats = () => {
  return (
    <section
      className="relative bg-black text-white pb-20 min-h-[1000px]"
      style={{
        backgroundImage: 'url(/clip.png)',
        backgroundSize: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '20% -100px',
        backgroundAttachment: 'local'
      }}
    >

      {/* Main content container */}
      <div className="container mx-auto px-4 py-20 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full max-w-6xl mx-auto px-4">
  {/* Left content */}
  <div className="w-full lg:w-1/2 space-y-6">
    <div className="space-y-4 md:space-y-8">
      <p className="text-base leading-relaxed">
        Welcome to AU Natural Organics. We are an organic store creating
        natural, organic beauty products that nurture and beautify your
        skin in a healthy way. We offer the healthiest, purest, and most
        effective organic skincare products so you can shop confidently
        with the peace of mind that you are revitalizing and nourishing
        your hair, skin and nails in an eco-friendly and non-toxic way.
      </p>
      <p className="text-[#c2ee03] text-base leading-relaxed my-4 md:my-10">
        We curate all our products, including our organic essential
        oils, natural butter, carrier oils, and oral care products, from
        handpicked natural, fresh ingredients
      </p>
      <button className="bg-[#c2ee03] text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg hover:bg-opacity-90 transition-all">
        Explore
      </button>
    </div>
  </div>

  {/* Right content - Image and floating cards */}
  <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mt-8 lg:mt-0">
    <div className="relative w-full h-full">
      <Image
        src="/person.png"
        alt="Person with headphones"
        className="w-full h-full object-contain"
      />

      {/* Floating stats cards */}
      <div className="absolute top-[15%] right-0 bg-white rounded-lg p-2 md:p-4 shadow-lg">
        <Image 
          width={150} 
          height={119} 
          src="/ca2.png" 
          alt="card 1" 
          className="w-[80px] md:w-[150px] h-auto"
        />
      </div>

      <div className="absolute bottom-[10%] left-[10%] md:left-[25%] bg-white rounded-lg p-2 md:p-4 shadow-lg">
        <Image 
          width={150} 
          height={119} 
          src="/ca1.png" 
          alt="card 1" 
          className="w-[80px] md:w-[150px] h-auto"
        />
      </div>
    </div>
  </div>
</div>

        {/* Bottom stats section */}
        <div className="absolute  bottom-0 right-0 bg-[#c2ee03] py-12 w-screen -ml-[50vw] left-[50%] z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center text-black max-w-[1300px] mx-auto">
              <div>
                <p className="text-4xl font-bold">150K+</p>
                <p className="text-sm mt-2">Our Happy Visitors</p>
              </div>
              <div>
                <p className="text-4xl font-bold">50+</p>
                <p className="text-sm mt-2">Our Popular Artist</p>
              </div>
              <div>
                <p className="text-4xl font-bold">100+</p>
                <p className="text-sm mt-2">Our Business Partner</p>
              </div>
              <div>
                <p className="text-4xl font-bold">750+</p>
                <p className="text-sm mt-2">Our Coming Event</p>
              </div>
              <div>
                <p className="text-4xl font-bold">20+</p>
                <p className="text-sm mt-2">Our Media Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
