/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardLayout from "../components/Dashboard/DashboardLayout";
// import HeroBanner from "../components/Dashboard/HeroBanner";
// import ArtistProfile from "../components/Dashboard/ArtistProfile";
// import StreamsChart from "../components/Dashboard/StreamsChart";
// import TopCountries from "../components/Dashboard/TopCountries";
import Image from 'next/image';


interface ArtistData {
  id: string;
  name: string;
  bio?: string;
  image?: string;
  is_follow?: boolean;
}

export default function Dashboard() {
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
    const [artist, setArtist] = useState<ArtistData | null>(null);
  const [artistData, setArtistData] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    // Safely get items from localStorage only once when component mounts
    const storedId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    console.log(storedId, storedToken);
    
    setId(storedId);
    setToken(storedToken);
  }, []); // Empty dependency array ensures this runs only once on mount
    console.log(token, id);
    
  useEffect(() => {
    // Only fetch artist data if both id and token are available
    if (id && token) {
      fetchArtistData();
    }
  }, [id, token]); // This effect runs when id or token changes

  const fetchArtistData = async () => {
    try {
      const artistResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/artists/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!artistResponse.ok) {
        throw new Error('Failed to fetch artist data');
      }

      const artistData = await artistResponse.json();
      setArtistData(artistData);
      setArtist(artistData.data);
      console.log(artist);
    } catch (error) {
      console.error('Error fetching artist data:', error);
      // Handle error (e.g., redirect to login or show error message)
    }
  };

  return (
    <div>
      {/* Render artist data or loading state */}
      {/* {artistData ? (
           <DashboardLayout name={artist ? artist?.name : "David"} image={artist?.image}>
             <div className="flex flex-col lg:flex-row gap-6">
               <div className="flex-1">
                 <HeroBanner />
                 <div className="flex flex-col lg:flex-row gap-6 mt-6">
                   <div className="flex-3 space-y-6 h-full">
                     <ArtistProfile
                       name={artist?.name ||  "Unknown Artist"}
                       role={"Artist"}
                       bio={artist?.bio as string || " is a dynamic music artist whose unique sound blends [genre influences, e.g., R&B, pop, hip-hop, or rock] with heartfelt storytelling and infectious melodies. With a voice that captivates and lyrics that resonate, [Artist Name] has carved a distinct space in the music industry, touching the hearts of listeners worldwide.Born and raised in [hometown], [Artist Name] discovered their love for music at an early age, drawing inspiration from legends like [influences, e.g., Beyoncé, Kendrick Lamar, or Adele]. Their journey began with writing songs in their bedroom, evolving into powerful performances that showcase raw emotion and undeniable talent.Since their debut in [year], [Artist Name] has released [number] of singles/EPs/albums, including the breakthrough track, which garnered [mention achievements, e.g., millions of streams, chart success, or viral recognition]. Their music explores themes of [love, self-discovery, resilience, or social issues], creating an authentic connection with audiences.Beyond the studio, [Artist Name] is known for electrifying live performances, gracing stages at [notable festivals, venues, or events]. Whether performing in intimate settings or large arenas, they bring an energy that leaves fans inspired and wanting more.With a commitment to pushing creative boundaries, [Artist Name] continues to evolve, collaborating with top producers and artists to craft fresh, innovative sounds. Their latest project, is a testament to their artistic growth and dedication to their craft.."}
                       picture={artist?.image || "/ava.png" }
                     />
                   </div>
                   <div className="flex-1 space-y-8 h-full">
                     <StreamsChart />
                     <TopCountries artistId={artist?.id || ""} />
                   </div>
                 </div>
               </div>
       
               <div className="lg:w-[30%] space-y-6">
                 <div className="bg-[#1F1F1F] rounded-xl p-6">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-medium">Visitors Analytics</h3>
                     <div className="bg-[#C2EE03] text-black px-3 py-1 rounded-md text-xs font-medium">
                       Monthly
                     </div>
                   </div>
                   <div className="relative h-64 flex items-center justify-center">
                     <div className="relative w-48 h-48">
                       <div className="absolute inset-0 rounded-full flex items-center justify-center">
                         <div className="text-center">
                           <div className="text-4xl font-bold">0</div>
                           <div className="text-sm text-gray-400">Visitors</div>
                         </div>
                       </div>
                       <svg
                         viewBox="0 0 100 100"
                         className="absolute inset-0 transform -rotate-90"
                       >
                         <circle
                           cx="50"
                           cy="50"
                           r="40"
                           fill="transparent"
                           stroke="#4B6BFB"
                           strokeWidth="12"
                           strokeDasharray="251.2"
                           strokeDashoffset="0"
                         />
                         <circle
                           cx="50"
                           cy="50"
                           r="40"
                           fill="transparent"
                           stroke="#C2EE03"
                           strokeWidth="12"
                           strokeDasharray="251.2"
                           strokeDashoffset="62.8"
                         />
                         <circle
                           cx="50"
                           cy="50"
                           r="40"
                           fill="transparent"
                           stroke="#31C4FB"
                           strokeWidth="12"
                           strokeDasharray="251.2"
                           strokeDashoffset="188.4"
                         />
                       </svg>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mt-4">
                     <div className="flex items-center">
                       <span className="w-3 h-3 bg-[#4B6BFB] rounded-full mr-2"></span>
                       <span className="text-sm">Desktop</span>
                       <span className="ml-auto text-sm">0%</span>
                     </div>
                     <div className="flex items-center">
                       <span className="w-3 h-3 bg-[#31C4FB] rounded-full mr-2"></span>
                       <span className="text-sm">Tablet</span>
                       <span className="ml-auto text-sm">0%</span>
                     </div>
                     <div className="flex items-center">
                       <span className="w-3 h-3 bg-[#C2EE03] rounded-full mr-2"></span>
                       <span className="text-sm">Mobile</span>
                       <span className="ml-auto text-sm">0%</span>
                     </div>
                     <div className="flex items-center">
                       <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                       <span className="text-sm">Unknown</span>
                       <span className="ml-auto text-sm">0%</span>
                     </div>
                   </div>
                 </div>
       
                 <div className="bg-[#1F1F1F] rounded-xl p-6">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-medium">Sells by State</h3>
                     <div className="text-gray-400 text-xs">
                       Last updated: 7 days ago
                     </div>
                   </div>
                   <div className="relative h-64 flex items-center justify-center">
                     <div className="absolute inset-0">
                       <Image
                         src="/world.png"
                         alt="World Map"
                         fill
                         className="object-contain opacity-70"
                       />
                     </div>
                     <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                       <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
                       <div className="mt-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs">
                         <span className="font-bold">580</span>
                         <span className="text-gray-400 text-[10px] ml-1">Europe</span>
                       </div>
                     </div>
                     <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
                       <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
                     </div>
                     <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center">
                       <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
                     </div>
                     <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
                       <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
                     </div>
                   </div>
                   <div className="flex justify-end mt-2">
                     <button className="bg-[#1a1a1a] p-2 rounded-md">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         className="h-5 w-5 text-gray-400"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19 9l-7 7-7-7"
                         />
                       </svg>
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </DashboardLayout>
      ) : (
        <div>Loading...</div>
      )} */}
    </div>
  );
}