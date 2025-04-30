"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios'; 
import Image from 'next/image'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface ErrorState {
    name?: string;
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
    bio: string;
    profileImage: string;
    instagramLink: string;
    facebookLink: string;
    twitterLink: string;
    personalLink: string;
}

const ArtistProfileClient: React.FC = () => {
    const router = useRouter()
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        bio: '',
        profileImage: '',
        instagramLink: '',
        facebookLink: '',
        twitterLink: '',
        personalLink: ''
    });

    const [success, setSuccess] = useState<SuccessState>({});
    const [errors, setErrors] = useState<ErrorState>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const newErrors: ErrorState = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (formData.bio.length > 500) {
            newErrors.bio = 'Bio must be 500 characters or less';
        }

        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

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

        if (status !== 'authenticated' || !session?.user?.id || !session?.accessToken) {
            setErrors({ general: "You must be logged in to create an artist profile." });
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});
        setSuccess({});

        try {
            const payload = {
                user_id: session.user.id,
                name: formData.name,
                bio: formData.bio,
                image: formData.profileImage || undefined,
                instagram: formData.instagramLink || undefined,
                facebook: formData.facebookLink || undefined,
                twitter: formData.twitterLink || undefined,
                personalWebsite: formData.personalLink || undefined
            };
            console.log('Payload being sent:', payload);

            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/artist/register`, 
                payload, 
                { 
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session.accessToken}` 
                    } 
                }
            );

            setSuccess({ message: 'Artist profile created successfully! Redirecting to Dashboard...' });
            console.log('Artist profile creation successful', result.data);

            setTimeout(() => {
                router.push("/Dashboard");
            }, 1500); 

        } catch (err) {
            console.error('Full error object:', err);
            let errorMessage = 'An unexpected error occurred during profile setup.';
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    console.error('Error response:', err.response);
                    errorMessage = err.response.data?.message || 'Artist profile setup failed';
                    const errorStatus = err.response.status;
                    if (errorStatus === 401) {
                       errorMessage = "Authentication failed. Please log in again."; 
                    }
                    errorMessage = `${errorMessage} (Status: ${errorStatus})`;
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

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black text-white flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C2EE03]"></div>
            </div>
        );
    }

    const isFormDisabled = isLoading || status !== 'authenticated';

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
                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Artist Profile Setup</h2>
                        <p className="text-gray-400 text-sm sm:text-base">Complete your artist profile details.</p>
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

                    <form onSubmit={submitForm} className="space-y-4 md:space-y-6">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Enter your artist/band name'
                                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                                    ${errors.name ? 'border-2 border-red-500' : 'border border-transparent'}`}
                                disabled={isFormDisabled}
                            />
                            {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder='Enter a short bio (max 500 characters)'
                                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base h-24 resize-none
                                    ${errors.bio ? 'border-2 border-red-500' : 'border border-transparent'}`}
                                maxLength={500}
                                disabled={isFormDisabled}
                            />
                            {errors.bio && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.bio}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="profileImage"
                                value={formData.profileImage}
                                onChange={handleChange}
                                placeholder='Profile Image URL (optional)' 
                                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                                    ${errors.profileImage ? 'border-2 border-red-500' : 'border border-transparent'}`}
                                disabled={isFormDisabled}
                            />
                            {errors.profileImage && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.profileImage}</p>}
                        </div>
                        
                        <div>
                            <input
                                type="text"
                                name="instagramLink"
                                value={formData.instagramLink}
                                onChange={handleChange}
                                placeholder='Instagram Profile URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base 
                                    ${errors.instagramLink ? 'border-2 border-red-500' : 'border border-transparent'}`}
                                disabled={isFormDisabled}
                            />
                            {errors.instagramLink && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.instagramLink}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="facebookLink"
                                value={formData.facebookLink}
                                onChange={handleChange}
                                placeholder='Facebook Profile URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base 
                                    ${errors.facebookLink ? 'border-2 border-red-500' : 'border border-transparent'}`}
                                disabled={isFormDisabled}
                            />
                            {errors.facebookLink && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.facebookLink}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="twitterLink"
                                value={formData.twitterLink}
                                onChange={handleChange}
                                placeholder='Twitter Profile URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                                    ${errors.twitterLink ? 'border-2 border-red-500' : 'border border-transparent'}`}
                                disabled={isFormDisabled}
                            />
                            {errors.twitterLink && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.twitterLink}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="personalLink"
                                value={formData.personalLink}
                                onChange={handleChange}
                                placeholder='Personal Website URL (optional)'
                                className={`w-full p-3 bg-formBg text-white rounded text-sm sm:text-base
                                    ${errors.personalLink ? 'border-2 border-red-500' : 'border border-transparent'}`}
                                disabled={isFormDisabled}
                            />
                            {errors.personalLink && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.personalLink}</p>}
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] p-3 rounded font-medium text-sm sm:text-base flex items-center justify-center gap-2 
                                  ${isFormDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-greenText text-black hover:bg-opacity-90'}`}
                            disabled={isFormDisabled} 
                        > 
                            {isLoading ? 'Submitting...' : 'Complete Profile'}
                            {!isLoading && <FaArrowRightLong />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ArtistProfileClient; 