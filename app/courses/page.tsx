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
        <div className='flex flex-col font-poppins min-h-screen'>
            {/* Sidebar - uncomment once component is ready */}
            {/* <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} /> */}
            
            <div className="flex-1 relative">
                {/* Mobile sidebar toggle button */}
                <button 
                    className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-black rounded-md"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                
                {/* Main content area */}
                <div className='px-4 sm:px-6 md:px-8 mt-16 lg:mt-10'>
                    {/* Responsive grid layout */}
                    <div className='grid grid-cols-1 lg:grid-cols-7 gap-6'>
                        {/* Main content section */}
                        <div className='lg:col-span-4 w-full'>
                            {/* Hero banner - fully responsive */}
                            <div className="bg-gradient-to-r rounded-3xl p-5 from-[#F3FCCF] to-[#8FA13B] w-full">
                                <p className='text-white text-xl sm:text-2xl font-thin'>Online Course</p>
                                <h2 className='font-bold text-xl sm:text-2xl text-black max-w-md mt-4 sm:mt-8'>
                                    Sharpen Your Skills With Professional Online Courses
                                </h2>
                            </div>
                            
                            {/* Courses section */}
                            <div className='bg-[#161717] w-full p-2 mt-6 sm:mt-8 rounded-xl'>
                                <Courses />
                            </div>
                        </div>

                        {/* Sidebar content - will stack vertically on mobile */}
                        <div className='lg:col-span-3 w-full'>
                            <div className='space-y-6'>
                                <div>
                                    <p className='font-medium mb-2'>Categories</p>
                                    <Categories />
                                </div>
                                <CourseCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;