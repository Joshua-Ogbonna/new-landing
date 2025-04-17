"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Validation Interfaces
interface FormData {
    email: string;
    password: string;
}

interface ErrorState {
    email?: string;
    password?: string;
    general?: string;
}

interface SuccessState {
    message?: string;
}

const Login: React.FC = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<ErrorState>({});
    const [success, setSuccess] = useState<SuccessState>({
        message: ''
    });

    const validateForm = (): boolean => {
        const newErrors: ErrorState = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific field error when user starts typing
        if (errors[name as keyof ErrorState]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            // Prepare payload matching backend expectations
            const payload = {
                email: formData.email,
                password: formData.password
            };

            const result = await axios.post(
                'https://mysounduk-service.com/api/login',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Handle successful login
            setSuccess({
                message: 'Login successful!'
            });

            // Store token in localStorage
            localStorage.setItem("token", result.data.data.token);

            // Redirect to dashboard
            router.push('/Dashboard');
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                // Handle specific error responses
                if (err.response) {
                    // The request was made and the server responded with a status code
                    const errorMessage = err.response.data?.message || 'Login failed';
                    setErrors({
                        general: errorMessage
                    });
                } else if (err.request) {
                    // The request was made but no response was received
                    setErrors({
                        general: 'No response from server. Please check your connection.'
                    });
                } else {
                    // Something happened in setting up the request
                    setErrors({
                        general: 'Error in request setup'
                    });
                }
            } else {
                // Handle non-axios errors
                setErrors({
                    general: 'An unexpected error occurred'
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-poppins flex flex-col lg:flex-row">
            {/* Left side - Image */}
            <div className="w-full lg:w-1/2 relative h-[300px] lg:h-auto">
                <div className="absolute top-8 left-8 z-10 hidden lg:block">
                    {/* Logo can be uncommented if needed */}
                    {/* <Link href="/">
                        <Image 
                            src="/Newblacklogo.png" 
                            alt="Company Logo" 
                            width={150} 
                            height={50} 
                            className="h-12 w-auto"
                        />
                    </Link> */}
                </div>

                <style>{`
                    .container-1 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                    }
            
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                        100% { transform: scale(1); }
                    }
            
                    .pulsing-image {
                        animation: pulse 3s ease-in-out infinite;
                        width: 400px;
                        height: 400px;
                    }
                `}</style>

                <div className="container-1">
                    <Image
                        width={200}
                        height={200}
                        src="/signIn2.png"
                        alt='green woman'
                        className="pulsing-image object-center md:object-contain w-fit md:h-screen h-[200px]"
                        priority
                    />
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center md:mt-28 p-6 lg:p-12 
                    absolute top-0 left-0 h-full z-20 lg:static 
                    backdrop-blur-md rounded-none lg:rounded-none">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Log In</h2>
                        <p className="text-gray-400">Keep the music alive—log in to continue.</p>
                    </div>

                    {errors.general && (
                        <div className="bg-red-500 text-white p-3 rounded mb-4">
                            {errors.general}
                        </div>
                    )}

                    {success.message && (
                        <div className="bg-green-500 text-white p-3 rounded mb-4">
                            {success.message}
                        </div>
                    )}

                    <form onSubmit={submitForm} className="space-y-8">
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

                        <button
                            type="submit"
                            className="w-full p-3 bg-green-600 text-[#0E0E0E] flex items-center justify-center space-x-2 hover:bg-green-700 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E7F89D] rounded-3xl"
                        >
                            <span>Log In</span>
                            <FaArrowRightLong size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login