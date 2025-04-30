"use client" // Keep this directive
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react'; // Import signIn
// Removed Metadata import and export
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// ... existing interfaces ...
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

// Rename the exported component
const SignInClient: React.FC = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<ErrorState>({});
    const [success, setSuccess] = useState<SuccessState>({}); 
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    // ... validateForm function remains the same ...
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

    // ... handleChange function remains the same ...
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

    // Updated submitForm to use signIn
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});
        setSuccess({});

        try {
            const result = await signIn('credentials', {
                redirect: false, // Handle redirect manually
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                // Handle authentication errors (e.g., invalid credentials)
                console.log('signIn result:', result);
                setErrors({ general: result.error });
                setSuccess({});
            } else if (result?.ok) {
                // Handle successful authentication
                setSuccess({ message: 'Login successful! Redirecting...' });
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    router.push('/Dashboard'); 
                    // Potentially refresh to ensure middleware redirects if needed
                    // router.refresh(); 
                }, 1500);
            } else {
                 // Handle unexpected non-error cases from signIn
                 setErrors({ general: 'An unexpected error occurred during sign in.' });
                 setSuccess({});
            }
        } catch (error) {
            // Handle network errors or other unexpected issues during the signIn call itself
            console.error("Error calling signIn:", error);
            setErrors({ general: 'Failed to reach authentication service. Please try again later.' });
            setSuccess({});
        } finally {
            // Only set loading false if not redirecting immediately
            // Since we have a timeout, we can set it here.
            // If redirecting instantly on success, you might delay this or handle it differently.
             if (!success.message) { // Avoid setting loading false if success message is shown before redirect timeout
                 setIsLoading(false);
             }
        }
    };

    // ... JSX return remains the same ...
    return (
        <div className="min-h-screen text-white font-poppins flex flex-col lg:flex-row auth-bg">
            {/* Left side - Image */}
            <div className="w-full lg:w-1/2 py-12 lg:py-0 lg:h-screen relative flex items-center justify-center">

                <style>{`
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
            
                    .pulsing-image {
                        animation: pulse 4s ease-in-out infinite;
                    }

                    @media (max-width: 1023px) { 
                        .pulsing-image {
                           /* animation: none; */
                        }
                    }
                `}</style>

                <div className="flex items-center flex-col gap-4 justify-center h-full w-full">
                    <Image
                        width={1000}
                        height={1000}
                        src="/auth-logo.svg"
                        alt='green woman'
                        className="object-contain w-auto h-full max-h-[300px] lg:max-h-[300px]"
                        priority
                    />
                    {/* This div wraps the H1 and the Image below, hiding them on small screens (mobile) 
                        and showing them as a centered column on large screens (lg breakpoint and up). 
                        NOTE: A closing </div> tag needs to be added after the second Image component. 
                        The text-center class can likely be removed from the H1 inside this wrapper. */}
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

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-12 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FAFEEA] to-[#979797] bg-clip-text text-transparent">
                            Log In
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base">Let's Rock!!! Resume your beats run.</p>
                    </div>

                    {/* Display General Error */} 
                    {errors.general && (
                        <div className="bg-red-900 border border-red-900 text-red-100 p-3 rounded mb-4 text-sm sm:text-base">
                            {errors.general}
                        </div>
                    )}

                    {/* Display Success Message */}
                    {success.message && (
                        <div className="bg-green-900 border border-green-700 text-green-100 p-3 rounded mb-4 text-sm sm:text-base">
                            {success.message}
                        </div>
                    )}

                    <form onSubmit={submitForm} className="space-y-6 md:space-y-8">
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

                        <button
                            type="submit"
                            className={`w-full p-3 text-[#0E0E0E] flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#E7F89D] 
                                ${isLoading ? 'bg-gray-600 cursor-not-allowed opacity-70' : 
                                'bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] transform hover:scale-105'}`}
                            disabled={isLoading} 
                        >
                            {isLoading ? 'Logging In...' : 'Log In'} 
                            {!isLoading && <FaArrowRightLong className="ml-2" />} 
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm sm:text-base text-gray-400">
                            Existing User?{" "}
                            <Link href="/create" style={{ color: '#C2EE03' }} className="text-greenText font-medium hover:underline ">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-16 text-center text-sm sm:text-base" style={{ color: '#5A5A5A' }}>By continuing you indicate that you read and agreed to the terms of Use</div>
                </div>
            </div>
        </div>
    )
}

export default SignInClient; // Export the renamed component 