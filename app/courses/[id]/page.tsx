"use client";
import { useParams } from 'next/navigation';
import { LuBadgeCheck } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import SideBar from "@/app/components/SideBar";
import axios from 'axios';

export default function Home() {
    const params = useParams();
    const id = params.id;

    const [courseData, setCourseData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const items = [
        "Related Video 1",
        "Download Resources",
        "Discussion Forum",
        "Notes & Highlights",
    ];

    const [clickedItems, setClickedItems] = useState<number[]>([]);

    const handleClick = (index: number) => {
        if (!clickedItems.includes(index)) {
            setClickedItems([...clickedItems, index]);
        }
    };

    useEffect(() => {
        getCourse();

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCourse = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCourseData(response.data);
        } catch (err: any) {
            console.error("Error fetching course:", err);
            setError(err.message || 'Failed to load course data');
        } finally {
            setLoading(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Mobile menu toggle */}
            <button 
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md"
                aria-label="Toggle sidebar"
            >
                {sidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>

            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar */}
                <div className={`
                    ${sidebarOpen ? 'fixed inset-0 z-40 bg-black bg-opacity-90' : 'hidden'} 
                    lg:relative lg:block 
                    w-full max-w-xs lg:max-w-[240px] 
                    overflow-y-auto
                `}>
                    <div className="relative h-full bg-[#111] p-4">
                        <button 
                            onClick={toggleSidebar}
                            className="lg:hidden absolute top-4 right-4 text-white"
                        >
                            <IoClose size={24} />
                        </button>
                        <SideBar />
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Video */}
                            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-md">
                                <video controls className="w-full h-full object-cover rounded-2xl">
                                    <source src="/sample-video.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Transcription</h2>

                            {/* Loading */}
                            {loading && (
                                <div className="bg-[#161717] p-6 rounded-2xl shadow-md animate-pulse">
                                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                </div>
                            )}

                            {/* Error */}
                            {error && !loading && (
                                <div className="bg-[#161717] p-6 rounded-2xl shadow-md">
                                    <p className="text-red-500">Error: {error}</p>
                                    <button 
                                        onClick={getCourse}
                                        className="mt-4 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {/* Transcript */}
                            {!loading && !error && (
                                <div className="bg-[#161717] p-6 rounded-2xl shadow-md">
                                    <div className="mb-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10">
                                            <h2 className="text-xl sm:text-2xl text-white">
                                                {courseData?.title || "Basics of web development"}
                                            </h2>
                                            <p className="flex items-center">
                                                <IoMdPerson size={20} className="text-white" /> 
                                                <span className="text-white ml-1">
                                                    Students Enrolled: {courseData?.enrolledCount || 198}
                                                </span>
                                            </p>
                                        </div>
                                        <h2 className="text-xl sm:text-2xl mt-2">
                                            {courseData?.instructor || "Jo Dash"}
                                        </h2>
                                    </div>
                                    <p className="whitespace-pre-line text-white leading-relaxed">
                                        {courseData?.transcript || ""}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Overview */}
                        <aside className="bg-[#161717] p-6 rounded-2xl shadow-md mt-8 lg:mt-0 lg:h-screen lg:sticky lg:top-0 overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-4">Overview</h2>
                            <ul className="list-inside space-y-4">
                                {items.map((label, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-4 cursor-pointer"
                                        onClick={() => handleClick(index)}
                                    >
                                        <LuBadgeCheck
                                            size={20}
                                            color={clickedItems.includes(index) ? "#C2EE03" : "#313133"}
                                        />
                                        <span>{label}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-lime-400 flex items-center justify-center gap-2 w-full sm:w-[200px] h-[40px] sm:h-[30px] px-4 text-black rounded-xl font-bold text-sm transition-all hover:bg-lime-500 mt-10 sm:mt-20 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm">
                                View Badge
                                <FaAngleRight size={16} className="font-medium" />
                            </button>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}
