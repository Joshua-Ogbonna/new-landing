'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
// import { FaRegTrashAlt } from "react-icons/fa"; // Removed unused import
import SongService from '@/services/SongService';
import { useSession } from 'next-auth/react'; // Import useSession
import toast from 'react-hot-toast'; // Import toast
// import { error } from 'console'; // Removed unused import

interface ReleaseFormData {
  releaseTitle: string;
  artistName: string;
  featuredArtist: string;
  genre?: string;
  releaseDate: string;
  songwriter: string;
  isCover: string;
  category: string,
  contentType: string
}

interface CompleteReleaseFormData extends ReleaseFormData {
  artwork: File | null;
  musicFile: File | null;
}

interface SecondFormProps {
  formData: ReleaseFormData;
  onSubmit: (data: CompleteReleaseFormData) => void;
  onBack: () => void;
}

const SecondForm: React.FC<SecondFormProps> = ({ formData, onSubmit, onBack }) => {
  const { data: session, status } = useSession(); // Get session data
  const [coverArtFile, setCoverArtFile] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const coverArtInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const [completeFormData, setCompleteFormData] = useState<CompleteReleaseFormData>({
    ...formData,
    artwork: null,
    musicFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update completeFormData when props.formData changes (on navigating back/forth)
  useEffect(() => {
    setCompleteFormData(prev => ({
        ...prev, // Keep existing files if any
        ...formData // Update text fields from props
    }));
  }, [formData]);

  const handleCoverArtUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // Basic validation (example: size limit 10MB)
    if (file.size > 10 * 1024 * 1024) {
        toast.error("Cover art file size exceeds 10MB limit."); // Use toast
        return;
    }

    const url = URL.createObjectURL(file);
    setCoverArtFile(url);
    setCompleteFormData(prevState => ({
      ...prevState,
      artwork: file
    }));
    e.target.value = ''; // Reset file input
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // Basic validation (example: file type)
    const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/flac', 'audio/x-wav'];
    if (!allowedTypes.includes(file.type)) {
        toast.error(`Invalid music file type: ${file.type}. Allowed types: WAV, MP3, FLAC.`); // Use toast
        return;
    }

    setMusicFile(file);
    setCompleteFormData(prevState => ({
      ...prevState,
      musicFile: file
    }));
    e.target.value = ''; // Reset file input
  };

  const triggerCoverArtInput = () => coverArtInputRef.current?.click();
  const triggerMusicInput = () => musicInputRef.current?.click();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // toast.dismiss(); // Optional: Clear previous toasts

    if (status !== 'authenticated' || !session?.accessToken || !session?.user?.artistId) {
        toast.error("Authentication error. Please sign in again.");
        return;
    }

    if (!completeFormData.musicFile) { // Artwork is optional based on service logic
      toast.error("Please upload a music file.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Submitting release...'); // Show loading toast

    try {
      // Pass the combined form data and auth details to the service
      // SongService now handles uploads and duration internally
      const response = await SongService.createSong(
          completeFormData, 
          session.accessToken, 
          session.user.artistId
      );
      console.log("Submission response:", response);

      // Assuming response indicates success (adjust as needed based on actual API response)
      if (response) { 
        toast.success("Release submitted successfully!", { id: toastId }); // Update loading toast on success
        onSubmit(completeFormData); // Notify parent component
        // Optionally reset local state 
        setCoverArtFile(null);
        setMusicFile(null);
        // completeFormData will reset if parent changes step/formData
      } else {
          // If response doesn't confirm success explicitly
          throw new Error("Submission failed. Unexpected response from server.");
      }
    } catch (err: any) {
      console.error("Submission error in Form2:", err);
      toast.error(err.message || "Failed to submit release. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
      // Loading toast is dismissed/updated above
    }
  };

  // Cleanup object URLs on component unmount
  useEffect(() => {
    const currentCoverArtUrl = coverArtFile; // Capture value for cleanup function
    return () => {
      if (currentCoverArtUrl) {
        URL.revokeObjectURL(currentCoverArtUrl);
      }
    };
  }, [coverArtFile]);

  return (
    // Removed outer div with fixed width/margins
    // Form container with background, padding, rounded corners
    <div className='w-full bg-[#161717] rounded-2xl p-6 md:p-8 lg:p-10'>
      {/* Removed inner max-w-md container */} 
      <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased spacing */}

        {/* Cover Art Section */}
        <section className="space-y-4"> 
          <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Add Cover Art</h2>
              <p className='text-sm text-gray-400'>Upload your artwork or design. Make sure it meets our guidelines.</p>
          </div>
          
          <ul className='list-disc ml-5 space-y-1 text-xs text-gray-400'>
            <li>JPG, PNG or GIF image file smaller than 10MB.</li>
            <li>File must be in RGB mode.</li>
            <li>At least 1600 x 1600 pixels.</li>
            <li>No blurriness, pixelation, or excess white space.</li>
            <li>No social media links, contact info, store names, pricing, dates, etc.</li>
          </ul>

          <input
            type="file"
            ref={coverArtInputRef}
            onChange={handleCoverArtUpload}
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            disabled={isSubmitting}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4"> 
            <button
              type="button"
              className='button-style w-full sm:w-auto px-6 py-2.5' // Reusable button style
              onClick={triggerCoverArtInput}
              disabled={isSubmitting}
            >
              {coverArtFile ? "Change Cover Art" : "Upload Cover Art"}
            </button>
            {coverArtFile && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>✓ Uploaded</span> 
                    {/* Optionally show file name if needed, but preview is better */}
                </div>
            )}
          </div>
          {/* Cover Art Preview */}
           {coverArtFile && (
                <div className="mt-4 w-32 h-32 sm:w-40 sm:h-40 border border-gray-700 rounded-lg overflow-hidden">
                  <Image
                    width={160}
                    height={160}
                    alt="Cover art preview"
                    src={coverArtFile}
                    className="object-cover w-full h-full"
                  />
                </div>
            )}
        </section>

        {/* Music Upload Section */}
        <section className="space-y-4">
           <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Upload Music</h2>
              <p className='text-sm text-gray-400'>Stereo WAV (24-bit/192kHz or 16-bit/44.1kHz), MP3, or FLAC.</p>
           </div>

          <input
            type="file"
            ref={musicInputRef}
            onChange={handleMusicUpload}
            accept=".wav,.mp3,.flac,audio/wav,audio/mpeg,audio/flac,audio/x-wav"
            className="hidden"
            disabled={isSubmitting}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              className='button-style w-full sm:w-auto px-6 py-2.5'
              onClick={triggerMusicInput}
              disabled={isSubmitting}
            >
              {musicFile ? "Change Music File" : "Upload Music File"}
            </button>
            {musicFile && (
                <div className="flex items-center gap-2 text-sm text-gray-300 truncate">
                    <span className="flex-shrink-0">✓</span> 
                    <span className="truncate" title={musicFile.name}>{musicFile.name}</span>
                </div>
            )}
          </div>
        </section>

        {/* Release Details Preview (Simplified) */}
        <section className="mt-6 w-full border-t border-gray-700 pt-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-200 mb-3">Summary</h2>
           {/* Display key details for confirmation */} 
          <p><strong className="text-gray-400">Title:</strong> <span className="text-gray-100">{completeFormData.releaseTitle}</span></p>
          <p><strong className="text-gray-400">Artist:</strong> <span className="text-gray-100">{completeFormData.artistName}</span></p>
          {completeFormData.featuredArtist && <p><strong className="text-gray-400">Featured:</strong> <span className="text-gray-100">{completeFormData.featuredArtist}</span></p>}
           {/* Removed the delete button and the image preview from here, 
               image preview is now shown directly under the upload button */}
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700"> 
          <button
            type="button"
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 w-full sm:w-auto"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] text-black font-semibold rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            disabled={!musicFile || isSubmitting || status !== 'authenticated'}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Release'}
          </button>
        </div>
      </form>
      
      {/* Shared button style */}
      <style jsx>{`
        .button-style {
            background-color: #C2EE03; /* lime-400 approx */
            color: #1f2937; /* gray-800 approx */
            font-weight: 600; /* font-semibold */
            border-radius: 0.5rem; /* rounded-lg */
            transition: background-color 0.2s ease-in-out;
            text-align: center;
        }
        .button-style:hover {
            background-color: #a3e635; /* lime-500 approx */
        }
         .button-style:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default SecondForm;