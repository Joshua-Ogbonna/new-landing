'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
interface FormData {
    releaseTitle: string;
    artistName: string;
    featuredArtist: string;
    genre: string;
    releaseDate: string;
    songwriter: string;
    isCover: string;
}

interface CompleteFormData extends FormData {
    artwork: File | null;
    musicFile: File | null;
}

interface SecondFormProps {
    formData: FormData;
    onSubmit: (data: CompleteFormData) => void;
    onBack: () => void;
}

const SecondForm: React.FC<SecondFormProps> = ({ formData, onSubmit, onBack }) => {
    const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
    const [musicFile, setMusicFile] = useState<File | null>(null);
    const [coverArtPreview, setCoverArtPreview] = useState<string>('');
    const coverArtInputRef = useRef<HTMLInputElement>(null);
    const musicInputRef = useRef<HTMLInputElement>(null);

    // Create a preview URL when cover art file changes
    useEffect(() => {
        if (coverArtFile) {
            const objectUrl = URL.createObjectURL(coverArtFile);
            setCoverArtPreview(objectUrl);

            // Clean up the URL when component unmounts or when file changes
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [coverArtFile]);

    const handleCoverArtUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverArtFile(e.target.files[0]);
        }
    };

    const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMusicFile(e.target.files[0]);
        }
    };

    const triggerCoverArtInput = () => {
        if (coverArtInputRef.current) {
            coverArtInputRef.current.click();
        }
    };

    const triggerMusicInput = () => {
        if (musicInputRef.current) {
            musicInputRef.current.click();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Combine data from first form with the file uploads from this form
        const completeData: CompleteFormData = {
            ...formData,
            artwork: coverArtFile,
            musicFile: musicFile
        };

        // Submit the combined data
        onSubmit(completeData);
    };

    return (
        <div className='md:w-[900px] md:mx-32 my-10'>
            <div className='w-full bg-[#161717] rounded-3xl p-6 lg:p-12'>
                <div className="w-full max-w-md">
                    <h2 className="text-2xl  text-center mb-8">Add Cover Art</h2>
                    <p className='italic text-sm'>Upload your artwork or design. Make sure your artwork meets our guidelines to avoid delays during distribution.</p>

                    <form onSubmit={handleSubmit}>
                        <ul className='list-disc ml-5 my-4'>
                            <li>JPG, PNG or GIF image file smaller than 10MB.</li>
                            <li>File must be in RGB mode, even if your image is black and white.</li>
                            <li>At least 1600 x 1600 pixels in size.</li>
                            <li>No blurriness, pixelation, or white space.</li>
                            <li>No social media links, contact information, store names or logos, pricing information, release dates, "New" stickers, etc.</li>
                        </ul>

                        <input
                            type="file"
                            ref={coverArtInputRef}
                            onChange={handleCoverArtUpload}
                            accept="image/jpeg,image/png,image/gif"
                            className="hidden"
                            required
                        />

                        <div>
                            <button
                                type="button"
                                className='bg-[#C2EE03] w-[150px] my-8 rounded-3xl py-3 px-5 font-bold text-center text-black'
                                onClick={triggerCoverArtInput}
                            >
                                Upload Cover
                                {coverArtFile && "✓"}
                            </button>
                            {coverArtFile && <span className="ml-2 text-lime-400">{coverArtFile.name}</span>}
                        </div>

                        <section>
                            <h2 className='my-3'>Upload music</h2>
                            <input
                                type="file"
                                ref={musicInputRef}
                                onChange={handleMusicUpload}
                                accept=".wav,.mp3,.flac"
                                className="hidden"
                                required
                            />
                            <button
                                type="button"
                                className='bg-[#C2EE03] w-[150px] my-5 rounded-3xl py-3 px-5 font-bold text-center text-black'
                                onClick={triggerMusicInput}
                            >
                                Upload Music
                                {musicFile && "✓"}
                            </button>
                            {musicFile && <span className="ml-2 text-lime-400">{musicFile.name}</span>}
                        </section>

                        <section className="mt-6  w-[50rem]">
                            <h2>Release Details</h2>
                            <div className="flex items-center gap-8 border w-full">
                                {coverArtPreview && (
                                    <div className="">
                                        <Image
                                            width={600}
                                            height={600}
                                            alt={`${formData.releaseTitle} cover art`}
                                            src={coverArtPreview}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                )}
                                <div className="md:w-[50rem] text-xl">
                                    <p className='text-[#C2EE03]'><strong>Title:</strong> {formData.releaseTitle}</p>
                                    <p className='text-[#C2EE03] '><strong>Artist:</strong> {formData.artistName}</p>
                                    <p><strong>Genre:</strong> {formData.genre}</p>
                                    {formData.featuredArtist && <p><strong>Featured:</strong> {formData.featuredArtist}</p>}
                                    <div className='flex items-center gap-3 mt-4'>
                                    <FaRegTrashAlt size={20} className='text-red-700' />
                                    <p className='text-[#C2EE03] text-[18px]'>Delete Song</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                className="w-40 py-3 bg-gray-600 text-white font-bold rounded-3xl hover:bg-gray-700 transition-colors duration-200"
                                onClick={onBack}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-40 py-3 bg-lime-400 text-gray-900 font-bold rounded-3xl hover:bg-lime-500 transition-colors duration-200"
                                disabled={!coverArtFile || !musicFile}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SecondForm;