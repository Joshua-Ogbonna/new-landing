import Image from "next/image";
import { useState } from "react";

interface Artist {
  id: string;
  name: string;
  image: string;
}

export default function DiscoverSection() {
  const [img, setImg] = useState('');
  const artists: Artist[] = [
    { id: "1", name: "Artist 1", image: "/thuna.jpg" },
    { id: "2", name: "Artist 2", image: "/sinam.jpg" },
    { id: "3", name: "Artist 3", image: "/deeciennew.jpg" },
  ];
  
  const openArtist = (artistImg: string): void => {
    console.log(artistImg);
    setImg(artistImg);
  }
  
  return (
    <div className="mt-12 sm:mt-20 md:mt-32 lg:mt-[200px] relative w-full md:max-w-[1440px] md:mx-[50px] min-h-[400px] rounded-lg md:rounded-[32px] overflow-hidden px-4 sm:px-6 md:px-0">
      <div className="">
        {/* Main content */}
        <div className="flex flex-col mx-4 md:mx-0  md:flex-row md:h-full">
          {/* Left side - Image */}
          <div className="relative w-full md:w-1/2 h-[300px] sm:h-[400px]">
            <Image
              src={img ? img : "/L.Christo.jpg"}
              alt="Discover New Music"
              fill
              className="object-cover rounded-[16px] md:rounded-[24px]"
              priority
            />
            {/* Artist dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-[#C2EE038F] backdrop-blur-sm rounded-full py-1 sm:py-2 px-2 sm:px-3 flex items-center gap-1 sm:gap-2">
              {artists.map((artist) => (
                <button
                  key={artist.id}
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-1 ring-white/20 hover:ring-[#c2ee03] transition-colors" 
                  onClick={() => openArtist(artist.image)}
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            {/* Arrow button */}
            <button 
              className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#d4ff03] transition-all group overflow-hidden"
            >
              <Image src="/frame.png" alt="" width={80} height={80} className="w-full h-full object-cover" />
            </button>
          </div>

          {/* Right side - Text */}
          {/* <div className="w-full md:w-1/2 px-6 mt-10 md:mt-0 md:px-16 text-white ">
            <h1 className="font-Nebulica text-5xl md:text-7xl font-bold "> Discover New Music</h1>
            <p className="font-poppins text-base mt-10">  An exhilarating journey into the uncharted realms of sound, inviting you to explore the endless possibilities
              of the musical landscape. With boundless creativity and innovation at its core, this experience ignites your
              passion for discovery and sets the stage for unforgettable musical moments.</p>
          </div> */}
          
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:px-12 lg:p-16 flex flex-col justify-start mt-4 md:mt-0">
            <h2 className="text-3xl font-Nebulica sm:text-4xl md:text-5xl lg:text-[64px] text-white font-bold leading-[1.1] tracking-[-0.02em] mb-4 sm:mb-6">
              Discover New Music
            </h2>
            <p className="text-base font-poppins sm:text-lg  text-white leading-relaxed max-w-full md:max-w-[90%]">
              An exhilarating journey into the uncharted realms of sound, inviting you to explore the endless possibilities
              of the musical landscape. With boundless creativity and innovation at its core, this experience ignites your
              passion for discovery and sets the stage for unforgettable musical moments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}