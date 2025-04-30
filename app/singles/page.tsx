'use client'
import Image from "next/image";
import Link from "next/link";
import { FaRegTrashAlt, FaPlus, FaBars, FaMusic, FaEdit } from "react-icons/fa";
import SideBar from "../components/SideBar";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from "../components/Dashboard/ConfirmDeleteModal";
import EditSingleModal from "../components/Dashboard/EditSingleModal";

// Interface for the Song data received from the API
interface Song {
  id: string;
  title: string;
  artist_id: string;
  album_id?: string | null;
  release_date?: string | null;
  duration?: number;
  content_type_id?: string | null;
  category_id?: string | null;
  isCover?: boolean;
  featuredArtist?: string | null;
  songwriter?: string | null;
  file: string; // Original audio file URL
  cover_image: string; // Original cover image URL
  formatted_file_url?: string; // Optional formatted URL
  formatted_cover_url: string; // URL to display
  lyrics?: string | null;
  // Add other fields if needed from your API response
}

const SinglesPage = () => {
  const { data: session, status } = useSession();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Edit Modal State ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // --- Delete Modal State ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);

  // Function to fetch songs
  const fetchSongs = useCallback(async () => {
    if (status === 'authenticated' && session?.user?.artistId && session?.accessToken) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/artist/songs/${session.user.artistId}`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } }
        );
        console.log("Songs response:", response.data);
        let dataToSet: Song[] = [];
        if (response.data && Array.isArray(response.data)) {
            dataToSet = response.data;
        } else if (response.data && response.data.success && Array.isArray(response.data.data)) {
            dataToSet = response.data.data;
        } else {
             console.error("Unexpected data structure for songs:", response.data);
             setError("Failed to parse song data."); // Set error state
        }
        setSongs(dataToSet);
      } catch (err: any) {
        console.error("Error fetching songs:", err);
        if (err.response?.status === 404) {
             setError(null); 
             setSongs([]);
        } else {
            const errorMsg = err.response?.data?.message || err.message || "Failed to fetch songs";
            setError(errorMsg);
            toast.error(errorMsg); // Show fetch error as toast
            setSongs([]);
        }
      } finally {
        setIsLoading(false);
      }
    } else if (status === 'loading') {
       setIsLoading(true); 
    } else {
      setIsLoading(false);
      setSongs([]);
      if (status === 'unauthenticated') {
          setError("Please sign in to view your singles."); // Guide unauthenticated users
      }
    }
  }, [session, status]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  // --- Edit Modal Handlers ---
  const openEditModal = (song: Song) => {
    setSelectedSong(song);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedSong(null);
  };
  const handleSongUpdated = () => {
    closeEditModal();
    fetchSongs(); // Re-fetch songs after update
    toast.success("Single updated successfully!"); // Add notification
  };

  // --- Delete Modal Handlers ---
  const openDeleteModal = (song: Song) => {
      setSongToDelete(song);
      setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
      setSongToDelete(null);
  };
  const handleConfirmDelete = async () => {
      if (!songToDelete || !session?.accessToken) {
          toast.error("Cannot proceed with deletion.");
          return Promise.reject("Missing data for deletion"); // Return rejected promise for modal
      }
      setError(null);
      // No need for isDeleting state here, modal handles its own loading state
      try {
          await axios.delete(
              `${process.env.NEXT_PUBLIC_API_URL}/api/song/delete/${songToDelete.id}`,
              { headers: { Authorization: `Bearer ${session.accessToken}` } }
          );
          toast.success(`Deleted "${songToDelete.title}" successfully.`);
          closeDeleteModal(); 
          fetchSongs(); 
          return Promise.resolve(); // Return resolved promise for modal
      } catch (err: any) {
          console.error("Error deleting song:", err);
          const errorMsg = err.response?.data?.message || err.message || "Failed to delete song.";
          toast.error(errorMsg);
          // Throw error so modal can catch it and display
          throw new Error(errorMsg); 
      }
  };

  return (
   <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
    <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

    <div className="flex-1 flex flex-col lg:pl-64">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center px-4 z-40">
         <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white mr-4">
            <FaBars size={24} />
         </button>
         <span className="font-semibold">Singles</span>
      </div>

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8">
        {/* Header - Conditionally show Create Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C2EE03]">Singles</h1>
          {/* Show button only if authenticated and songs exist */}
          {status === 'authenticated' && songs.length > 0 && (
             <Link 
                href="/newRelease"
                className="flex items-center gap-2 bg-greenText text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
              >
                <FaPlus />
                <span>Add New Single</span>
              </Link>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C2EE03]"></div>
            </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
            <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded text-center">
              Error: {error} 
              {/* Optional: Add a retry button? */}
            </div>
        )}

        {/* Empty State - Updated (No change needed here) */}
        {!isLoading && !error && songs.length === 0 && status === 'authenticated' && (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-16 space-y-6">
              <FaMusic size={60} className="text-gray-600" /> 
              <p className="text-lg">No singles found.</p>
              <Link 
                href="/newRelease"
                className="flex items-center gap-2 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] text-black font-semibold px-6 py-3 rounded-lg transition duration-200 transform hover:scale-105"
              >
                <FaPlus />
                <span>Add New Single</span>
              </Link>
            </div>
        )}

        {/* Singles Grid */}
        {!isLoading && !error && songs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {songs.map((song)=>(
                 <div key={song.id} className='bg-[#161717] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col justify-between'>
                    {/* Image */}
                    <div className='relative aspect-square w-full'>
                      <Image 
                        src={song.cover_image || '/placeholder-cover.png'} 
                        alt={`${song.title} cover`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" 
                        priority={songs.indexOf(song) < 4} 
                      />
                    </div>
                    {/* Details */}
                    <div className='p-4 font-poppins flex-grow'>
                      <h3 className='font-semibold text-lg truncate' title={song.title}>{song.title}</h3>
                      {/* Add more song details if desired */}
                      <div className="text-sm text-gray-400 mt-2 space-y-1">
                        {song.duration && <p>Duration: {Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}</p>}
                        {song.release_date && <p>Released: {new Date(song.release_date).toLocaleDateString()}</p>}
                      </div>
                    </div>
                    {/* Actions - Re-added Edit Button */}
                    <div className='flex justify-between items-center p-4 border-t border-gray-700'>
                      <button 
                        title="Delete Single" 
                        className="text-red-600 hover:text-red-400 transition duration-150 disabled:opacity-50"
                        onClick={() => openDeleteModal(song)}
                        disabled={isLoading} // Only disable based on main page loading
                      >
                         <FaRegTrashAlt size={18}/>
                      </button>
                       <button 
                          title="Edit Single"
                          className="text-[#C2EE03] hover:text-[#a8cc03] transition duration-150 disabled:opacity-50"
                          onClick={() => openEditModal(song)} // Open edit modal
                          disabled={isLoading} 
                       >
                          <FaEdit size={18}/>
                       </button>
                    </div>
                  </div>
              ))}
          </div>
        )}

        {/* --- Modals --- */} 
        {isDeleteModalOpen && songToDelete && (
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete} 
                itemName={songToDelete.title}
                itemType="single"
            />
        )}
        
        {/* Edit Modal */} 
        {isEditModalOpen && selectedSong && (
             <EditSingleModal 
               isOpen={isEditModalOpen} 
               onClose={closeDeleteModal} 
               song={selectedSong} 
               onSongUpdated={handleSongUpdated}
             />
        )}
         
      </main>
    </div>
   </div>
  )
}

export default SinglesPage; 