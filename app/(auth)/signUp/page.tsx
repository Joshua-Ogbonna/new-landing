"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";


// Validation Schema


const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       // Replace the problematic conditional expression
       if (formData) {
        alert('Credentials received');
    } else {
        alert('Error: could not validate');
    }

    // Replace the ternary with a proper conditional
    if (setErrors) {
        console.log(setErrors);
    } else {
        console.log(formData);
    }
        
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
            {/* Image Section - Full width on mobile, half width on desktop */}
            <div className="w-full lg:w-1/2 relative">
        <Image 
          width={800} 
          height={900} 
          src="/signup.png" 
          alt='green woman' 
          className="object-center md:object-cover w-full md:h-screen h-[400px]"
        />
      </div>

            {/* Form Section - Full width on mobile, half width on desktop */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Top Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Create Account</h2>
                        <p className="text-gray-400">Let&apos;s Rock!!! Begin your listening run.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Enter your name'
                                className={`w-full p-3 bg-formBg text-white rounded 
                  ${errors.name ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                                className={`w-full p-3 bg-formBg text-white rounded 
                  ${errors.email ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <input
                                type='password'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                className={`w-full p-3 bg-formBg text-white rounded 
                  ${errors.password ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm your password'
                                className={`w-full p-3 bg-formBg text-white rounded 
                  ${errors.confirmPassword ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 bg-green-600 text-[#0E0E0E]  flex items-center justify-center space-x-2 hover:bg-green-700  bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D]  hover:to-[#FAFEEA] transition-all duration-300        ease-in-out transform hover:scale-105 focus:outline-none         focus:ring-2 focus:ring-[#E7F89D] rounded-3xl"
                        >
                            <span>Submit Details</span>
                            <FaArrowRightLong size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp