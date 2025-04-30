'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaTimes, FaUpload, FaSpinner, FaMusic, FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast'; // Import toast
import DataService from '@/services/DataService'; // Import DataService
// Remove CloudinaryService import if DataService handles uploads, or keep if needed separately
// import CloudinaryService from '@/services/cloudinary.services'; 

// Interfaces (Make sure these match DataService and API responses)
interface Category {
  id: string; 
  name: string; 
  content_type_id?: string; // Required for filtering
}
interface ContentType {
  id: string; 
  name: string;
  // Removed nested categories, assuming fetched separately
}
interface Song { // Keep this as it defines the incoming prop structure
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
  const [formData, setFormData] = useState<SongFormData>({
      title: '', releaseDate: '', lyrics: '', contentTypeId: '', categoryId: '',
      isCover: false, featuredArtist: '', songwriter: ''
  });
  const [newAudioFile, setNewAudioFile] = useState<File | null>(null);
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  // State for fetched types/categories
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  
  const [isLoading, setIsLoading] = useState(false); // For submission loading
  const [isLoadingData, setIsLoadingData] = useState(false); // For initial data fetch
  // Removed local error state, using toast
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Fetch Content Types & Categories using DataService when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (isOpen && contentTypes.length === 0 && allCategories.length === 0) { // Fetch only if needed
        setIsLoadingData(true); 
        try {
          const [ctResponse, catResponse] = await Promise.allSettled([
              DataService.fetchContentTypes(),
              DataService.fetchCategories()
          ]);
          
          let fetchedContentTypes: ContentType[] = [];
          let fetchedCategories: Category[] = [];

          if (ctResponse.status === 'fulfilled') {
              fetchedContentTypes = ctResponse.value;
          } else {
              console.error("Content Type fetch failed:", ctResponse.reason);
              toast.error(ctResponse.reason?.message || "Failed to load Content Types");
          }
          
          if (catResponse.status === 'fulfilled') {
               fetchedCategories = catResponse.value;
          } else {
              console.error("Category fetch failed:", catResponse.reason);
              toast.error(catResponse.reason?.message || "Failed to load Categories");
          }
          
          setContentTypes(fetchedContentTypes);
          setAllCategories(fetchedCategories);

        } catch (err) {
           console.error("Error fetching initial data:", err);
           toast.error("An unexpected error occurred loading select options.");
        } finally {
           setIsLoadingData(false);
        }
      }
    };
    fetchData();
  }, [isOpen]); // Dependency on isOpen to trigger fetch

  // Populate form & reset state when song prop changes (while modal is open)
  useEffect(() => {
    if (isOpen && song) {
      console.log("Populating edit form for song:", song);
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
      setCoverPreview(song.formatted_cover_url || song.cover_image || null); // Use formatted or original
      setNewAudioFile(null); 
      setNewCoverFile(null);
    } 
    // Reset is handled separately by onClose -> handleCloseReset if needed
  }, [song, isOpen]);

   // Update available categories when content type or allCategories changes
   useEffect(() => {
    if (formData.contentTypeId && allCategories.length > 0) {
      const filtered = allCategories.filter(cat => cat.content_type_id === formData.contentTypeId);
      setAvailableCategories(filtered);
      // Reset category if current selection is no longer valid
      if (filtered.length > 0 && !filtered.find(cat => cat.id === formData.categoryId)) {
          console.log("Resetting categoryId because it's no longer valid for content type:", formData.contentTypeId);
          setFormData(prev => ({ ...prev, categoryId: '' })); 
      } else if (filtered.length === 0) {
           console.log("Resetting categoryId because no categories available for content type:", formData.contentTypeId);
           setFormData(prev => ({ ...prev, categoryId: '' })); 
      }
    } else {
      setAvailableCategories([]);
       // Also reset category if content type is cleared
      if (!formData.contentTypeId) {
           setFormData(prev => ({ ...prev, categoryId: '' })); 
      }
    }
  }, [formData.contentTypeId, formData.categoryId, allCategories]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;

    if (e.target instanceof HTMLInputElement && type === 'checkbox') {
      newValue = e.target.checked;
    }

    if (name === 'contentTypeId') {
      // Reset category when content type changes explicitly
      setFormData((prev) => ({ ...prev, contentTypeId: value, categoryId: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    }
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
      toast.error("Cannot update song. Missing data or authentication.");
      return;
    }
    if (!formData.title) {
        toast.error('Song title is required.');
        return;
    }
    // Add validation for category if content type is selected
    if (formData.contentTypeId && !formData.categoryId) {
       toast.error("Please select a category for the chosen content type.");
       return; 
    }

    setIsLoading(true);
    const toastId = toast.loading("Updating single...");

    try {
      // Determine if files are being uploaded (requires FormData)
      const useFormData = !!newAudioFile || !!newCoverFile;
      let requestData: FormData | { [key: string]: any }; // Use native FormData
      let headers: { [key: string]: string } = {
        'Authorization': `Bearer ${session.accessToken}`,
      };

      // --- Prepare Payload (Only changed fields) ---
      const changedFields: { [key: string]: any } = {};
      if (formData.title !== song.title) changedFields.title = formData.title;
      const currentReleaseDate = song.release_date ? new Date(song.release_date).toISOString().split('T')[0] : '';
      if (formData.releaseDate !== currentReleaseDate) changedFields.release_date = formData.releaseDate || null;
      if (formData.lyrics !== (song.lyrics || '')) changedFields.lyrics = formData.lyrics;
      if (formData.contentTypeId !== (song.content_type_id || '')) changedFields.content_type_id = formData.contentTypeId || null;
      if (formData.categoryId !== (song.category_id || '')) changedFields.category_id = formData.categoryId || null;
      if (formData.isCover !== (song.isCover || false)) changedFields.isCover = formData.isCover;
      if (formData.featuredArtist !== (song.featuredArtist || '')) changedFields.featuredArtist = formData.featuredArtist || null;
      if (formData.songwriter !== (song.songwriter || '')) changedFields.songwriter = formData.songwriter || null;

      if (useFormData) {
        requestData = new FormData(); // Native FormData
        Object.entries(changedFields).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            requestData.append(key, typeof value === 'boolean' ? String(value) : value);
          } else {
             requestData.append(key, ''); // Send empty string for null? Check API handling
          }
        });
        if (newAudioFile) requestData.append('song', newAudioFile);
        if (newCoverFile) requestData.append('cover_image', newCoverFile);
        // Let axios set Content-Type for FormData
      } else {
        console.log("Updating with JSON (no file change)");
        if (Object.keys(changedFields).length === 0) {
            toast.error("No changes detected.", { id: toastId });
            setIsLoading(false);
            return;
        }
        requestData = changedFields; 
        headers['Content-Type'] = 'application/json';
      }

      // --- Make API Call (POST for update according to docs) --- 
      await axios.post( // Use POST as per documentation
        `${process.env.NEXT_PUBLIC_API_URL}/api/song/update/${song.id}`,
        requestData, 
        { headers }
      );

      toast.success("Single updated successfully!", { id: toastId });
      onSongUpdated();
      handleCloseReset(); // Close and reset form

    } catch (err: any) {
      console.error("Error updating song:", err);
      toast.error(err.response?.data?.message || err.message || 'Failed to update single.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form state when closing
  const handleCloseReset = () => {
    setFormData({ title: '', releaseDate: '', lyrics: '', contentTypeId: '', categoryId: '', isCover: false, featuredArtist: '', songwriter: '' });
    setNewAudioFile(null);
    setNewCoverFile(null);
    setCoverPreview(null);
    setIsLoading(false);
    // Optionally reset fetched data if desired, but maybe keep for faster reopen?
    // setContentTypes([]);
    // setAllCategories([]);
    onClose(); // Call the parent onClose
  };


  if (!isOpen || !song) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-[#1E1E1E] rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col text-white relative">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Edit Single</h2>
          <button 
            type="button" 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition p-1 rounded-full hover:bg-[#161717]" // Added padding and hover bg
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form 
          id="edit-single-form"
          onSubmit={handleSubmit} 
          className="p-6 overflow-y-auto flex-grow space-y-6"
        >
          {(isLoadingData) && ( // Show loader while fetching types/categories
            <div className="absolute inset-0 bg-[#1e1e1e] bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
               <FaSpinner className="animate-spin text-lime-500 mr-2" size={24} /> 
               <span className="text-white">Loading options...</span>
            </div>
          )}
          
          {/* Row 1: Title & Release Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Song Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-[#161717] border border-lime-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-lime-600 text-white placeholder-gray-400"
                placeholder="Enter song title"
              />
            </div>
            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-300 mb-1">Release Date</label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-[#161717] border border-lime-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-lime-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Row 2: Content Type & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contentTypeId" className="block text-sm font-medium text-gray-300 mb-1">Content Type</label>
              <select
                id="contentTypeId"
                name="contentTypeId"
                value={formData.contentTypeId}
                onChange={handleInputChange}
                disabled={isLoadingData} // Disable while loading
                className="w-full px-4 py-2 bg-[#161717] border border-lime-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-lime-600 text-white"
              >
                <option value="">Select Content Type</option>
                {contentTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
             <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-300 mb-1">Category {formData.contentTypeId && !isLoadingData && availableCategories.length === 0 ? '(None available)' : ''} {formData.contentTypeId && <span className="text-red-500">*</span>}</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                disabled={!formData.contentTypeId || isLoadingData || availableCategories.length === 0} // Disable if no content type, loading, or no categories for type
                required={!!formData.contentTypeId} // Required only if content type is selected
                className="w-full px-4 py-2 bg-[#161717] border border-lime-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-lime-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{formData.contentTypeId ? 'Select Category' : 'Select Content Type first'}</option>
                {availableCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          
           {/* Row 3: Featured Artist & Songwriter */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="featuredArtist" className="block text-sm font-medium text-gray-300 mb-1">Featured Artist (Optional)</label>
              <input
                type="text"
                id="featuredArtist"
                name="featuredArtist"
                value={formData.featuredArtist}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-[#161717] border border-lime-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-lime-600 text-white placeholder-gray-400"
                placeholder="e.g., Artist Name"
              />
            </div>
             <div>
              <label htmlFor="songwriter" className="block text-sm font-medium text-gray-300 mb-1">Songwriter (Optional)</label>
              <input
                type="text"
                id="songwriter"
                name="songwriter"
                value={formData.songwriter}
                onChange={handleInputChange}
                 className="w-full px-4 py-2 bg-[#161717] border border-lime-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-lime-600 text-white placeholder-gray-400"
                placeholder="e.g., Writer Name"
              />
            </div>
          </div>

          {/* Row 4: Lyrics & Is Cover Checkbox */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
             <div>
              <label htmlFor="lyrics" className="block text-sm font-medium text-gray-300 mb-1">Lyrics (Optional)</label>
              <textarea
                id="lyrics"
                name="lyrics"
                rows={4} // Adjust height as needed
                value={formData.lyrics}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-[#161717] border border-lime-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-lime-600 text-white placeholder-gray-400 resize-y" // Added resize-y
                placeholder="Enter song lyrics here..."
              />
            </div>
             <div className="pt-8"> {/* Add padding to align with label */}
                 <div className="flex items-center">
                    <input
                        id="isCover"
                        name="isCover"
                        type="checkbox"
                        checked={formData.isCover}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-lime-600 border-gray-500 rounded focus:ring-lime-500" // Adjusted checkbox style
                    />
                    <label htmlFor="isCover" className="ml-2 block text-sm text-gray-300">
                        This song is a cover
                    </label>
                </div>
            </div>
          </div>
          
          {/* Row 5: File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Cover Art Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cover Art (Optional Update)</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-[#161717] rounded border border-dashed border-gray-500 flex items-center justify-center overflow-hidden relative">
                  {coverPreview ? (
                    <Image src={coverPreview} alt="Cover preview" layout="fill" objectFit="cover" />
                  ) : (
                    <FaImage className="text-gray-500" size={30} />
                  )}
                  <input
                    type="file"
                    ref={coverInputRef}
                    onChange={(e) => handleFileChange(e, 'cover')}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="cover-upload" // Added id for label association
                  />
                </div>
                 <button 
                   type="button" 
                   onClick={() => triggerFileInput('cover')}
                   className="px-4 py-2 bg-gray-600 border border-lime-700 rounded-md text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600 focus:ring-offset-gray-800"
                 >
                   Change Cover
                 </button>
              </div>
              {newCoverFile && <p className="text-xs text-gray-400 mt-1 truncate">New: {newCoverFile.name}</p>}
            </div>

            {/* Audio File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Audio File (Optional Update)</label>
               <div className="flex items-center space-x-4">
                  {/* Placeholder/Indicator for audio */}
                  <div className="w-20 h-20 bg-[#161717] rounded border border-dashed border-gray-500 flex items-center justify-center text-gray-500">
                      <FaMusic size={30}/>
                  </div>
                  <input
                    type="file"
                    ref={audioInputRef}
                    onChange={(e) => handleFileChange(e, 'audio')}
                    accept="audio/*"
                    className="hidden" // Visually hide, triggered by button
                    id="audio-upload" // Added id for label association
                   />
                  <button 
                    type="button" 
                    onClick={() => triggerFileInput('audio')}
                    className="px-4 py-2 bg-gray-600 border border-lime-700 rounded-md text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600 focus:ring-offset-gray-800"
                   >
                    Change Audio
                  </button>
               </div>
               {newAudioFile && <p className="text-xs text-gray-400 mt-1 truncate">New: {newAudioFile.name}</p>}
               {song?.file && !newAudioFile && <p className="text-xs text-gray-400 mt-1 truncate">Current: {song.file.split('/').pop()}</p>}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex justify-end items-center p-5 border-t border-gray-700 space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-single-form"
            disabled={isLoading || isLoadingData}
            className="px-4 py-2 bg-lime-400 border border-transparent rounded-md text-sm font-medium text-black hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" // Added flex centering
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" /> 
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSingleModal; 