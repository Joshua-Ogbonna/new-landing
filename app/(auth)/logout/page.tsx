"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaSignOutAlt } from "react-icons/fa";

const Logout: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear all authentication-related items from localStorage
        // localStorage.removeItem('userId');
        localStorage.removeItem('token');
        // If you have any other auth-related items, clear them here
        
        // Redirect to the login page
        router.push('/signIn');
    };

    return (
        <div className="min-h-screen bg-black text-white font-poppins flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-md bg-black/30 p-8 rounded-2xl shadow-lg text-center">
                <Image 
                    src="/NewGreenLogo.png" 
                    alt="Company Logo" 
                    width={150} 
                    height={50} 
                    className="h-12 w-auto mx-auto mb-8"
                />
                
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] bg-clip-text text-transparent">
                    Are you sure you want to log out?
                </h2>
                
                <p className="text-gray-300 mb-8">
                    You will need to sign in again to access your account.
                </p>
                
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={handleLogout}
                        className="w-full p-3 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] text-[#0E0E0E] rounded-3xl flex items-center justify-center space-x-2 hover:from-[#E7F89D] hover:to-[#FAFEEA] transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <span>Log Out</span>
                        <FaSignOutAlt size={18} />
                    </button>
                    
                    <button
                        onClick={() => router.back()}
                        className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-3xl hover:bg-gray-800 transition-all duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;