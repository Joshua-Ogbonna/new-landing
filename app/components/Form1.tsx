'use client'
import React, { useState, ChangeEvent } from 'react';

interface FormData {
  releaseTitle: string;
  artistName: string;
  featuredArtist: string;
  genre: string;
  releaseDate: string;
  songwriter: string;
  isCover: string;
}

interface FirstFormProps {
  onSubmit: (data: FormData) => void;
}

const FirstForm: React.FC<FirstFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    releaseTitle: '',
    artistName: '',
    featuredArtist: '',
    genre: '',
    releaseDate: '',
    songwriter: '',
    isCover: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value, type, checked, name } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          isCover: name
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='md:w-[700px] md:mx-32 my-10'>
      <div className='w-full bg-[#161717] rounded-3xl p-6 lg:p-12'>
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-8">New Release Submission</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <input 
                type="text" 
                id="releaseTitle" 
                className="w-full px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
                placeholder=" "
                value={formData.releaseTitle}
                onChange={handleChange}
                required
              />
              <label 
                htmlFor="releaseTitle" 
                className="absolute left-4 top-3 text-[#393A3A] transition-all duration-200 transform peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
              >
                Release Title *
              </label>
            </div>
            
            <div className="mb-6 relative">
              <input 
                type="text" 
                id="artistName" 
                className="w-full px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
                placeholder=" "
                value={formData.artistName}
                onChange={handleChange}
                required
              />
              <label 
                htmlFor="artistName" 
                className="absolute left-4 top-3 text-[#393A3A] transition-all duration-200 transform peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
              >
                Artist Name *
              </label>
            </div>
            
            <div className="mb-6 relative">
              <input 
                type="text" 
                id="featuredArtist" 
                className="w-full px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
                placeholder=" "
                value={formData.featuredArtist}
                onChange={handleChange}
              />
              <label 
                htmlFor="featuredArtist" 
                className="absolute left-4 top-3 text-[#393A3A] transition-all duration-200 transform peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
              >
                Featured Artist(s)
              </label>
            </div>
            
            <div className="mb-6 relative">
              <input 
                type="text" 
                id="genre" 
                className="w-[20rem] px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
                placeholder=" "
                value={formData.genre}
                onChange={handleChange}
                required
              />
              <label 
                htmlFor="genre" 
                className="absolute left-4 top-3 text-[#393A3A] transition-all duration-200 transform peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
              >
                Genre *
              </label>
            </div>
            
            <div className="mb-6 relative">
              <input 
                type="date" 
                id="releaseDate" 
                className="w-[20rem] px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
                placeholder=" "
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
              <label 
                htmlFor="releaseDate" 
                className="absolute left-4 top-3 text-[#393A3A] transition-all duration-200 transform peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
              >
                Release Date *
              </label>
            </div>
            
            <div className='w-[500px]'>
              <h1>Song</h1>
              <p className='text-sm my-5'>Before you upload your song, please make sure that files are in an accepted format. Stereo wav files in 24 bit (sample size) with 192 kHz (sample rate) are recommended, but 16 bit (sample size) with 44.1 kHz (sample rate) files are also accepted.</p>
            </div>
            
            <div className="my-6 relative">
              <input 
                type="text" 
                id="songwriter" 
                className="w-full px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
                placeholder=" "
                value={formData.songwriter}
                onChange={handleChange}
                required
              />
              <label 
                htmlFor="songwriter" 
                className="absolute left-4 top-3 text-[#393A3A] transition-all duration-200 transform peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-gray-800 peer-focus:px-1 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1"
              >
                Songwriter(s) *
              </label>
            </div>
            
            <div>
              <h2>Copyright Ownership *</h2>
              <p>Is this a cover of another song?</p>
              <p>
                <input 
                  type="checkbox" 
                  name="yes" 
                  id="cover-yes"
                  className='h-5 w-5 appearance-none rounded border-2 border-[#C2EE03] bg-[#161717] checked:bg-[#161717] checked:border-[#C2EE03] checked:text-lime-400 focus:ring-0'
                  onChange={handleChange}
                  checked={formData.isCover === 'yes'}
                /> <span>Yes</span>
              </p>
              <p>
                <input 
                  type="checkbox" 
                  name="no" 
                  id="cover-no"
                  className="h-5 w-5 appearance-none rounded border-2 border-[#C2EE03] bg-[#161717] checked:bg-[#161717] checked:border-[#C2EE03] checked:text-lime-400 focus:ring-0" 
                  onChange={handleChange}
                  checked={formData.isCover === 'no'}
                /> <span>No</span>
              </p>
            </div>
            
            <button 
              type="submit" 
              className="w-40 py-3 bg-lime-400 text-gray-900 my-5 font-bold rounded-3xl hover:bg-lime-500 transition-colors duration-200" 
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstForm;