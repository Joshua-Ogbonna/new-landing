'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaTimes, FaUpload, FaSpinner, FaMusic, FaImage } from 'react-icons/fa';
import CloudinaryService from '@/services/cloudinary.services'; // Assuming this handles uploads correctly

// Interfaces (assuming defined elsewhere or define here)
interface Category {
  id: string; name: string; content_type_id: string; 
}
interface ContentType {
  id: string; name: string; categories: Category[];
}
interface Song {
  id: string; title: string; artist_id: string; album_id?: string | null; release_date?: string | null;
  duration?: number; content_type_id?: string | null; category_id?: string | null; isCover?: boolean;
  featuredArtist?: string | null; songwriter?: string | null; file: string; cover_image: string;
  formatted_file_url?: string; formatted_cover_url: string; lyrics?: string | null;
}

interface EditSingleModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
  onSongUpdated: () => void;
}

// Rename state interface to avoid collision with native FormData
interface SongFormData {
  title: string;
  releaseDate: string;
  lyrics: string;
  contentTypeId: string;
  categoryId: string;
  isCover: boolean;
  featuredArtist: string;
  songwriter: string;
}

const EditSingleModal: React.FC<EditSingleModalProps> = ({ isOpen, onClose, song, onSongUpdated }) => {
  const { data: session } = useSession();
  // Use the renamed interface for state
  const [formData, setFormData] = useState<SongFormData>({
      title: '', releaseDate: '', lyrics: '', contentTypeId: '', categoryId: '',
      isCover: false, featuredArtist: '', songwriter: ''
  });
  // State for *new* files selected by the user
  const [newAudioFile, setNewAudioFile] = useState<File | null>(null);
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  // State for previewing the cover (either existing or new)
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTypes, setIsFetchingTypes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Fetch Content Types
  useEffect(() => {
    const fetchTypes = async () => {
      if (isOpen && contentTypes.length === 0) {
        setIsFetchingTypes(true); setError(null);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/content-types-with-categories`);
          setContentTypes(response.data?.data || []);
        } catch (err) {
          console.error("Error fetching content types:", err);
          setError("Failed to load content options.");
        } finally {
          setIsFetchingTypes(false);
        }
      }
    };
    fetchTypes();
  }, [isOpen, contentTypes.length]);

  // Populate form & reset state when song or modal visibility changes
  useEffect(() => {
    if (isOpen && song) {
      const releaseDate = song.release_date ? new Date(song.release_date).toISOString().split('T')[0] : '';
      setFormData({
        title: song.title || '',
        releaseDate: releaseDate,
        lyrics: song.lyrics || '',
        contentTypeId: song.content_type_id || '',
        categoryId: song.category_id || '',
        isCover: song.isCover || false,
        featuredArtist: song.featuredArtist || '',
        songwriter: song.songwriter || ''
      });
      setCoverPreview(song.formatted_cover_url || null);
      setNewAudioFile(null); // Clear any previously selected new files
      setNewCoverFile(null);
      setError(null);
    } else if (!isOpen) {
      // Reset everything when modal closes
      handleCloseReset();
    }
  }, [song, isOpen]);

   // Update available categories when content type changes
   useEffect(() => {
    if (formData.contentTypeId && contentTypes.length > 0) {
      const selectedType = contentTypes.find(ct => ct.id === formData.contentTypeId);
      setAvailableCategories(selectedType?.categories || []);
      // Check if the current category ID is still valid for the new content type
      if (!selectedType?.categories.find(cat => cat.id === formData.categoryId)) {
          setFormData(prev => ({ ...prev, categoryId: '' })); // Reset if invalid
      }
    } else {
      setAvailableCategories([]);
      // Don't reset categoryId here if contentTypeId is initially empty, wait for population
      if (!formData.contentTypeId) {
          setFormData(prev => ({ ...prev, categoryId: '' }));
      }
    }
  }, [formData.contentTypeId, formData.categoryId, contentTypes]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (e.target instanceof HTMLInputElement && type === 'checkbox') {
      newValue = e.target.checked;
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'audio' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'audio') setNewAudioFile(file);
      else {
        setNewCoverFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setCoverPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
      setError(null);
    } 
  };

  const triggerFileInput = (type: 'audio' | 'cover') => {
    if (type === 'audio') audioInputRef.current?.click();
    else coverInputRef.current?.click();
  };

  // --- Submit Logic ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song || !session?.accessToken) {
      setError("Cannot update song. Missing data or authentication.");
      return;
    }
    if (!formData.title) return setError('Song title is required.');

    setIsLoading(true); setError(null);

    try {
      const useFormData = !!newAudioFile || !!newCoverFile;
      // Use globalThis.FormData for the native type
      let requestData: globalThis.FormData | { [key: string]: any }; 
      let headers: { [key: string]: string } = {
        'Authorization': `Bearer ${session.accessToken}`,
      };

      // --- Prepare Payload --- 
      const changedFields: { [key: string]: any } = {};
      // Compare and add changed text/boolean fields
      if (formData.title !== song.title) changedFields.title = formData.title;
      const currentReleaseDate = song.release_date ? new Date(song.release_date).toISOString().split('T')[0] : '';
      if (formData.releaseDate !== currentReleaseDate) changedFields.release_date = formData.releaseDate || null; // Send null to clear? Check API
      if (formData.lyrics !== (song.lyrics || '')) changedFields.lyrics = formData.lyrics;
      if (formData.contentTypeId !== (song.content_type_id || '')) changedFields.content_type_id = formData.contentTypeId || null;
      if (formData.categoryId !== (song.category_id || '')) changedFields.category_id = formData.categoryId || null;
      if (formData.isCover !== (song.isCover || false)) changedFields.isCover = formData.isCover;
      if (formData.featuredArtist !== (song.featuredArtist || '')) changedFields.featuredArtist = formData.featuredArtist || null;
      if (formData.songwriter !== (song.songwriter || '')) changedFields.songwriter = formData.songwriter || null;

      // --- Handle Request Type (FormData or JSON) ---
      if (useFormData) {
        console.log("Updating with FormData (file changed)");
        // Assign native FormData object
        requestData = new FormData(); 
        // Append changed text fields
        Object.entries(changedFields).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
             // No type assertion needed here, requestData is correctly typed
             requestData.append(key, typeof value === 'boolean' ? String(value) : value);
          } else if (value === null) {
             requestData.append(key, ''); 
          }
        });
        // Append new files if they exist
        if (newAudioFile) requestData.append('song', newAudioFile);
        if (newCoverFile) requestData.append('cover_image', newCoverFile);
        // Headers set by axios for FormData
      } else {
         console.log("Updating with JSON (no file change)");
        if (Object.keys(changedFields).length === 0) {
            setError("No changes detected.");
            setIsLoading(false);
            return;
        }
        requestData = changedFields; // Assign JSON object
        headers['Content-Type'] = 'application/json';
      }

      console.log("Sending update request:", requestData instanceof FormData ? "[FormData]" : requestData);

      // --- Make API Call --- 
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/song/update/${song.id}`,
        requestData, // Pass FormData or JSON object
        { headers }
      );

      console.log("Song updated successfully!");
      onSongUpdated();
      onClose();

    } catch (err: any) {
      console.error("Error updating song:", err);
      setError(err.response?.data?.message || err.message || 'Failed to update song.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset state without closing
  const handleCloseReset = () => {
    setFormData({ title: '', releaseDate: '', lyrics: '', contentTypeId: '', categoryId: '', isCover: false, featuredArtist: '', songwriter: '' });
    setNewAudioFile(null);
    setNewCoverFile(null);
    setCoverPreview(null);
    setError(null);
    setIsLoading(false);
    // Don't reset contentTypes here
  };

  if (!isOpen || !song) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="bg-[#1F1F1F] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white disabled:opacity-50" disabled={isLoading}><FaTimes size={20} /></button>
        <h2 className="text-2xl font-semibold mb-6 text-white">Edit Single: {song.title}</h2>

        {error && <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded mb-4 text-sm">{error}</div>}
        {isFetchingTypes && <div className="text-center text-gray-400 mb-4">Loading content options...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-300 mb-1">Title <span className="text-red-500">*</span></label>
            <input type="text" id="edit-title" name="title" value={formData.title} onChange={handleInputChange} className="input-style" placeholder="Song Title" disabled={isLoading || isFetchingTypes} required />
          </div>

          {/* Audio Upload */}
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-1">Audio File</label>
             <div className="file-input-container">
                <input type="file" ref={audioInputRef} onChange={(e) => handleFileChange(e, 'audio')} accept="audio/*" className="hidden" disabled={isLoading || isFetchingTypes} />
                <div className="file-preview-placeholder"><FaMusic size={30} /></div>
                <button type="button" onClick={() => triggerFileInput('audio')} className="file-upload-button" disabled={isLoading || isFetchingTypes}>Change Audio</button>
                <span className="file-name-display">{newAudioFile ? newAudioFile.name : (song.file?.split('/').pop() || 'Current Audio')}</span>
             </div>
             <p className="text-xs text-gray-500 mt-1">Upload a new file to replace the current audio.</p>
          </div>

          {/* Cover Image Upload */}
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-1">Cover Image</label>
             <div className="file-input-container">
                <input type="file" ref={coverInputRef} onChange={(e) => handleFileChange(e, 'cover')} accept="image/*" className="hidden" disabled={isLoading || isFetchingTypes} />
                {coverPreview ? <Image src={coverPreview} alt="Cover preview" width={80} height={80} className="rounded object-cover aspect-square" /> : <div className="file-preview-placeholder"><FaImage size={30}/></div>}
                <button type="button" onClick={() => triggerFileInput('cover')} className="file-upload-button" disabled={isLoading || isFetchingTypes}>Change Cover</button>
                <span className="file-name-display">{newCoverFile ? newCoverFile.name : (song.cover_image?.split('/').pop() || 'Current Cover')}</span>
             </div>
             <p className="text-xs text-gray-500 mt-1">Upload a new image to replace the current cover.</p>
          </div>
          
          {/* Row for Optional Fields */} 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Release Date */}
              <div>
                  <label htmlFor="edit-releaseDate" className="block text-sm font-medium text-gray-300 mb-1">Release Date (Optional)</label>
                  <input type="date" id="edit-releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} className="input-style" disabled={isLoading || isFetchingTypes} />
              </div>
              
              {/* Songwriter */} 
              <div>
                  <label htmlFor="edit-songwriter" className="block text-sm font-medium text-gray-300 mb-1">Songwriter (Optional)</label>
                  <input type="text" id="edit-songwriter" name="songwriter" value={formData.songwriter} onChange={handleInputChange} className="input-style" placeholder="e.g., John Doe" disabled={isLoading || isFetchingTypes} />
              </div>

              {/* Featured Artist */}
              <div>
                  <label htmlFor="edit-featuredArtist" className="block text-sm font-medium text-gray-300 mb-1">Featured Artist (Optional)</label>
                  <input type="text" id="edit-featuredArtist" name="featuredArtist" value={formData.featuredArtist} onChange={handleInputChange} className="input-style" placeholder="e.g., Jane Smith" disabled={isLoading || isFetchingTypes} />
              </div>

              {/* Content Type Dropdown */}
              <div>
                  <label htmlFor="edit-contentTypeId" className="block text-sm font-medium text-gray-300 mb-1">Content Type (Optional)</label>
                  <select id="edit-contentTypeId" name="contentTypeId" value={formData.contentTypeId} onChange={handleInputChange} className="input-style" disabled={isLoading || isFetchingTypes || contentTypes.length === 0}>
                      <option value="">Select Content Type...</option>
                      {contentTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                  </select>
              </div>

              {/* Category Dropdown */}
              <div>
                  <label htmlFor="edit-categoryId" className="block text-sm font-medium text-gray-300 mb-1">Category (Optional)</label>
                  <select id="edit-categoryId" name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="input-style" disabled={isLoading || isFetchingTypes || availableCategories.length === 0}>
                      <option value="">Select Category...</option>
                      {availableCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
              </div>

               {/* Is Cover Checkbox */}
              <div className="flex items-center col-span-1 md:col-span-2">
                <input type="checkbox" id="edit-isCover" name="isCover" checked={formData.isCover} onChange={handleInputChange} className="h-4 w-4 text-greenText focus:ring-greenText border-gray-500 rounded mr-2 bg-formBg" disabled={isLoading || isFetchingTypes} />
                <label htmlFor="edit-isCover" className="text-sm text-gray-300">This is a cover song</label>
             </div>
          </div>

           {/* Lyrics */}
          <div>
            <label htmlFor="edit-lyrics" className="block text-sm font-medium text-gray-300 mb-1">Lyrics (Optional)</label>
            <textarea id="edit-lyrics" name="lyrics" value={formData.lyrics} onChange={handleInputChange} rows={4} className="input-style resize-none" placeholder="Enter song lyrics" disabled={isLoading || isFetchingTypes} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="submit-button" disabled={isLoading || isFetchingTypes}>
              {isLoading ? <><FaSpinner className="animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
       {/* Reusing styles from CreateSingleModal */}
       <style jsx>{`
        .input-style { width: 100%; padding: 0.5rem; background-color: #313133; color: white; border-radius: 0.25rem; border: 1px solid #4B5563; outline: none; }
        .input-style:focus { border-color: #C2EE03; box-shadow: 0 0 0 3px rgba(194, 238, 3, 0.5); }
        .input-style:disabled { opacity: 0.7; cursor: not-allowed; }
        .file-input-container { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border: 2px dashed #4B5563; border-radius: 0.375rem; }
        .file-preview-placeholder { width: 5rem; height: 5rem; background-color: #313133; border-radius: 0.25rem; display: flex; align-items: center; justify-content: center; color: #6B7280; }
        .file-upload-button { padding: 0.375rem 0.75rem; font-size: 0.875rem; background-color: #4B5563; color: white; border-radius: 0.25rem; transition: background-color 150ms; }
        .file-upload-button:hover { background-color: #6B7280; }
        .file-upload-button:disabled { opacity: 0.5; cursor: not-allowed; }
        .file-name-display { font-size: 0.75rem; color: #9CA3AF; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 150px; }
        .submit-button { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1.5rem; background-color: #C2EE03; color: black; font-weight: 500; border-radius: 0.25rem; transition: background-color 200ms; }
        .submit-button:hover { background-color: rgba(194, 238, 3, 0.9); }
        .submit-button:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default EditSingleModal; 