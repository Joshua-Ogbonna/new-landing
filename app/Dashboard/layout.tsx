'use client';

import React, { useState } from 'react';
import SideBar from '../components/SideBar'; // Adjust path if needed
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for mobile menu toggle
import { useSession } from 'next-auth/react'; // To potentially get user data for sidebar

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession(); // Get session and status

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const userName = status === 'authenticated' ? session?.user?.artistName?.split(' ')[0] : 'Unknown Artist'; 
    return (
        <div className="relative min-h-screen bg-black text-white font-poppins">
            {/* Sidebar - Fixed on desktop, Off-canvas on mobile */}
            <SideBar
                image={session?.user?.image || undefined} // Pass session image to sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Top Bar - Only visible below lg breakpoint */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center px-4 z-40">
                <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-white mr-4">
                    <FaBars size={24} />
                </button>
                {/* You can add a logo or page title here if desired */}
                <span className="font-semibold">Dashboard</span>
            </div>

            {/* Overlay for mobile menu - shown when menu is open, below lg breakpoint */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main Content Area */}
            {/* Adjusted padding-left for wider lg sidebar (lg:w-64) */}
            <main className="pt-16 lg:pt-6 lg:pl-72 px-4 sm:px-6 pb-6"> {/* lg:pl-64 + px-4 = 256 + 16 = 272px -> pl-72 covers this */}
                {/* Header - Added back */}
                <div className="mb-6 pt-6 lg:pt-0"> {/* Add top padding only on mobile below top bar */}
                    <h1 className="text-2xl sm:text-3xl font-bold">Good Morning, {userName}!</h1>
                    <p className="text-gray-400 text-sm sm:text-base">Your overview is here.</p>
                </div>
                {/* lg:pl-[80px] + 20px padding = 100px */}
                {children}
            </main>
        </div>
    );
} 