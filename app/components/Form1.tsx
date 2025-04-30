'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import DataService from '@/services/DataService'; // Import the new service
import toast from 'react-hot-toast'; // Import toast

// Interfaces (assuming IDs are strings based on DataService)
interface ReleaseFormData {
  releaseTitle: string;
  artistName: string;
  featuredArtist: string;
  releaseDate: string;
  songwriter: string;
  isCover: string;
  category: string; // Stores selected category ID
  contentType: string; // Stores selected content type ID
  genre?: string; 
}

interface Category {
  id: string; 
  name: string;
  content_type_id?: string; // Added back: Needed for client-side filtering
}

interface ContentType {
  id: string; 
  name: string;
}

interface FirstFormProps {
  onSubmit: (data: ReleaseFormData) => void;
  initialData?: ReleaseFormData | null; 
}

const FirstForm: React.FC<FirstFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<ReleaseFormData>(() => 
    initialData || {
    releaseTitle: '',
    artistName: '',
    featuredArtist: '',
    releaseDate: '',
    songwriter: '',
      isCover: 'no', 
    category: '',
  contentType: ''
    }
  );

  // State for fetched data and filtered categories
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]); // Store all fetched categories
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]); // Filtered categories
  const [isLoadingContentTypes, setIsLoadingContentTypes] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  // Removed errorData state, using toast now

  // Fetch content types and categories using DataService
  useEffect(() => {
    let isMounted = true; 
    const loadInitialData = async () => {
        setIsLoadingContentTypes(true);
        setIsLoadingCategories(true);
        try {
            // Fetch both concurrently
            const [ctResponse, catResponse] = await Promise.allSettled([
                DataService.fetchContentTypes(),
                DataService.fetchCategories()
            ]);

            if (isMounted) {
                if (ctResponse.status === 'fulfilled') {
                    setContentTypes(ctResponse.value);
                } else {
                    console.error("Content Type fetch failed:", ctResponse.reason);
                    toast.error(ctResponse.reason?.message || "Failed to load Content Types");
                }
                
                if (catResponse.status === 'fulfilled') {
                    setAllCategories(catResponse.value);
                    // Important: Check if the category objects from your API have a
                    // 'content_type_id' field. If not, client-side filtering won't work.
                    // Assuming categories DO have content_type_id:
                     if (initialData?.contentType) {
                        setAvailableCategories(catResponse.value.filter((cat: Category) => 
                            cat.content_type_id && cat.content_type_id === initialData.contentType
                        ));
                     } else {
                         setAvailableCategories([]); // Start empty if no initial content type
                     }
                } else {
                    console.error("Category fetch failed:", catResponse.reason);
                    toast.error(catResponse.reason?.message || "Failed to load Categories");
                }
            }
        } catch (error) {
             // Catch any unexpected errors during Promise.allSettled setup
            console.error("Error loading initial form data:", error);
            if(isMounted) toast.error("An unexpected error occurred while loading data.");
        } finally {
            if (isMounted) {
                setIsLoadingContentTypes(false);
                setIsLoadingCategories(false);
            }
        }
    };

    loadInitialData();

    return () => { isMounted = false; };

  }, [initialData?.contentType]); // Rerun if initial content type changes to pre-filter categories

  // Update available categories when content type changes in the form
  useEffect(() => {
      if (formData.contentType && allCategories.length > 0) {
         // Filter categories based on the selected content type ID
         // This assumes your Category interface/API response has content_type_id
         const filtered = allCategories.filter((cat: Category) => 
             cat.content_type_id && cat.content_type_id === formData.contentType
         );
         setAvailableCategories(filtered);
      } else {
         setAvailableCategories([]); // Clear if no content type selected or no categories loaded
      }
  }, [formData.contentType, allCategories]);

  // General input handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { id, name, value, type } = e.target;

    if (type === 'radio' && e.target instanceof HTMLInputElement) {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    } else if (name === 'contentType') {
      // When content type changes, reset category
      setFormData(prevState => ({
        ...prevState,
          contentType: value, 
          category: '' // Reset category ID
      }));
    } else {
      // Handles category select and other text/date inputs
      setFormData(prevState => ({ ...prevState, [id || name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if ((contentTypes.length > 0 && !formData.contentType) || (availableCategories.length > 0 && !formData.category)) {
        toast.error("Please select both Content Type and Category.");
        return;
    }
    onSubmit(formData);
    console.log("Form1 submitted:", formData);
  };

  const isLoadingData = isLoadingContentTypes || isLoadingCategories;

  return (
    <div className='w-full bg-[#161717] rounded-2xl p-6 md:p-8 lg:p-10'>
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-white">Release Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Required Fields */}
        <div className="relative">
          <input type="text" id="releaseTitle" name="releaseTitle" className="input-style peer" placeholder=" " value={formData.releaseTitle} onChange={handleChange} required />
          <label htmlFor="releaseTitle" className="floating-label">Release Title *</label>
            </div>
        <div className="relative">
          <input type="text" id="artistName" name="artistName" className="input-style peer" placeholder=" " value={formData.artistName} onChange={handleChange} required />
          <label htmlFor="artistName" className="floating-label">Artist Name *</label>
            </div>

        {/* Optional Fields - Grouped */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {/* Content Type Dropdown */}
            <div className="relative">
                 <label htmlFor="contentType" className="sr-only">Content Type</label>
                 <select
                    name="contentType"
                    id="contentType"
                    className="input-style select-style w-full"
                    value={formData.contentType}
                onChange={handleChange}
                    disabled={isLoadingData}
            required
                 >
                    <option value="" disabled className="text-gray-500">Select Content Type... *</option>
                    {isLoadingContentTypes ? (
                        <option disabled>Loading...</option>
                    ) : contentTypes.length === 0 ? (
                        <option disabled>No content types found</option>
                    ) : (
                      contentTypes.map((ct) => <option key={ct.id} value={ct.id}>{ct.name}</option>)
                )}
              </select>
            </div>

            {/* Category Dropdown (Cascading) */}
            <div className="relative">
                 <label htmlFor="category" className="sr-only">Category</label>
              <select
                    name="category"
                    id="category"
                    className="input-style select-style w-full"
                    value={formData.category}
                    onChange={handleChange}
                    // Disable if loading, no content type selected, or no available categories found
                    disabled={isLoadingData || !formData.contentType || availableCategories.length === 0}
                    required 
                 >
                    <option value="" disabled className="text-gray-500">
                      {!formData.contentType 
                        ? 'Select Content Type first' 
                        : availableCategories.length === 0 
                          ? 'No categories for this type' 
                          : 'Select Category... *'}
                    </option>
                     {/* Only map available (filtered) categories */} 
                     {availableCategories.map((cat) => (
                         <option key={cat.id} value={cat.id}>{cat.name}</option>
                     ))}
              </select>
            </div>

             {/* Other optional fields */}
            <div className="relative">
              <input type="text" id="featuredArtist" name="featuredArtist" className="input-style peer" placeholder=" " value={formData.featuredArtist} onChange={handleChange} />
              <label htmlFor="featuredArtist" className="floating-label">Featured Artist(s)</label>
            </div>
             <div className="relative">
              <input type="date" id="releaseDate" name="releaseDate" className="input-style peer" placeholder=" " value={formData.releaseDate} onChange={handleChange} />
              <label htmlFor="releaseDate" className="floating-label">Release Date</label>
            </div>
            <div className="relative">
              <input type="text" id="songwriter" name="songwriter" className="input-style peer" placeholder=" " value={formData.songwriter} onChange={handleChange} />
              <label htmlFor="songwriter" className="floating-label">Songwriter</label>
            </div>
            </div>

        {/* Is Cover Radio Buttons */}
        <div>
           <label className="block text-sm font-medium text-gray-300 mb-2">Is this a cover song?</label>
           <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center">
                    <input type="radio" id="isCoverYes" name="isCover" value="yes" checked={formData.isCover === 'yes'} onChange={handleChange} className="h-4 w-4 accent-lime-400 focus:ring-lime-500 focus:ring-offset-gray-800 border-gray-600 bg-gray-700" />
                    <label htmlFor="isCoverYes" className="ml-2 text-sm text-gray-300 cursor-pointer">Yes</label>
                </div>
                <div className="flex items-center">
                    <input type="radio" id="isCoverNo" name="isCover" value="no" checked={formData.isCover === 'no'} onChange={handleChange} className="h-4 w-4 accent-lime-400 focus:ring-lime-500 focus:ring-offset-gray-800 border-gray-600 bg-gray-700" />
                    <label htmlFor="isCoverNo" className="ml-2 text-sm text-gray-300 cursor-pointer">No</label>
                </div>
              </div>
            </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end"> 
              <button
                type="submit"
            className="px-6 py-2 bg-gradient-to-r from-[#FAFEEA] to-[#E7F89D] hover:from-[#E7F89D] hover:to-[#FAFEEA] text-black font-semibold rounded-lg transition duration-200 transform hover:scale-105"
            disabled={isLoadingData} 
              >
            {isLoadingData ? 'Loading Data...' : 'Next: Upload Files'}
              </button>
            </div>
          </form>
      
      {/* Styles remain the same */}
      <style jsx>{`
        .input-style { display: block; width: 100%; padding: 0.75rem 1rem; background-color: #161717; border: 1px solid #C2EE0347; color: white; border-radius: 0.375rem; appearance: none; }
        .input-style:focus { outline: none; border-color: #a3e635; box-shadow: 0 0 0 1px #a3e635; }
        .select-style { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem; }
        .input-style:-webkit-autofill, .input-style:-webkit-autofill:hover, .input-style:-webkit-autofill:focus, .input-style:-webkit-autofill:active { -webkit-box-shadow: 0 0 0 30px #161717 inset !important; -webkit-text-fill-color: white !important; caret-color: white !important; }
        .floating-label { position: absolute; left: 1rem; top: 0.75rem; color: #8f9090; pointer-events: none; transition: all 0.2s ease-out; transform-origin: left top; }
        .peer:focus ~ .floating-label, .peer:not(:placeholder-shown) ~ .floating-label { transform: translateY(-1.6rem) scale(0.85); color: #a3e635; background-color: #161717; padding: 0 0.25rem; }
      `}</style>
    </div>
  );
};

export default FirstForm;