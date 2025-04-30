"use client";

export default function HeroBanner() {
  return (
    <div className="relative rounded-xl overflow-hidden mb-6 sm:mb-8 w-full min-h-[250px]">
      <div 
        className="relative h-full flex items-center p-4 sm:p-8"
        style={{
          backgroundImage: 'url(/dashhead.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 max-w-md sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black drop-shadow-lg">Access free<br />Courses</h2>
          <button className="bg-[#C2EE03] text-black px-4 sm:px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center group h-[48px] sm:h-[54px] w-auto sm:w-[150px]">
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}