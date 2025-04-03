"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Validation Interfaces
interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ErrorState {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}
interface SuccessState {
    message?: string;
}
const SignUp: React.FC = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<ErrorState>({});
     const [success, setSuccess] = useState<SuccessState>({
                message: ''
            })
    const validateForm = (): boolean => {
        const newErrors: ErrorState = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

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

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
                username: formData.name,
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

            // Handle successful registration
               // Handle successful registration
               setSuccess(result.data)
               console.log('Registration successful', result.data);
               localStorage.setItem("token", result.data.data.token)
               console.log(result.data.data.token);
               

            router.push('/Dashboard')
            // TODO: Add navigation or success state
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                // Handle specific error responses
                if (err.response) {
                    // The request was made and the server responded with a status code
                    const errorMessage = err.response.data?.message || 'Registration failed';
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
             {/* Logo section (visible on mobile) */}
      <div className="lg:hidden flex justify-center p-6">
        <Link href="/">
          <Image 
            src="/Newblacklogo.png" 
            alt="Company Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto"
          />
        </Link>
      </div>
            <div className="w-full lg:w-1/2 relative">
             {/* Logo overlay (visible on desktop) */}
        <div className="absolute top-8 left-8 z-10 hidden lg:block">
          <Link href="/">
            <Image 
              src="/Newblacklogo.png" 
              alt="Company Logo" 
              width={150} 
              height={50} 
              className="h-12 w-auto"
            />
          </Link>
        </div>
                <Image 
                    width={800} 
                    height={900} 
                    src="/signIn.png" 
                    alt='green woman' 
                    className="object-center md:object-cover w-full md:h-screen h-[400px]"
                />
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                <div className="text-center mb-8">
          <div className="flex justify-between">
            <div></div>
            <Link href="/">
            <Image 
              src="/NewGreenLogo.png" 
              alt="Company Logo" 
              width={150} 
              height={50} 
              className="h-12 w-auto flex justify-end"
            />
          </Link>
          </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] bg-clip-text text-transparent">Sign Up</h2>
            <p className="text-gray-400">Let&apos;s Rock!!! Begin your listening run.</p>
          </div>
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

                    <form onSubmit={submitForm} className="space-y-4">
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
                            className="w-full p-3 bg-green-600 text-[#0E0E0E] flex items-center justify-center space-x-2 hover:bg-green-700 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E7F89D] rounded-3xl"
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