'use client';

import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaTimes, FaUpload, FaSpinner } from 'react-icons/fa'; // Icons
import CloudinaryService from '@/services/cloudinary.services'; // Import the service

interface CreateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAlbumCreated: () => void; // Callback to refetch albums
}

interface FormData {
  name: string;
  description: string;
  price_ngn: string; // Keep as string for input handling
  price_usd: string; // Keep as string for input handling
}

const CreateAlbumModal: React.FC<CreateAlbumModalProps> = ({ isOpen, onClose, onAlbumCreated }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price_ngn: '',
    price_usd: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error on change
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null); // Clear error on file selection
    } else {
        setImageFile(null);
        setImagePreview(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name) {
      setError('Album name is required.');
      return;
    }
    if (!imageFile) {
      setError('Album cover image is required.');
      return;
    }
    if (!session?.user?.artistId || !session?.accessToken) {
      setError('Authentication error. Cannot determine artist.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload image to Cloudinary
      console.log("Uploading album cover...");
      const imageUrl = await CloudinaryService.uploadFile(imageFile, 'image');
      console.log("Image uploaded:", imageUrl);

      // 2. Prepare payload for backend
      const payload = {
        name: formData.name,
        artist_id: session.user.artistId,
        description: formData.description || undefined,
        image: imageUrl, // Use the returned Cloudinary URL
        price_ngn: formData.price_ngn ? parseFloat(formData.price_ngn) : undefined,
        price_usd: formData.price_usd ? parseFloat(formData.price_usd) : undefined,
      };
      console.log("Creating album with payload:", payload);

      // 3. Send data to backend API
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/album/create`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
          },
        }
      );

      console.log("Album created successfully!");
      // TODO: Add success notification (e.g., react-hot-toast)
      onAlbumCreated(); // Trigger refetch on parent page
      handleClose(); // Close modal on success

    } catch (err: any) {
      console.error("Error creating album:", err);
      setError(err.response?.data?.message || err.message || 'Failed to create album.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form state when closing
  const handleClose = () => {
    setFormData({ name: '', description: '', price_ngn: '', price_usd: '' });
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="bg-[#1F1F1F] rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-white">Create New Album</h2>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Album Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Album Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
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
              Album Cover <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center gap-4 p-3 border-2 border-dashed border-gray-600 rounded-md">
               <input
                 type="file"
                 id="imageFile"
                 ref={fileInputRef}
                 onChange={handleFileChange}
                 accept="image/*" 
                 className="hidden"
                 disabled={isLoading}
               />
               {imagePreview ? (
                 <Image 
                    src={imagePreview}
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
                 {imagePreview ? 'Change Image' : 'Upload Image'}
               </button>
               {imageFile && <span className="text-xs text-gray-400 truncate max-w-[150px]">{imageFile.name}</span>}
            </div>
            <p className="text-xs text-gray-500 mt-1">Recommended: Square image (e.g., 500x500px). PNG, JPG, WEBP.</p>
          </div>
          
           {/* Pricing (Optional) */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
                <label htmlFor="price_usd" className="block text-sm font-medium text-gray-300 mb-1">
                 Price (USD Optional)
                </label>
                <input
                 type="number"
                 id="price_usd"
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
                <label htmlFor="price_ngn" className="block text-sm font-medium text-gray-300 mb-1">
                 Price (NGN Optional)
                </label>
                <input
                 type="number"
                 id="price_ngn"
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
                  Creating...
                </>
              ) : (
                'Create Album'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbumModal; 