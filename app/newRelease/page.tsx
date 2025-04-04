
'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react';
import SideBar from '../components/SideBar';

interface FormData {
  releaseTitle: string;
  artistName: string;
  featuredArtist: string;
  genre: string;
  releaseDate: string;
  songwriter: string;
}

const NewReleaseForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    releaseTitle: '',
    artistName: '',
    featuredArtist: '',
    genre: '',
    releaseDate: '',
    songwriter: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    try {
      // Example API call for Next.js
      // const response = await fetch('/api/releases', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // const result = await response.json();
      // if (response.ok) {
      //   console.log('Success:', result);
      // } else {
      //   console.error('Error:', result);
      // }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
   <div className="flex">
    <SideBar />
     <div className="bg-black">
      <div className="w-full max-w-[700px] p-8 bg-[#161717] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-8">New Release Submission</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <input 
              type="text" 
              id="releaseTitle" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
              placeholder=" "
              value={formData.releaseTitle}
              onChange={handleChange}
            />
            <label 
              htmlFor="releaseTitle" 
              className="absolute left-4 top-3 text-gray-400 transition-all duration-200 transform  peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
            >
              Release Title
            </label>
          </div>
          
          <div className="mb-6 relative">
            <input 
              type="text" 
              id="artistName" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
              placeholder=" "
              value={formData.artistName}
              onChange={handleChange}
            />
            <label 
              htmlFor="artistName" 
              className="absolute left-4 top-3 text-gray-400 transition-all duration-200 transform  peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
            >
              Artist Name
            </label>
          </div>
          
          <div className="mb-6 relative">
            <input 
              type="text" 
              id="featuredArtist" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
              placeholder=" "
              value={formData.featuredArtist}
              onChange={handleChange}
            />
            <label 
              htmlFor="featuredArtist" 
              className="absolute left-4 top-3 text-gray-400 transition-all duration-200 transform peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
            >
              Featured Artist(s)
            </label>
          </div>
          
          <div className="mb-6 relative">
            <input 
              type="text" 
              id="genre" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
              placeholder=" "
              value={formData.genre}
              onChange={handleChange}
            />
            <label 
              htmlFor="genre" 
              className="absolute left-4 top-3 text-gray-400 transition-all duration-200 transform  peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
            >
              Genre
            </label>
          </div>
          
          <div className="mb-6 relative">
            <input 
              type="date" 
              id="releaseDate" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
              placeholder=" "
              value={formData.releaseDate}
              onChange={handleChange}
            />
            <label 
              htmlFor="releaseDate" 
              className="absolute left-4 top-3 text-gray-400 transition-all duration-200 transform  peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
            >
              Release Date
            </label>
          </div>
          
          <div className="mb-6 relative">
            <input 
              type="text" 
              id="songwriter" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
              placeholder=" "
              value={formData.songwriter}
              onChange={handleChange}
            />
            <label 
              htmlFor="songwriter" 
              className="absolute left-4 top-3 text-gray-400 transition-all duration-200 transform  peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
            >
              Songwriter(s)
            </label>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-lime-400 text-gray-900 font-bold rounded-md hover:bg-lime-500 transition-colors duration-200"
          >
            Submit New Release
          </button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default NewReleaseForm;