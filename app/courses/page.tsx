"use client";
import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Categories from '../components/Categories';
import Courses from '../components/Courses';
import CourseCard from '../components/CourseCard';

const Page = () => {
    // State for controlling sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Handler to close sidebar (for mobile view)
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className='flex flex-col font-poppins min-h-screen bg-black'>
            {/* Sidebar */}
            <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

            {/* Mobile top bar including toggle button */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#2a2a2a] z-40 flex items-center px-4">
                <button
                    className="p-2 text-gray-400 hover:text-white"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className="ml-4 text-lg font-semibold text-white">Courses</span>
            </div>

            {/* Main content wrapper - Adjusts for sidebar */}
            <main className="flex-1 transition-all duration-300 ease-in-out lg:pl-64">
                {/* Add padding top for mobile header, and standard padding for content */}
                <div className='pt-20 lg:pt-8 px-4 sm:px-6 lg:px-8 pb-8'>
                    {/* Responsive grid layout */}
                    <div className='grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-8'>
                        {/* Main content section */}
                        <div className='lg:col-span-4 w-full'>
                            {/* Hero banner - Adjustments */}
                            <div className="bg-gradient-to-r rounded-xl sm:rounded-2xl p-6 sm:p-8 from-[#F3FCCF] to-[#8FA13B] w-full">
                                <p className='text-black text-lg sm:text-xl font-normal'>Online Course</p>
                                <h2 className='font-bold text-xl sm:text-2xl lg:text-3xl text-black mt-3 sm:mt-4 max-w-full lg:max-w-lg'>
                                    Sharpen Your Skills With Professional Online Courses
                                </h2>
                            </div>

                            {/* Courses section container */}
                            <div className='bg-[#161717] w-full p-4 sm:p-6 mt-6 sm:mt-8 rounded-xl sm:rounded-2xl'>
                                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Available Courses</h3>
                                <Courses />
                            </div>
                        </div>

                        {/* Sidebar content - Stacks on mobile */}
                        <div className='lg:col-span-3 w-full'>
                            <div className='space-y-6 lg:space-y-8'>
                                <div className='bg-[#161717] p-4 sm:p-6 rounded-xl sm:rounded-2xl'>
                                    <p className='font-medium text-white text-lg mb-3 sm:mb-4'>Categories</p>
                                    <Categories />
                                </div>
                                <div className='bg-[#161717] p-4 sm:p-6 rounded-xl sm:rounded-2xl'>
                                    <p className='font-medium text-white text-lg mb-3 sm:mb-4'>Featured Course</p>
                                    <CourseCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;