"use client"

import React from 'react'
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import HeroBanner from "../components/Dashboard/HeroBanner";
import ArtistProfile from "../components/Dashboard/ArtistProfile";
import StreamsChart from "../components/Dashboard/StreamsChart";
import TopCountries from "../components/Dashboard/TopCountries";

const page = () => {
  return (
<DashboardLayout name="John Doe Artist" image="/ava.png">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - 70% width */}
        <div className="flex-1">
          <HeroBanner />
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            <div className="flex-3 space-y-6 h-full">
              <ArtistProfile
                name="John Doe"
                role="Singer-Songwriter"
                bio="Award-winning musician with a passion for indie rock and storytelling through music. Creating soulful melodies that connect with audiences worldwide."
                picture="/ava.png"
              />
            </div>
            <div className="flex-1 space-y-8 h-full">
              <StreamsChart />
              <TopCountries artistId="artist_123" />
            </div>
          </div>
        </div>

        {/* Right Section - 30% width */}
        <div className="lg:w-[30%] space-y-6">
          {/* Visitors Analytics */}
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
                    <div className="text-4xl font-bold">5,420</div>
                    <div className="text-sm text-gray-400">Visitors</div>
                  </div>
                </div>
                {/* Donut chart segments */}
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
                <span className="ml-auto text-sm">40%</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-[#31C4FB] rounded-full mr-2"></span>
                <span className="text-sm">Tablet</span>
                <span className="ml-auto text-sm">15%</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-[#C2EE03] rounded-full mr-2"></span>
                <span className="text-sm">Mobile</span>
                <span className="ml-auto text-sm">35%</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                <span className="text-sm">Unknown</span>
                <span className="ml-auto text-sm">10%</span>
              </div>
            </div>
          </div>

          {/* Sells by State */}
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
                  <span className="font-bold">980</span>
                  <span className="text-gray-400 text-[10px] ml-1">Europe</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
                <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
                <div className="mt-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs">
                  <span className="font-bold">620</span>
                  <span className="text-gray-400 text-[10px] ml-1">North America</span>
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center">
                <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
                <div className="mt-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs">
                  <span className="font-bold">340</span>
                  <span className="text-gray-400 text-[10px] ml-1">Asia</span>
                </div>
              </div>
              <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
                <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
                <div className="mt-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs">
                  <span className="font-bold">480</span>
                  <span className="text-gray-400 text-[10px] ml-1">South America</span>
                </div>
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
  )
}

export default page