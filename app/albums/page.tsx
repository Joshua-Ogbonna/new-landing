"use client"
import Image from "next/image";
import Link from "next/link";
import { FaRegTrashAlt, FaEdit, FaPlus, FaBars, FaTimes, FaMusic, FaShoppingCart, FaPlay, FaCompactDisc } from "react-icons/fa";
import SideBar from "../components/SideBar";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import CreateAlbumModal from "../components/Dashboard/CreateAlbumModal";
import EditAlbumModal from "../components/Dashboard/EditAlbumModal";
import ConfirmDeleteModal from "../components/Dashboard/ConfirmDeleteModal";
import toast from 'react-hot-toast';

// Interface for the album data received from the API
interface Album {
  id: string;
  name: string;
  artist_id: string;
  description?: string;
  image: string; // Original Cloudinary URL
  price_ngn?: number;
  price_usd?: number;
  created_at: string;
  updated_at: string;
  formatted_picture_url: string; // URL to display
  song_count: number;
  play_count: number;
  purchase_count: number;
}

const AlbumsPage = () => {
  const { data: session, status } = useSession();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for controlling the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);

  // Function to fetch albums (using useCallback for potential optimization)
  const fetchAlbums = useCallback(async () => {
    if (status === 'authenticated' && session?.accessToken) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/album/artist`,
          {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }
        );
        console.log("Albums response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setAlbums(response.data.data);
        } else {
          console.error("Unexpected data structure for albums:", response.data);
          setError("Failed to parse albums data.");
          setAlbums([]);
        }
      } catch (err: any) {
        console.error("Error fetching albums:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch albums");
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    } else if (status === 'loading') {
      setIsLoading(true); // Keep loading if session is loading
    } else {
      // Not authenticated or session finished loading but no token
      setIsLoading(false);
      setAlbums([]);
    }
  }, [session, status]);

  // Initial fetch on mount
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]); // Depend on the memoized fetchAlbums function

  const openEditModal = (album: Album) => {
    console.log("Opening edit modal for:", album);
    setSelectedAlbum(album);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAlbum(null);
  };

  const handleAlbumUpdated = () => {
    closeEditModal();
    fetchAlbums();
    toast.success("Album updated!");
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleAlbumCreated = () => {
    closeCreateModal();
    fetchAlbums();
    toast.success("Album created!");
  };

  const openDeleteModal = (album: Album) => {
    console.log("Opening delete confirmation for:", album);
    setAlbumToDelete(album);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAlbumToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!albumToDelete || !session?.accessToken) {
      toast.error("Cannot proceed with deletion.");
      return Promise.reject("Missing data for deletion");
    }
    setError(null);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/album/delete/${albumToDelete.id}`,
        { headers: { Authorization: `Bearer ${session.accessToken}` } }
      );
      toast.success(`Deleted "${albumToDelete.name}" successfully.`);
      closeDeleteModal();
      fetchAlbums();
      return Promise.resolve();
    } catch (err: any) {
      console.error("Error deleting album:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to delete album.";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar - Takes full width on mobile via translate, fixed width on lg+ */}
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area - Add left padding on lg+ to account for sidebar */}
      <div className="flex-1 flex flex-col lg:pl-64">

        {/* Mobile Top Bar - Only visible below lg breakpoint */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center px-4 z-40">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white mr-4">
            <FaBars size={24} />
          </button>
          {/* You can add a logo or page title here if desired */}
          <span className="font-semibold">Albums</span>
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8">
          {/* Header and Create Button */}
          <div className="flex justify-between items-center mb-6">
            {/* H1 is now correctly positioned due to parent padding */}
            <h1 className="hidden md:block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C2EE03]">Albums</h1>
            {/* Show Create button only if authenticated */}
            {status === 'authenticated' && (
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 text-black bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] transform hover:scale-105 font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus />
                <span>Create Album</span>
              </button>
            )}
          </div>

          {isLoading && status === 'authenticated' && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C2EE03]"></div>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded text-center">
              Error: {error}
            </div>
          )}

          {!isLoading && !error && albums.length === 0 && status === 'authenticated' && (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-16 space-y-6">
              <FaCompactDisc size={60} className="text-gray-600" /> 
              <p className="text-lg">No albums found.</p>
              <button 
                onClick={openCreateModal}
                className="flex items-center gap-2 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] text-black font-semibold px-6 py-3 rounded-lg transition duration-200 transform hover:scale-105"
              >
                <FaPlus />
                <span>Create New Album</span>
              </button>
            </div>
          )}

          {!isLoading && !error && albums.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {albums.map((album) => (
                <div key={album.id} className='bg-[#161717] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col justify-between'>
                  <div className='relative aspect-square w-full'>
                    <Image
                      src={album.image || '/placeholder-cover.png'}
                      alt={`${album.name} cover`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={albums.indexOf(album) < 4}
                    />
                  </div>
                  <div className='p-4 font-poppins flex-grow'>
                    <h3 className='font-semibold text-lg truncate' title={album.name}>{album.name}</h3>
                    {/* Horizontal stats display with icons */}
                    <div className="text-sm text-gray-400 mt-2 flex items-center space-x-3">
                      {/* Assuming FaMusic, FaPlay, FaShoppingCart are imported */}
                      <span className="flex items-center gap-1" title="Songs">
                        <FaMusic /> 
                        <span>{album.song_count ?? 0}</span>
                      </span>
                      <span className="flex items-center gap-1" title="Plays">
                        <FaPlay /> 
                        <span>{album.play_count ?? 0}</span>
                      </span>
                      <span className="flex items-center gap-1" title="Purchases">
                        <FaShoppingCart /> 
                        <span>{album.purchase_count ?? 0}</span>
                      </span>
                    </div>
                    {/* Note: The original vertical stats block below this insertion point should likely be removed. */}
                      {/* <div className="text-sm text-gray-400 mt-2 space-y-1">
                        <p>Songs: {album.song_count ?? 0}</p>
                        <p>Plays: {album.play_count ?? 0}</p>
                        <p>Purchases: {album.purchase_count ?? 0}</p>
                      </div> */}
                  </div>
                  <div className='flex justify-between items-center p-4 border-t border-gray-700'>
                    <button
                      title="Delete Album"
                      className="text-red-600 hover:text-red-400 transition duration-150 disabled:opacity-50"
                      onClick={() => openDeleteModal(album)}
                      disabled={isLoading}
                    >
                      <FaRegTrashAlt size={18} />
                    </button>
                    <button
                      title="Edit Album"
                      className="text-[#C2EE03] hover:text-[#a8cc03] transition duration-150 disabled:opacity-50"
                      onClick={() => openEditModal(album)}
                      disabled={isLoading}
                    >
                      <FaEdit size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create Modal */}
          <CreateAlbumModal
            isOpen={isCreateModalOpen}
            onClose={closeCreateModal}
            onAlbumCreated={handleAlbumCreated}
          />

          {/* Edit Modal - Render conditionally */}
          {selectedAlbum && (
            <EditAlbumModal
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              album={selectedAlbum}
              onAlbumUpdated={handleAlbumUpdated}
            />
          )}

          {/* Delete Confirmation Modal */}
          {albumToDelete && (
            <ConfirmDeleteModal
              itemType="album"
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={handleConfirmDelete}
              itemName={albumToDelete.name}
            />
          )}

        </main>
      </div>
    </div>
  )
}

export default AlbumsPage;