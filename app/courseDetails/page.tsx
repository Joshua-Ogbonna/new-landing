// app/page.tsx
"use client";
import { LuBadgeCheck } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import SideBar from "../components/SideBar";
import { IoMdPerson } from "react-icons/io";
export default function Home() {
    const [transcript] = useState(
        `Welcome to our tutorial. In this video, we’ll walk you through the basics of web development using HTML, CSS, and JavaScript.
    
At the 1-minute mark, we’ll dive into building a simple layout. Around 3:45, we’ll add styles and animations. Finally, at 5:30, we’ll introduce JavaScript interactions.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 

reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem `
    );
    const items = [
        "Related Video 1",
        "Download Resources",
        "Discussion Forum",
        "Notes & Highlights",
    ];

    // Track clicked items by index
    const [clickedItems, setClickedItems] = useState<number[]>([]);

    const handleClick = (index: number) => {
        if (!clickedItems.includes(index)) {
            setClickedItems([...clickedItems, index]);
        }
    };
    return (
        <main className="min-h-screen bg-black">
            <div className="flex ">
                <SideBar isOpen={true} onClose={() => {}} />
                <div className="max-w-7xl mx-20 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-md">
                            <video controls className="w-full h-full">
                                <source src="/sample-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <h2 className="text-xl font-semibold mb-4">Transcription</h2>
                        {/* Transcript */}
                        <div className="bg-[#161717] p-6 rounded-2xl shadow-md">
                            <div className="mb-10">
                                <div className="flex gap-10">
                                    <h2 className="text-2xl text-white">Basics of web development</h2>
                                    <p className="flex items-center">   <IoMdPerson size={20} /> <span className="text-white"> student Enrolled : 198</span></p>

                                </div>
                                <h2 className="text-2xl">Jo Dash</h2>
                            </div>
                            <p className="whitespace-pre-line text-white leading-relaxed">{transcript}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="bg-[#161717] h-screen p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Overview</h2>
                        <ul className="list-inside text-white space-y-2">
                            {items.map((label, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-4 cursor-pointer text-white"
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
                        <button className="bg-lime-400 flex items-center justify-center gap-2 w-[200px] h-[30px] px-4 text-black rounded-xl font-bold text-sm transition-all hover:bg-lime-500 mt-20 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm">
                            View Badge
                            <FaAngleRight size={16} className="font-medium" />
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}
