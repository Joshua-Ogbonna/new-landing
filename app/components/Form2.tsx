/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
import SongService from '@/services/SongService';
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
  const [coverArtFile, setCoverArtFile] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const coverArtInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const [completeFormData, setCompleteFormData] = useState<CompleteFormData>({
    ...formData,
    artwork: null,
    musicFile: null
  });

  const handleCoverArtUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const url = URL.createObjectURL(file)
    setCoverArtFile(url);
    setCompleteFormData(prevState => ({
      ...prevState,
      artwork: file
    }));
    // console.log(url);

  };



  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setMusicFile(file);
    setCompleteFormData(prevState => ({
      ...prevState,
      musicFile: file
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!completeFormData.artwork || !completeFormData.musicFile) {
      alert("Please upload both cover art and music file.");
      return;
    }
    
    const payload = {
      releaseTitle: completeFormData.releaseTitle,
      artistName: completeFormData.artistName,
      featuredArtist: completeFormData.featuredArtist,
      genre: completeFormData.genre,
      releaseDate: completeFormData.releaseDate,
      songwriter: completeFormData.songwriter,
      isCover: completeFormData.isCover,
      artwork: completeFormData.artwork,
      musicFile: completeFormData.musicFile,
    }
  
    try {
      const response = await SongService.createSong(payload);
      if (response) {
        // Reset form or redirect as needed
        setCompleteFormData({
          releaseTitle: '',
          artistName: '',
          featuredArtist: '',
          genre: '',
          releaseDate: '',
          songwriter: '',
          isCover: '',
          artwork: null,
          musicFile: null,
        });
        
        // You might want to add a success message or redirect here
        alert("Song submitted successfully!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit song. Please check console for details.");
    }
  };

  return (
    <div className='w-full px-4 sm:px-6 md:w-[900px] md:mx-auto lg:mx-32 my-10'>
      <div className='w-full bg-[#161717] rounded-3xl p-4 sm:p-6 '>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-8">Add Cover Art</h2>
          <p className='italic text-xs sm:text-sm'>Upload your artwork or design. Make sure your artwork meets our guidelines to avoid delays during distribution.</p>

          <form onSubmit={handleSubmit}>
            <ul className='list-disc ml-4 sm:ml-5 my-3 sm:my-4 text-sm'>
              <li>JPG, PNG or GIF image file smaller than 10MB.</li>
              <li>File must be in RGB mode, even if your image is black and white.</li>
              <li>At least 1600 x 1600 pixels in size.</li>
              <li>No blurriness, pixelation, or white space.</li>
              <li>No social media links, contact information, store names or logos, pricing information, release dates, &quot;New&quot; stickers, etc.</li>
            </ul>

            <input
              type="file"
              ref={coverArtInputRef}
              onChange={handleCoverArtUpload}
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
             
            />

            <div className="flex flex-wrap items-center">
              <button
                type="button"
                className='bg-[#C2EE03] w-[150px] sm:w-[170px] my-4 sm:my-8 rounded-3xl py-2 sm:py-3 px-4 sm:px-5 font-bold text-center text-black'
                onClick={triggerCoverArtInput}
              >
                Upload Cover
                {coverArtFile && "✓"}
              </button>
              {coverArtFile && <span className="ml-2 text-lime-400 text-sm sm:text-base overflow-hidden text-ellipsis">{}</span>}
            </div>

            <section>
              <h2 className='my-3 text-lg sm:text-xl'>Upload music</h2>
              <input
                type="file"
                ref={musicInputRef}
                onChange={handleMusicUpload}
                accept=".wav,.mp3,.flac"
                className="hidden"
           
              />
              <div className="flex flex-wrap items-center">
                <button
                  type="button"
                  className='bg-[#C2EE03] w-[150px] sm:w-[170px] my-3 sm:my-5 rounded-3xl py-2 sm:py-3 px-4 sm:px-5 font-bold text-center text-black'
                  onClick={triggerMusicInput}
                >
                  Upload Music
                  {musicFile && "✓"}
                </button>
                {musicFile && <span className="ml-2 text-lime-400 text-sm sm:text-base overflow-hidden text-ellipsis">{musicFile.name}</span>}
              </div>
            </section>

            <section className="mt-6 w-full">
              <h2 className="text-lg sm:text-xl mb-3">Release Details</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8  p-3 rounded-lg w-full">
                {coverArtFile && (
                  <div className="w-full sm:w-auto">
                    <Image
                      width={300}
                      height={300}
                      alt={`${formData.releaseTitle} cover art`}
                      src={coverArtFile}
                      className="rounded-lg object-cover w-full sm:w-[200px] md:w-[250px] lg:w-[300px]"
                    />
                  </div>
                )}
                <div className="w-full text-base sm:text-lg">
                  <p className='text-[#C2EE03]'><strong>Title:</strong> {formData.releaseTitle}</p>
                  <p className='text-[#C2EE03]'><strong>Artist:</strong> {formData.artistName}</p>
                  <p><strong>Genre:</strong> {formData.genre}</p>
                  {formData.featuredArtist && <p><strong>Featured:</strong> {formData.featuredArtist}</p>}
                  <div className='flex items-center gap-3 mt-4'>
                    <FaRegTrashAlt size={18} className='text-red-700' />
                    <p className='text-[#C2EE03] text-sm sm:text-base'>Delete Song</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6 sm:mt-8">
              <button
                type="button"
                className="w-full sm:w-40 py-2 sm:py-3 bg-gray-600 text-white font-bold rounded-3xl hover:bg-gray-700 transition-colors duration-200"
                onClick={onBack}
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full sm:w-40 py-2 sm:py-3 bg-lime-400 text-gray-900 font-bold rounded-3xl hover:bg-lime-500 transition-colors duration-200"
                // disabled={!coverArtFile || !musicFile}
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