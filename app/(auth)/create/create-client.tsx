"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

const CreateClient: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState<SuccessState>({});
  const [errors, setErrors] = useState<ErrorState>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) { 
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
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

    if (errors[name as keyof ErrorState]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true); 
    setErrors({}); 
    setSuccess({}); 

    try {
      const payload = {
        username: formData.name,
        email: formData.email,
        password: formData.password
      };

      const registrationResponse = await axios.post(
        `${apiUrl}/api/register`, 
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Registration successful', registrationResponse.data);

      setSuccess({ message: 'Registration successful! Logging you in...' });

      const signInResult = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (signInResult?.ok) {
        console.log('Automatic sign-in successful, redirecting...');
        router.push('/artistSignIn'); 
      } else {
        console.error("Automatic sign-in failed:", signInResult?.error);
        setErrors({ general: 'Registration succeeded, but automatic login failed. Please go to the Sign In page to log in manually.' });
        setSuccess({});
      }

    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(err)) {
        if (err.response) {
          errorMessage = err.response.data?.message || 'Registration failed';
        } else if (err.request) {
          errorMessage = 'No response from server. Please check your connection.';
        } else {
          errorMessage = 'Error in request setup';
        }
      }
      setErrors({ general: errorMessage });
      setSuccess({}); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen text-white font-poppins flex flex-col lg:flex-row auth-bg">
      <div className="w-full lg:w-1/2 py-12 lg:py-0 lg:h-screen relative flex items-center justify-center">
        <div className="flex items-center flex-col gap-4 justify-center h-full w-full">
          <Image
            width={1000}
            height={1000}
            src="/auth-logo.svg" 
            alt='MySound Logo'
            className="object-contain w-auto h-full max-h-[300px] lg:max-h-[300px]"
            priority
          />
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4">
            <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-[#FAFEEA] to-[#979797] bg-clip-text text-transparent">
              Explore New Music, <br />
              <span className="text-greenText">Listen on the Go</span>
            </h1>
            <Image
              width={400}
              height={400}
              src="/auth-wave.png" 
              alt='auth wave'
              className="object-contain w-auto h-full max-h-[150px] lg:max-h-[150px] mix-blend-luminosity"
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-12 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FAFEEA] to-[#979797] bg-clip-text text-transparent">
              Sign Up
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">Join us and start discovering!</p>
          </div>

          {errors.general && (
            <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded mb-4 text-sm sm:text-base">
              {errors.general}
            </div>
          )}
          {success.message && (
            <div className="bg-green-900 border border-green-700 text-green-100 p-3 rounded mb-4 text-sm sm:text-base">
              {success.message}
            </div>
          )}

          <form onSubmit={submitForm} className="space-y-6 md:space-y-8">
            <div>
              <input
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your name'
                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                    ${errors.name ? 'border-2 border-red-500' : 'border border-transparent'}`}
                disabled={isLoading} 
              />
              {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                    ${errors.email ? 'border-2 border-red-500' : 'border border-transparent'}`}
                disabled={isLoading} 
              />
              {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type='password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                    ${errors.password ? 'border-2 border-red-500' : 'border border-transparent'}`}
                disabled={isLoading} 
              />
              {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <input
                type='password'
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm your password'
                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                    ${errors.confirmPassword ? 'border-2 border-red-500' : 'border border-transparent'}`}
                disabled={isLoading} 
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className={`w-full p-3 text-[#0E0E0E] flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#E7F89D] 
                  ${isLoading ? 'bg-gray-600 cursor-not-allowed opacity-70' : 
                  'bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] transform hover:scale-105'}`}
              disabled={isLoading} 
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'} 
              {!isLoading && <FaArrowRightLong className="ml-2" />} 
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-400">
              Already have an account?{" "}
              <Link href="/signIn" style={{ color: '#C2EE03' }} className="text-greenText font-medium hover:underline ">
                Log In
              </Link>
            </p>
          </div>

          <div className="mt-16 text-center text-sm sm:text-base" style={{ color: '#5A5A5A' }}>By continuing you indicate that you read and agreed to the terms of Use</div>
        </div>
      </div>
    </div>
  );
}

export default CreateClient; 