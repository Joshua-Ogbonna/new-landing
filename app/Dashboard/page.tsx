"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image";
// import { useEffect, useState } from "react";
import HeroBanner from "../components/Dashboard/HeroBanner";
import ArtistProfile from "../components/Dashboard/ArtistProfile";
import StreamsChart from "../components/Dashboard/StreamsChart";
import Songs from "../components/Dashboard/Songs";
import { useSession } from 'next-auth/react';
import axios from 'axios'; // Import axios for fetching
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Adjust types based on actual API responses
interface ArtistData {
  id: string;
  name: string;
  bio?: string;
  image?: string; // Match backend snake_case
  // Add other expected fields
}

interface DashboardStats {
  totalSongPlays?: number;
  totalProfileVisits?: number;
  totalFollowers?: number;
  // Add other expected fields
}

const DashboardPage = () => {
  const { data: session, status } = useSession();
  
  // State for Artist Profile
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // State for Dashboard Stats
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Re-introduce placeholder role
  const userRole = "Artist"; 

  // Log session data
  // useEffect(() => {
  //   console.log("[DashboardPage] Session Status:", status);
  //   console.log("[DashboardPage] Session Data:", session);
  // }, [session, status]);

  // Effect to fetch data when session is available
  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.accessToken && session?.user?.id) {
        
        // Reset states on new fetch attempt
        setIsLoadingProfile(true);
        setIsLoadingStats(true);
        setProfileError(null);
        setStatsError(null);

        // Fetch Artist Profile
        try {
          const profileResponse = await axios.get(
            `${API_URL}/api/artists/profile/${session.user.id}`, 
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (profileResponse.data && profileResponse.data.ok) {
             setArtistData(profileResponse.data.data);
          } else {
             throw new Error(profileResponse.data?.message || "Failed to get valid profile data.");
          }
        } catch (error: any) {
          console.error("[DashboardPage] Failed to fetch artist profile:", error);
          setProfileError(error.response?.data?.message || error.message || "Failed to load profile data.");
          setArtistData(null);
        } finally {
          setIsLoadingProfile(false);
        }

        // Fetch Dashboard Stats
        try {
           const statsResponse = await axios.get(
            `${API_URL}/api/artist/dashboard`, 
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
           if (statsResponse.data && statsResponse.data.ok) {
             setDashboardStats(statsResponse.data.data);
             console.log("[DashboardPage] Dashboard stats:", statsResponse.data.data);
          } else {
             throw new Error(statsResponse.data?.message || "Failed to get valid dashboard stats.");
          }
        } catch (error: any) {
          console.error("[DashboardPage] Failed to fetch dashboard stats:", error);
          setStatsError(error.response?.data?.message || error.message || "Failed to load dashboard stats.");
          setDashboardStats(null);
        } finally {
          setIsLoadingStats(false);
        }

      } else if (status !== 'loading') {
        // If not authenticated or loading, ensure loading states are false
        setIsLoadingProfile(false);
        setIsLoadingStats(false);
        setArtistData(null);
        setDashboardStats(null);
        if (status === 'unauthenticated') {
             console.log("[DashboardPage] User unauthenticated.");
             // Optionally set error message or handle redirect if needed
             // setProfileError("Please log in to view your dashboard.");
        }
      }
    };

    fetchData();
  }, [session, status]); // Depend on session and status

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-w-0">
      {/* Left Section - Takes full width on mobile, flex-1 on large */}
      <div className="flex-1 space-y-6 min-w-0">
        <HeroBanner />
        {/* Inner section: stack vertically, then switch to row */}
        <div className="flex flex-col md:flex-row gap-6 min-w-0">
          {/* Use space-y for vertical stacking, flex-basis for horizontal distribution? */}
          {/* Example: md:basis-2/3 */}
          <div className="flex-grow space-y-6 min-w-0"> 
            {isLoadingProfile ? (
              <div className="bg-[#1F1F1F] rounded-xl p-6 h-40 flex items-center justify-center text-gray-400">Loading Profile...</div>
            ) : profileError ? (
              <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded text-sm">Error: {profileError}</div>
            ) : artistData ? (
              <ArtistProfile
                name={artistData.name ?? 'N/A'}
                role={userRole}
                bio={artistData.bio}
                picture={artistData.image}
              />
            ) : (
               <div className="bg-[#1F1F1F] rounded-xl p-6 h-40 flex items-center justify-center text-gray-500">Profile data unavailable.</div>
            )}
          </div>
           {/* Example: md:basis-1/3 */}
          <div className="flex-grow space-y-6 md:space-y-8 min-w-0"> 
            <StreamsChart />
            <Songs artistId={artistData?.id} />
          </div>
        </div>
      </div>

      {/* Right Section - Takes full width on mobile, fixed width on large */}
      {/* Use w-full on mobile/tablet, lg:w-[30%] for large */}
      <div className="w-full lg:w-[30%] xl:w-[25%] space-y-6 flex-shrink-0 min-w-0"> {/* Added xl width and flex-shrink-0 */} 
        {/* Visitors Analytics Card */}
        <div className="bg-[#1F1F1F] rounded-xl p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-medium">Visitors Analytics</h3>
            <div className="bg-[#C2EE03] text-black px-3 py-1 rounded-md text-xs font-medium">
              Monthly
            </div>
          </div>
          {/* Responsive Donut Chart Container */}
          <div className="relative h-56 sm:h-64 flex items-center justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <div className="text-center">
                  {/* Display fetched visits or loading/error state */}
                  <div className="text-3xl sm:text-4xl font-bold">
                     {isLoadingStats ? (
                         <span className="text-2xl text-gray-500">...</span> 
                     ) : statsError ? (
                         <span className="text-red-500 text-2xl">!</span>
                     ) : (
                         dashboardStats?.totalProfileVisits?.toLocaleString() ?? '0'
                     )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">Visitors</div>
                </div>
              </div>
              <svg viewBox="0 0 100 100" className="absolute inset-0 transform -rotate-90">
                {/* Adjusted strokeWidth slightly for smaller views? Might not be necessary */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4B6BFB" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#C2EE03" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="62.8" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#31C4FB" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="188.4" /> 
                {/* Add grey background circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#333" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="0" style={{strokeDashoffset: 251.2 * (1 - 0.10), strokeDasharray: `251.2 ${251.2}`}} transform="rotate(180 50 50)" />
              </svg>
            </div>
          </div>
          {/* Responsive Legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs sm:text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-[#4B6BFB] rounded-full mr-2 flex-shrink-0"></span>
              <span className="truncate mr-1">Desktop</span>
              <span className="ml-auto text-gray-400">40%</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-[#31C4FB] rounded-full mr-2 flex-shrink-0"></span>
              <span className="truncate mr-1">Tablet</span>
              <span className="ml-auto text-gray-400">15%</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-[#C2EE03] rounded-full mr-2 flex-shrink-0"></span>
              <span className="truncate mr-1">Mobile</span>
              <span className="ml-auto text-gray-400">35%</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-gray-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className="truncate mr-1">Unknown</span>
              <span className="ml-auto text-gray-400">10%</span>
            </div>
          </div>
        </div>

        {/* Sells by State Card */}
        <div className="bg-[#1F1F1F] rounded-xl p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-medium">Sales by Region</h3>
            <div className="text-gray-400 text-xs">
              Last 7 days
            </div>
          </div>
          {/* Make map container responsive */}
          <div className="relative h-56 sm:h-64 flex items-center justify-center overflow-hidden">
             {/* Image needs careful handling for responsiveness */}
            <Image
              src="/world.png"
              alt="World Map Background"
              layout="fill" // Use fill potentially
              objectFit="contain" // Adjust object fit 
              className="opacity-50 max-w-full max-h-full"
            />
             {/* Consider removing absolute positioning of text or making it responsive */}
             {/* This part is tricky to make truly responsive without more complex logic or a different visualization */}
             {/* Example: Maybe list regions instead on small screens */}
            <div className="absolute grid grid-cols-2 gap-2 text-[10px] sm:text-xs w-full p-2">
                <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded flex justify-between"><span>Europe</span><span className="font-bold">980</span></div>
                <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded flex justify-between"><span>N. America</span><span className="font-bold">620</span></div>
                <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded flex justify-between"><span>Asia</span><span className="font-bold">340</span></div>
                <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded flex justify-between"><span>S. America</span><span className="font-bold">480</span></div>
            </div>
          </div>
          {/* Removed the dropdown button for simplicity, add back if needed */}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage