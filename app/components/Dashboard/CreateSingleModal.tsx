'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaTimes, FaUpload, FaSpinner, FaMusic, FaImage } from 'react-icons/fa';
import CloudinaryService from '@/services/cloudinary.services';

// Interfaces for Content Types API
interface Category {
  id: string;
  name: string;
  description?: string;
  content_type_id: string;
  icon?: string;
}

interface ContentType {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  categories: Category[];
}

// Modal Props
interface CreateSingleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSongCreated: () => void;
}

// Form Data State
interface FormData {
  title: string;
  releaseDate: string;
  lyrics: string;
  contentTypeId: string;
  categoryId: string;
  isCover: boolean;
  featuredArtist: string;
  songwriter: string;
}

const CreateSingleModal: React.FC<CreateSingleModalProps> = ({ isOpen, onClose, onSongCreated }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    releaseDate: '',
    lyrics: '',
    contentTypeId: '',
    categoryId: '',
    isCover: false,
    featuredArtist: '',
    songwriter: ''
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTypes, setIsFetchingTypes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Fetch Content Types and Categories when modal opens
  useEffect(() => {
    const fetchTypes = async () => {
      if (isOpen && contentTypes.length === 0) { // Fetch only if open and not already fetched
        setIsFetchingTypes(true);
        setError(null);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/content-types-with-categories`);
          if (response.data?.data && Array.isArray(response.data.data)) {
            setContentTypes(response.data.data);
          } else {
            throw new Error("Invalid data structure received for content types.");
          }
        } catch (err: any) {
          console.error("Error fetching content types:", err);
          setError("Failed to load content types/categories. Cannot create song.");
        } finally {
          setIsFetchingTypes(false);
        }
      }
    };
    fetchTypes();
  }, [isOpen, contentTypes.length]);

  // Update available categories when content type changes
  useEffect(() => {
    if (formData.contentTypeId) {
      const selectedType = contentTypes.find(ct => ct.id === formData.contentTypeId);
      setAvailableCategories(selectedType?.categories || []);
      // Reset category if the selected one is no longer valid
      if (!selectedType?.categories.find(cat => cat.id === formData.categoryId)) {
          setFormData(prev => ({ ...prev, categoryId: '' }));
      }
    } else {
      setAvailableCategories([]);
      setFormData(prev => ({ ...prev, categoryId: '' }));
    }
  }, [formData.contentTypeId, contentTypes, formData.categoryId]);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    let newValue: string | boolean = value;
    // Check if it's an input element and its type is checkbox
    if (e.target instanceof HTMLInputElement && type === 'checkbox') {
        newValue = e.target.checked; // Directly use checked when it's known to be an input checkbox
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue, // Use the determined newValue
    }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'audio' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'audio') {
        setAudioFile(file);
      } else {
        setCoverFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setCoverPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
      setError(null);
    } else {
        if (fileType === 'audio') setAudioFile(null);
        else {
            setCoverFile(null);
            setCoverPreview(null);
        }
    }
  };

  const triggerFileInput = (type: 'audio' | 'cover') => {
    if (type === 'audio') audioInputRef.current?.click();
    else coverInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!formData.title) return setError('Song title is required.');
    if (!audioFile) return setError('Audio file is required.');
    if (!coverFile) return setError('Cover image is required.');
    if (!session?.accessToken) return setError('Authentication error.');
    // Add validation for category/content type if they become required

    setIsLoading(true);

    try {
      // 1. Upload files and get duration
      console.log("Uploading files...");
      const [audioUrl, coverUrl, duration] = await Promise.all([
        CloudinaryService.uploadFile(audioFile, 'video'),
        CloudinaryService.uploadFile(coverFile, 'image'),
        CloudinaryService.getDuration(audioFile),
      ]);
      console.log("Files uploaded:", { audioUrl, coverUrl, duration });

      // 2. Prepare payload
      const payload = {
        songs: [audioUrl],
        cover_images: [coverUrl],
        titles: [formData.title],
        durations: [duration],
        artist_id: session.user?.artistId || session.user?.id, // Prefer artistId if available
        album_id: null, // Explicitly null for singles
        release_date: formData.releaseDate || undefined,
        lyrics: formData.lyrics || undefined,
        content_type_id: formData.contentTypeId || undefined,
        category_id: formData.categoryId || undefined,
        isCover: formData.isCover,
        featuredArtist: formData.featuredArtist || undefined,
        songwriter: formData.songwriter || undefined,
      };
      console.log("Creating song with payload:", payload);

      // 3. Send data to backend API
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/song/create`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
          },
        }
      );

      console.log("Song created successfully!");
      onSongCreated();
      handleClose(); // Close and reset on success

    } catch (err: any) {
      console.error("Error creating song:", err);
      setError(err.response?.data?.message || err.message || 'Failed to create song.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form state when closing
  const handleClose = () => {
    setFormData({ title: '', releaseDate: '', lyrics: '', contentTypeId: '', categoryId: '', isCover: false, featuredArtist: '', songwriter: '' });
    setAudioFile(null);
    setCoverFile(null);
    setCoverPreview(null);
    setError(null);
    setIsLoading(false);
    // Keep contentTypes fetched state
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="bg-[#1F1F1F] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-white disabled:opacity-50" disabled={isLoading}><FaTimes size={20} /></button>
        <h2 className="text-2xl font-semibold mb-6 text-white">Create New Single</h2>

        {error && <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded mb-4 text-sm">{error}</div>}
        {isFetchingTypes && <div className="text-center text-gray-400 mb-4">Loading content options...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title <span className="text-red-500">*</span></label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="input-style" placeholder="Song Title" disabled={isLoading || isFetchingTypes} required />
          </div>

          {/* Audio Upload */}
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-1">Audio File <span className="text-red-500">*</span></label>
             <div className="file-input-container">
                <input type="file" ref={audioInputRef} onChange={(e) => handleFileChange(e, 'audio')} accept="audio/*" className="hidden" disabled={isLoading || isFetchingTypes} />
                <div className="file-preview-placeholder"><FaMusic size={30} /></div>
                <button type="button" onClick={() => triggerFileInput('audio')} className="file-upload-button" disabled={isLoading || isFetchingTypes}>Upload Audio</button>
                {audioFile && <span className="file-name-display">{audioFile.name}</span>}
             </div>
          </div>

          {/* Cover Image Upload */}
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-1">Cover Image <span className="text-red-500">*</span></label>
             <div className="file-input-container">
                <input type="file" ref={coverInputRef} onChange={(e) => handleFileChange(e, 'cover')} accept="image/*" className="hidden" disabled={isLoading || isFetchingTypes} />
                {coverPreview ? <Image src={coverPreview} alt="Cover preview" width={80} height={80} className="rounded object-cover aspect-square" /> : <div className="file-preview-placeholder"><FaImage size={30}/></div>}
                <button type="button" onClick={() => triggerFileInput('cover')} className="file-upload-button" disabled={isLoading || isFetchingTypes}>{coverPreview ? 'Change Cover' : 'Upload Cover'}</button>
                {coverFile && <span className="file-name-display">{coverFile.name}</span>}
             </div>
          </div>
          
          {/* Row for Optional Fields */} 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Release Date */}
              <div>
                  <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-300 mb-1">Release Date (Optional)</label>
                  <input type="date" id="releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} className="input-style" disabled={isLoading || isFetchingTypes} />
              </div>
              
              {/* Songwriter */} 
              <div>
                  <label htmlFor="songwriter" className="block text-sm font-medium text-gray-300 mb-1">Songwriter (Optional)</label>
                  <input type="text" id="songwriter" name="songwriter" value={formData.songwriter} onChange={handleInputChange} className="input-style" placeholder="e.g., John Doe" disabled={isLoading || isFetchingTypes} />
              </div>

              {/* Featured Artist */}
              <div>
                  <label htmlFor="featuredArtist" className="block text-sm font-medium text-gray-300 mb-1">Featured Artist (Optional)</label>
                  <input type="text" id="featuredArtist" name="featuredArtist" value={formData.featuredArtist} onChange={handleInputChange} className="input-style" placeholder="e.g., Jane Smith" disabled={isLoading || isFetchingTypes} />
              </div>

              {/* Content Type Dropdown */}
              <div>
                  <label htmlFor="contentTypeId" className="block text-sm font-medium text-gray-300 mb-1">Content Type (Optional)</label>
                  <select id="contentTypeId" name="contentTypeId" value={formData.contentTypeId} onChange={handleInputChange} className="input-style" disabled={isLoading || isFetchingTypes || contentTypes.length === 0}>
                      <option value="">Select Content Type...</option>
                      {contentTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                  </select>
              </div>

              {/* Category Dropdown */}
              <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-300 mb-1">Category (Optional)</label>
                  <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="input-style" disabled={isLoading || isFetchingTypes || availableCategories.length === 0}>
                      <option value="">Select Category...</option>
                      {availableCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
              </div>

               {/* Is Cover Checkbox */}
              <div className="flex items-center col-span-1 md:col-span-2">
                <input type="checkbox" id="isCover" name="isCover" checked={formData.isCover} onChange={handleInputChange} className="h-4 w-4 text-greenText focus:ring-greenText border-gray-500 rounded mr-2 bg-formBg" disabled={isLoading || isFetchingTypes} />
                <label htmlFor="isCover" className="text-sm text-gray-300">This is a cover song</label>
             </div>
          </div>

           {/* Lyrics */}
          <div>
            <label htmlFor="lyrics" className="block text-sm font-medium text-gray-300 mb-1">Lyrics (Optional)</label>
            <textarea id="lyrics" name="lyrics" value={formData.lyrics} onChange={handleInputChange} rows={4} className="input-style resize-none" placeholder="Enter song lyrics" disabled={isLoading || isFetchingTypes} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="submit-button" disabled={isLoading || isFetchingTypes}>
              {isLoading ? <><FaSpinner className="animate-spin" /> Creating...</> : 'Create Single'}
            </button>
          </div>
        </form>
      </div>
       {/* Basic reusable styles - consider moving to a global CSS file */}
       <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.5rem;
          background-color: #313133; /* bg-formBg */
          color: white;
          border-radius: 0.25rem; /* rounded */
          border: 1px solid #4B5563; /* border-gray-600 */
          outline: none;
        }
        .input-style:focus {
          border-color: #C2EE03; /* focus:border-greenText */
          box-shadow: 0 0 0 3px rgba(194, 238, 3, 0.5); /* focus:ring focus:ring-greenText focus:ring-opacity-50 */
        }
        .input-style:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        .file-input-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            border: 2px dashed #4B5563; /* border-dashed border-gray-600 */
            border-radius: 0.375rem; /* rounded-md */
        }
        .file-preview-placeholder {
            width: 5rem; /* w-20 */
            height: 5rem; /* h-20 */
            background-color: #313133; /* bg-formBg */
            border-radius: 0.25rem; /* rounded */
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6B7280; /* text-gray-500 */
        }
        .file-upload-button {
            padding: 0.375rem 0.75rem; /* px-3 py-1.5 */
            font-size: 0.875rem; /* text-sm */
            background-color: #4B5563; /* bg-gray-600 */
            color: white;
            border-radius: 0.25rem; /* rounded */
            transition: background-color 150ms;
        }
        .file-upload-button:hover {
            background-color: #6B7280; /* hover:bg-gray-500 */
        }
        .file-upload-button:disabled {
             opacity: 0.5;
             cursor: not-allowed;
        }
        .file-name-display {
            font-size: 0.75rem; /* text-xs */
            color: #9CA3AF; /* text-gray-400 */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 150px; 
        }
        .submit-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.5rem 1.5rem; /* px-6 py-2 */
            background-color: #C2EE03; /* bg-greenText */
            color: black;
            font-weight: 500; /* font-medium */
            border-radius: 0.25rem; /* rounded */
            transition: background-color 200ms;
        }
        .submit-button:hover {
            background-color: rgba(194, 238, 3, 0.9); /* hover:bg-opacity-90 */
        }
        .submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CreateSingleModal; 