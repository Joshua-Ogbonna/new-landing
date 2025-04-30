'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaTimes, FaUpload, FaSpinner } from 'react-icons/fa';
import CloudinaryService from '@/services/cloudinary.services';

// Assuming Album interface is defined elsewhere or import it
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

interface EditAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: Album | null; // Album data to edit
  onAlbumUpdated: () => void; // Callback to refetch albums
}

interface FormData {
  name: string;
  description: string;
  price_ngn: string;
  price_usd: string;
}

const EditAlbumModal: React.FC<EditAlbumModalProps> = ({ isOpen, onClose, album, onAlbumUpdated }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({ name: '', description: '', price_ngn: '', price_usd: '' });
  const [imageFile, setImageFile] = useState<File | null>(null); // For storing the *new* selected file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For previewing new or existing image
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form when album data is available or changes
  useEffect(() => {
    if (album) {
      setFormData({
        name: album.name || '',
        description: album.description || '',
        price_ngn: album.price_ngn?.toString() || '',
        price_usd: album.price_usd?.toString() || '',
      });
      setImagePreview(album.formatted_picture_url || null); // Show current image initially
      setImageFile(null); // Reset any previously selected new file
      setError(null); // Clear previous errors
    } else {
      // Reset form if album is null (e.g., modal closed and reopened without data)
      handleCloseReset(); 
    }
  }, [album]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the new file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Show preview of the new file
      };
      reader.readAsDataURL(file);
      setError(null); 
    } 
    // Don't reset preview if no file selected, user might just cancel
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!album) {
        setError('No album data provided for editing.');
        return;
    }
    if (!formData.name) {
      setError('Album name is required.');
      return;
    }
    if (!session?.accessToken) {
      setError('Authentication error.');
      return;
    }

    setIsLoading(true);
    let newImageUrl: string | undefined = undefined;

    try {
      // 1. Upload *new* image if selected
      if (imageFile) {
        console.log("Uploading new album cover...");
        newImageUrl = await CloudinaryService.uploadFile(imageFile, 'image');
        console.log("New image uploaded:", newImageUrl);
      }

      // 2. Prepare payload with *only changed* fields
      const payload: Partial<Omit<Album, 'id' | 'created_at' | 'updated_at' | 'formatted_picture_url' | 'song_count' | 'play_count' | 'purchase_count'>> = {};
      
      if (formData.name !== album.name) payload.name = formData.name;
      if (formData.description !== (album.description || '')) payload.description = formData.description;
      if (newImageUrl) payload.image = newImageUrl; // Only include image if a new one was uploaded
      
      const currentPriceNgn = album.price_ngn?.toString() || '';
      if (formData.price_ngn !== currentPriceNgn) {
          payload.price_ngn = formData.price_ngn ? parseFloat(formData.price_ngn) : undefined; 
      }
      const currentPriceUsd = album.price_usd?.toString() || '';
      if (formData.price_usd !== currentPriceUsd) {
          payload.price_usd = formData.price_usd ? parseFloat(formData.price_usd) : undefined; 
      }

      // Check if any changes were actually made
      if (Object.keys(payload).length === 0) {
          setError("No changes detected.");
          setIsLoading(false);
          return;
      }

      console.log(`Updating album ${album.id} with payload:`, payload);

      // 3. Send data to backend API
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/album/update/${album.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
          },
        }
      );

      console.log("Album updated successfully!");
      onAlbumUpdated(); // Trigger refetch on parent page
      onClose(); // Close modal (reset is handled by useEffect when album changes)

    } catch (err: any) {
      console.error("Error updating album:", err);
      setError(err.response?.data?.message || err.message || 'Failed to update album.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset state without closing (used in useEffect)
  const handleCloseReset = () => {
    setFormData({ name: '', description: '', price_ngn: '', price_usd: '' });
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setIsLoading(false);
  };

  if (!isOpen || !album) return null; // Don't render if not open or no album data

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="bg-[#1F1F1F] rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
        <button 
          onClick={onClose} // Just close, useEffect handles reset if needed
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-white">Edit Album: {album.name}</h2>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Album Name */}
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-300 mb-1">
              Album Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-formBg text-white rounded border border-gray-600 focus:border-greenText focus:ring focus:ring-greenText focus:ring-opacity-50 outline-none"
              placeholder="Enter album name"
              disabled={isLoading}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 bg-formBg text-white rounded border border-gray-600 focus:border-greenText focus:ring focus:ring-greenText focus:ring-opacity-50 outline-none resize-none"
              placeholder="Tell us about the album"
              disabled={isLoading}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Album Cover
            </label>
            <div className="mt-1 flex items-center gap-4 p-3 border-2 border-dashed border-gray-600 rounded-md">
               <input
                 type="file"
                 id="edit-imageFile"
                 ref={fileInputRef}
                 onChange={handleFileChange}
                 accept="image/*" 
                 className="hidden"
                 disabled={isLoading}
               />
               {imagePreview ? (
                 <Image 
                    src={imagePreview} // Shows current or new preview
                    alt="Album preview"
                    width={80}
                    height={80}
                    className="rounded object-cover aspect-square"
                 />
               ) : (
                 <div className="w-20 h-20 bg-formBg rounded flex items-center justify-center text-gray-500">
                    <FaUpload size={30} /> 
                 </div>
               )}
               <button
                 type="button"
                 onClick={triggerFileInput}
                 className="px-3 py-1.5 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded transition duration-150 disabled:opacity-50"
                 disabled={isLoading}
               >
                 Change Image
               </button>
               {imageFile && <span className="text-xs text-gray-400 truncate max-w-[150px]">{imageFile.name}</span>}
            </div>
             <p className="text-xs text-gray-500 mt-1">Upload a new image to replace the current one. Square image recommended.</p>
          </div>
          
           {/* Pricing (Optional) */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
                <label htmlFor="edit-price_usd" className="block text-sm font-medium text-gray-300 mb-1">
                 Price (USD Optional)
                </label>
                <input
                 type="number"
                 id="edit-price_usd"
                 name="price_usd"
                 value={formData.price_usd}
                 onChange={handleInputChange}
                 min="0" step="0.01"
                 className="w-full p-2 bg-formBg text-white rounded border border-gray-600 focus:border-greenText focus:ring focus:ring-greenText focus:ring-opacity-50 outline-none"
                 placeholder="e.g., 2.99"
                 disabled={isLoading}
                />
             </div>
             <div>
                <label htmlFor="edit-price_ngn" className="block text-sm font-medium text-gray-300 mb-1">
                 Price (NGN Optional)
                </label>
                <input
                 type="number"
                 id="edit-price_ngn"
                 name="price_ngn"
                 value={formData.price_ngn}
                 onChange={handleInputChange}
                 min="0" step="1"
                 className="w-full p-2 bg-formBg text-white rounded border border-gray-600 focus:border-greenText focus:ring focus:ring-greenText focus:ring-opacity-50 outline-none"
                 placeholder="e.g., 2000"
                 disabled={isLoading}
                />
             </div>
           </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] transform hover:scale-105 text-black font-medium rounded-lg hover:bg-opacity-90 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAlbumModal; 