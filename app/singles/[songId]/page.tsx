/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // Needed for hooks

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SideBar from '@/app/components/SideBar';
import Image from 'next/image';
import { FaBars, FaMusic, FaEdit, FaRegTrashAlt, FaPlay, FaHeadphones, FaCalendarAlt } from 'react-icons/fa'; // Added icons
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
// TODO: Import EditSingleModal, ConfirmDeleteModal

// Interface (Define or import)
interface Song {
  id: string; title: string; artist_id: string; album_id?: string | null; release_date?: string | null;
  duration?: number; content_type_id?: string | null; category_id?: string | null; isCover?: boolean;
  featuredArtist?: string | null; songwriter?: string | null; file: string; cover_image: string;
  formatted_file_url?: string; formatted_cover_url: string; lyrics?: string | null;
  // Add other fields like album name, artist name if needed from API response
  albumName?: string;
  artistName?: string;
}

const SingleSongPage = () => {
  const params = useParams();
  const songId = params.songId as string; 
  const { data: session, status } = useSession();

  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // TODO: Add state for Edit/Delete modals

  // --- Data Fetching ---
  useEffect(() => {
    const fetchSongData = async () => {
      if (!songId || status !== 'authenticated' || !session?.accessToken) {
        if (status === 'authenticated') setError("Song ID not found or invalid.");
        else if (status !== 'loading') setError("Authentication required.");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API endpoint for single song
        const response = await axios.get(`/api/placeholder/song/${songId}`, { 
            headers: { Authorization: `Bearer ${session.accessToken}` }
        });

        // TODO: Adjust data access based on actual API response
        setSong(response.data?.data || response.data || null);
        if (!response.data) throw new Error("Song not found");

      } catch (err: any) {
        console.error("Error fetching song data:", err);
        const errorMsg = err.response?.data?.message || err.message || "Failed to load song data";
        setError(errorMsg);
        toast.error(errorMsg);
        setSong(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (status !== 'loading') {
        fetchSongData();
    }

  }, [songId, status, session]);

  // --- Placeholder Handlers ---
  const handlePlay = () => toast("Play functionality not implemented yet.");
  const handleOpenEditModal = () => toast("Edit modal not implemented yet.");
  const handleOpenDeleteModal = () => toast("Delete modal not implemented yet.");

  // --- Helper Function --- 
  const formatDuration = (seconds: number | undefined) => {
      if (seconds === undefined || seconds === null) return '--:--';
      const mins = Math.floor(seconds / 60);
      const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
      return `${mins}:${secs}`;
  };

   const formatDate = (dateString: string | undefined | null) => {
      if (!dateString) return 'N/A';
      try {
          return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      } catch { return 'Invalid Date'; }
   };

  // --- Render Logic ---
   if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-400"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white font-poppins">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:pl-64">
          {/* Mobile Top Bar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-4 z-40">
             <div className="flex items-center">
                 <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white mr-3"><FaBars size={24} /></button>
                 <div className="text-sm text-gray-400">
                     <Link href="/Dashboard" className="hover:text-white">Dashboard</Link>
                     <span className="mx-1">/</span>
                     <Link href="/singles" className="hover:text-white">Singles</Link>
                     <span className="mx-1">/</span>
                     <span className="text-white font-medium truncate max-w-[150px]">{song?.title || 'Song'}</span>
                 </div>
             </div>
          </div>

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8">
              {error && !song && (
                  <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded text-center">
                     Error: {error}
                  </div>
              )}

              {song && (
                  <div className="space-y-8 max-w-4xl mx-auto">
                      {/* Song Header */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                           <Image 
                            src={song.formatted_cover_url || song.cover_image || '/placeholder-cover.png'} 
                            alt={`${song.title} cover`} 
                            width={200} 
                            height={200} 
                            className="rounded-lg object-cover aspect-square w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex-shrink-0 shadow-lg"
                            priority
                          />
                          <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow">
                              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 break-words">{song.title}</h1>
                              <p className="text-lg text-gray-400 mb-1">
                                  By <span className="text-white font-medium">{song.artistName || song.artist_id}</span> 
                                  {song.featuredArtist && <span className="text-gray-500"> ft. {song.featuredArtist}</span>}
                              </p>
                              {song.albumName && song.album_id && (
                                   <p className="text-sm text-gray-400 mb-4">
                                     From album: <Link href={`/albums/${song.album_id}`} className="text-lime-400 hover:underline">{song.albumName}</Link>
                                   </p>
                              )}
                              {/* Basic Stats & Play Button */}
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                 <span className="flex items-center gap-1"><FaHeadphones/> {formatDuration(song.duration)}</span>
                                 <span className="flex items-center gap-1"><FaCalendarAlt/> {formatDate(song.release_date)}</span>
                              </div>
                              {/* Action Buttons */} 
                              <div className="flex items-center gap-3">
                                  <button onClick={handlePlay} className="px-6 py-2 text-sm bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-500 transition flex items-center gap-2">
                                      <FaPlay /> Play
                                  </button>
                                   <button onClick={handleOpenEditModal} className="p-2 text-gray-400 hover:text-white transition"><FaEdit size={18}/></button>
                                   <button onClick={handleOpenDeleteModal} className="p-2 text-red-600 hover:text-red-400 transition"><FaRegTrashAlt size={18}/></button>
                              </div>
                          </div>
                      </div>
                      
                      {/* Additional Details Section (Optional) */}
                       {(song.songwriter || song.lyrics) && (
                           <section className="bg-[#161717] rounded-lg p-4 sm:p-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {song.songwriter && (
                                       <div>
                                           <h3 className="text-lg font-semibold text-gray-300 mb-2">Songwriter</h3>
                                           <p className="text-white">{song.songwriter}</p>
                                       </div>
                                   )}
                                    {song.isCover !== undefined && (
                                       <div>
                                           <h3 className="text-lg font-semibold text-gray-300 mb-2">Cover Song</h3>
                                           <p className="text-white">{song.isCover ? 'Yes' : 'No'}</p>
                                       </div>
                                   )}
                               </div>
                                {song.lyrics && (
                                   <div className="mt-6 border-t border-gray-700 pt-4">
                                       <h3 className="text-lg font-semibold text-gray-300 mb-2">Lyrics</h3>
                                       <p className="text-white whitespace-pre-wrap text-sm leading-relaxed">{song.lyrics}</p>
                                   </div>
                               )}
                           </section>
                       )}
                  </div>
              )}
              
               {/* TODO: Add Modals (Edit, Delete) here */} 
          </main>
      </div>
    </div>
  );
};

export default SingleSongPage; 