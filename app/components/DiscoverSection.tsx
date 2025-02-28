import Image from "next/image";

interface Artist {
  id: string;
  name: string;
  image: string;
}

export default function DiscoverSection() {
  const artists: Artist[] = [
    { id: "1", name: "Artist 1", image: "/wizz.png" },
    { id: "2", name: "Artist 2", image: "/bdd.png" },
    { id: "3", name: "Artist 3", image: "/bddd.png" },
  ];

  return (
    <div className="mt-[200px] relative w-full md:max-w-[1440px] mx-auto h-[500px] rounded-[32px] overflow-hidden ">
      <div className="absolute inset-0">

        {/* Main content */}
        <div className="flex h-full">
          {/* Left side - Image */}
          <div className="relative w-1/2 h-full">
            <Image
              src="/ava.png"
              alt="Discover New Music"
              fill
              className="object-cover rounded-[24px]"
              priority
            />
            {/* Artist dots */}
            <div className="absolute bottom-6 left-6 bg-[#C2EE038F] backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2">
              {artists.map((artist) => (
                <button
                  key={artist.id}
                  className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20 hover:ring-[#c2ee03] transition-colors"
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
              className="absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#d4ff03] transition-all group overflow-hidden"
            >
              {/* <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45" />
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="relative rotate-45 group-hover:scale-110 transition-transform"
              >
                <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg> */}
               <Image src="/frame.png" alt="" width={80} height={80} />
            </button>
           
          </div>

          {/* Right side - Text */}
          <div className="w-1/2 p-16 flex flex-col justify-center">
            <h2 className="text-[64px] text-white font-bold leading-[1.1] tracking-[-0.02em] mb-6">
              Discover New Music
            </h2>
            <p className="text-lg text-white leading-relaxed max-w-[90%]">
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
