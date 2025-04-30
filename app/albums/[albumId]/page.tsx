'use client'; // Needed for hooks

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook to get dynamic route parameters
import Link from 'next/link'; // Import Link
import SideBar from '@/app/components/SideBar'; // Adjust path as needed
import Image from 'next/image';
import { FaBars, FaMusic, FaEdit, FaRegTrashAlt, FaPlus, FaPlay } from 'react-icons/fa';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
// TODO: Import ConfirmDeleteModal, EditAlbumModal, AddSongToAlbumModal (if created)

// Interfaces (Define or import)
interface Album {
  id: string; name: string; artist_id: string; description?: string;
  image: string; formatted_picture_url: string;
  // Add other fields like price, created_at etc. if needed
}
interface Song {
  id: string; title: string; duration?: number; // Add other needed fields
}

const SingleAlbumPage = () => {
  const params = useParams();
  const albumId = params.albumId as string; // Get albumId from route
  const { data: session, status } = useSession();

  const [album, setAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // TODO: Add state for modals (Edit, Delete, Add Song)

  // --- Data Fetching ---
  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!albumId || status !== 'authenticated' || !session?.accessToken) {
        if (status === 'authenticated') setError("Album ID not found or invalid.");
        else if (status !== 'loading') setError("Authentication required.");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      try {
        // Fetch Album Details
        // TODO: Replace with actual API endpoint for single album
        const albumPromise = axios.get(`/api/placeholder/album/${albumId}`, { 
            headers: { Authorization: `Bearer ${session.accessToken}` }
        });
        // Fetch Songs for Album
        // TODO: Replace with actual API endpoint for album songs
        const songsPromise = axios.get(`/api/placeholder/album/${albumId}/songs`, {
             headers: { Authorization: `Bearer ${session.accessToken}` }
        });

        const [albumRes, songsRes] = await Promise.all([albumPromise, songsPromise]);

        // TODO: Adjust data access based on actual API responses
        setAlbum(albumRes.data?.data || albumRes.data || null);
        setSongs(songsRes.data?.data || songsRes.data || []);
        
        if (!albumRes.data) throw new Error("Album not found");

      } catch (err: any) {
        console.error("Error fetching album data:", err);
        const errorMsg = err.response?.data?.message || err.message || "Failed to load album data";
        setError(errorMsg);
        toast.error(errorMsg);
        setAlbum(null);
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (status !== 'loading') {
        fetchAlbumData();
    }

  }, [albumId, status, session]);

  // --- Placeholder Handlers for Modals ---
  const handleOpenEditModal = () => toast("Edit modal not implemented yet.");
  const handleOpenDeleteModal = () => toast("Delete modal not implemented yet.");
  const handleOpenAddSongModal = () => toast("Add song modal/link not implemented yet.");

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
             {/* Basic Breadcrumb */} 
             <div className="flex items-center">
                 <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white mr-3"><FaBars size={24} /></button>
                 <div className="text-sm text-gray-400">
                     <Link href="/Dashboard" className="hover:text-white">Dashboard</Link>
                     <span className="mx-1">/</span>
                     <Link href="/albums" className="hover:text-white">Albums</Link>
                     <span className="mx-1">/</span>
                     <span className="text-white font-medium truncate max-w-[150px]">{album?.name || 'Album'}</span>
                 </div>
             </div>
          </div>

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8">
              {error && !album && (
                  <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded text-center">
                     Error: {error}
                  </div>
              )}

              {album && (
                  <div className="space-y-8">
                      {/* Album Header */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                          <Image 
                            src={album.formatted_picture_url || album.image || '/placeholder-cover.png'} 
                            alt={`${album.name} cover`} 
                            width={200} 
                            height={200} 
                            className="rounded-lg object-cover aspect-square w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex-shrink-0 shadow-lg"
                            priority
                          />
                          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 break-words">{album.name}</h1>
                              {/* TODO: Link to artist page? */} 
                              <p className="text-lg text-gray-400 mb-4">By {album.artist_id} {/* Replace with artist name if available */}</p>
                              {album.description && <p className="text-gray-300 text-sm mb-4 max-w-xl">{album.description}</p>}
                              {/* Action Buttons */} 
                              <div className="flex items-center gap-3">
                                  <button onClick={handleOpenAddSongModal} className="px-4 py-2 text-sm bg-lime-400 text-black font-semibold rounded-md hover:bg-lime-500 transition"> 
                                      <FaPlus className="inline mr-1" /> Add Song
                                  </button>
                                   <button onClick={handleOpenEditModal} className="p-2 text-gray-400 hover:text-white transition"><FaEdit size={18}/></button>
                                   <button onClick={handleOpenDeleteModal} className="p-2 text-red-600 hover:text-red-400 transition"><FaRegTrashAlt size={18}/></button>
                              </div>
                          </div>
                      </div>

                      {/* Tracklist Section */}
                      <section className="bg-[#161717] rounded-lg p-4 sm:p-6">
                           <h2 className="text-xl font-semibold text-white mb-4">Tracks</h2>
                           {songs.length > 0 ? (
                               <ul className="divide-y divide-[#2a2a2a]">
                                   {songs.map((song, index) => (
                                       <li key={song.id} className="flex items-center justify-between py-3 hover:bg-[#2a2a2a]/30 px-2 rounded-md">
                                           <div className="flex items-center gap-3">
                                                <span className="text-gray-400 w-6 text-right">{index + 1}.</span>
                                                {/* TODO: Link to single song page */} 
                                                <Link href={`/singles/${song.id}`} className="text-white hover:text-lime-400 truncate max-w-[200px] sm:max-w-xs md:max-w-md">{song.title}</Link>
                                           </div>
                                           <div className="flex items-center gap-4">
                                               {song.duration && <span className="text-sm text-gray-400">{Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}</span>}
                                                {/* TODO: Add play button functionality */} 
                                               <button className="text-gray-400 hover:text-lime-400"><FaPlay /></button>
                                           </div>
                                       </li>
                                   ))}
                               </ul>
                           ) : (
                               <p className="text-gray-500 text-center py-4">No songs found for this album yet.</p>
                           )}
                      </section>
                  </div>
              )}

              {/* TODO: Add Modals (Edit, Delete, AddSong) here */} 
          </main>
      </div>
    </div>
  );
};

export default SingleAlbumPage; 