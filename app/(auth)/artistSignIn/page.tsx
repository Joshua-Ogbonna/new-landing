"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';

interface ErrorState {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    bio?: string;
    profileImage?: string;
    instagramLink?: string;
    facebookLink?: string;
    twitterLink?: string;
    personalLink?: string;
    general?: string;
}

interface SuccessState {
    message?: string;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    bio: string;
    profileImage: string;
    instagramLink: string;
    facebookLink: string;
    twitterLink: string;
    personalLink: string;
}

const ArtistSignUp: React.FC = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        profileImage: '',
        instagramLink: '',
        facebookLink: '',
        twitterLink: '',
        personalLink: ''
    });

    const [success, setSuccess] = useState<SuccessState>({
        message: ''
    })
    const [errors, setErrors] = useState<ErrorState>({});
    const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        // Only run on client-side
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem("userId");
            setUserId(storedUserId);
        }
    }, []);


    // console.log(Id);

    const validateForm = (): boolean => {
        const newErrors: ErrorState = {};

        // Existing validations
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

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // New field validations
        if (formData.bio.length > 500) {
            newErrors.bio = 'Bio must be 500 characters or less';
        }

        // URL validation function
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        // Optional URL validations
        if (formData.instagramLink && !urlRegex.test(formData.instagramLink)) {
            newErrors.instagramLink = 'Invalid Instagram link';
        }

        if (formData.facebookLink && !urlRegex.test(formData.facebookLink)) {
            newErrors.facebookLink = 'Invalid Facebook link';
        }

        if (formData.twitterLink && !urlRegex.test(formData.twitterLink)) {
            newErrors.twitterLink = 'Invalid Twitter link';
        }

        if (formData.personalLink && !urlRegex.test(formData.personalLink)) {
            newErrors.personalLink = 'Invalid personal link';
        }

        // Profile image validation (basic check)
        // if (formData.profileImage) {
        //     const imageRegex = /\.(jpeg|jpg|gif|png|webp)$/i;
        //     if (!imageRegex.test(formData.profileImage)) {
        //         newErrors.profileImage = 'Invalid image file type';
        //     }
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        try {
            // Add more detailed logging
            console.log('Payload being sent:', {
                username: formData.name,
                email: formData.email,
                // Be careful not to log passwords
                bio: formData.bio,
                socialLinks: {
                    instagram: formData.instagramLink,
                    facebook: formData.facebookLink,
                    twitter: formData.twitterLink,
                    personalWebsite: formData.personalLink
                }
            });

            // const result = await axios.post(
            //     'https://mysounduk-service.com/api/register', 
            //     {


            //         user_id: Id,
            //         socialLinks: {
            //             instagram: formData.instagramLink,
            //             facebook: formData.facebookLink,
            //             twitter: formData.twitterLink,
            //             personalWebsite: formData.personalLink
            //         }
            //     },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             ...(Id ? { 'Authorization': `Bearer ${Id}` } : {})
            //         }
            //     }
            // );

            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    name: formData.name,
                    bio: formData.bio,
                    image: formData.profileImage,
                    instagram: formData.instagramLink,
                    facebook: formData.facebookLink,
                    twitter: formData.twitterLink,
                    personalWebsite: formData.personalLink
                }),
            });

            // Handle successful registration
            setSuccess({ message: 'Registration successful' })
            console.log('Registration successful', result);

            router.push("/signIn")
        }
        catch (err) {
            console.error('Full error object:', err);

            if (axios.isAxiosError(err)) {
                if (err.response) {
                    // Log the full error response for more details
                    console.error('Error response:', err.response);
                    const errorMessage = err.response.data?.message || 'Registration failed';
                    const errorStatus = err.response.status;

                    setErrors({
                        general: `${errorMessage} (Status: ${errorStatus})`
                    });
                } else if (err.request) {
                    setErrors({
                        general: 'No response from server. Please check your connection.'
                    });
                } else {
                    setErrors({
                        general: 'Error in request setup'
                    });
                }
            } else {
                setErrors({
                    general: 'An unexpected error occurred'
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-poppins flex justify-center items-center ">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Artist SignUp</h2>
                        <p className="text-gray-400">Complete your registration</p>
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
                        {/* Existing fields */}
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

                        {/* New fields */}
                        <div>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder='Enter a short bio (max 500 characters)'
                                className={`w-full p-3 bg-formBg text-white rounded 
                                    ${errors.bio ? 'border-2 border-red-500' : ''}`}
                                maxLength={500}
                            />
                            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="profileImage"
                                value={formData.profileImage}
                                pattern="https?://.*\.(jpg|jpeg|png|gif|webp)"
                                onChange={handleChange}
                                placeholder='Profile Image URL'
                                className={`w-full p-3 bg-formBg text-white rounded 
                                    ${errors.profileImage ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="instagramLink"
                                value={formData.instagramLink}
                                onChange={handleChange}
                                placeholder='Instagram Profile URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded 
                                    ${errors.instagramLink ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.instagramLink && <p className="text-red-500 text-sm mt-1">{errors.instagramLink}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="facebookLink"
                                value={formData.facebookLink}
                                onChange={handleChange}
                                placeholder='Facebook Profile URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded 
                                    ${errors.facebookLink ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.facebookLink && <p className="text-red-500 text-sm mt-1">{errors.facebookLink}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="twitterLink"
                                value={formData.twitterLink}
                                onChange={handleChange}
                                placeholder='Twitter Profile URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded 
                                    ${errors.twitterLink ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.twitterLink && <p className="text-red-500 text-sm mt-1">{errors.twitterLink}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="personalLink"
                                value={formData.personalLink}
                                onChange={handleChange}
                                placeholder='Personal Website URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded 
                                    ${errors.personalLink ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.personalLink && <p className="text-red-500 text-sm mt-1">{errors.personalLink}</p>}
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

            export default ArtistSignUp