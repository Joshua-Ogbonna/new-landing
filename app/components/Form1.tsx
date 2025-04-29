'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
interface FormData {
  releaseTitle: string;
  artistName: string;
  featuredArtist: string;
  releaseDate: string;
  songwriter: string;
  isCover: string;
  category: string,
  contentType: string
}
type Category = {
  id: number;
  name: string;

};
type ContentType = {
  id: number;
  name: string;

};
interface FirstFormProps {
  onSubmit: (data: FormData) => void;
}

const FirstForm: React.FC<FirstFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    releaseTitle: '',
    artistName: '',
    featuredArtist: '',
    releaseDate: '',
    songwriter: '',
    isCover: '',
    category: '',
  contentType: ''
  });
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [contentType, setCotentType] = useState<ContentType[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  useEffect(() => {
    // fetch these two api
    fechCategories()
    fechContentType()

  }, [])
  useEffect(() => {
    if (contentType) {
      console.log("Updated contentType:", contentType);
    }
  }, [contentType]);

  useEffect(() => {
    if (categories) {
      console.log("Updated categories:", categories);
    }
  }, [categories]);

  const fechContentType = async () => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/content-types`)
      setCotentType(response.data.data)
      // console.log(contentType);
      return response.data
    }
    catch (error) {
      console.error("Error creating song:", error);
      throw error;
    }
  }
  const fechCategories = async () => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      setCategories(response.data.data)
      // console.log(categories);
      return response.data
    }
    catch (error) {
      console.error("Error creating song:", error);
      throw error;
    }
  }
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
  const handleCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected value:", e.target.value);
    const value = e.target.value;
    setSelectedCategory(value);

  setFormData((prev) => ({
    ...prev,
    category: value,
  }));
    
  };
  const handleContent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected value:", e.target.value);
    const value = e.target.value;
    setSelectedContent(value);
    setFormData((prev) => ({
      ...prev,
      contentType: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
    
  };

  return (
    <div className='w-full px-4 sm:px-6 md:w-[700px] md:mx-auto lg:mx-32 my-10'>
      <div className='w-full bg-[#161717] rounded-3xl p-4 sm:p-6 lg:p-12'>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">New Release Submission</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <input
                type="text"
                id="releaseTitle"
                className="w-full px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer"
                placeholder=""
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
                placeholder=""
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
                placeholder=""
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

            {/* <div className="mb-6 relative">
          <input 
            type="text" 
            id="genre" 
            className="w-full sm:w-[20rem] px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer" 
            placeholder=""
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
        </div> */}
        <div className="flex gap-8">
        <div className="mb-6 relative">
              <select
                name="Categories"
                className="bg-[#161717] pr-20 text-white opacity-80 border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer py-2"
                onChange={handleCategories}
              >
                <option value="" disabled selected className="text-white/60">
                  Categories
                </option>
                {categories ? (
                  categories.map((data) => (
                    <option
                      key={data.id}
                      value={data.id}
                      className="text-xl text-lime-400 bg-transparent"
                    >
                      {data.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No data</option>
                )}
              </select>


            </div>
            <div className="mb-6 relative">
              <select
                name="Categories"
                className="bg-[#161717] pr-20 text-white opacity-80 border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer py-2"
                onChange={handleContent}
              >
                <option value="" disabled selected className="text-white/60">
                Content Type
                </option>
                {contentType ? (
                  contentType.map((data) => (
                    <option
                      key={data.id}
                      value={data.id}
                      className="text-xl text-lime-400 bg-transparent"
                    >
                      {data.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No data</option>
                )}
              </select>


            </div>
        </div>
            <div className="mb-6 relative">
              <input
                type="date"
                id="releaseDate"
                className="w-full sm:w-[20rem] px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer"
                placeholder=""
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

            <div className='w-full sm:w-[500px]'>
              <h1 className="text-lg sm:text-xl mb-2">Song</h1>
              <p className='text-xs sm:text-sm my-3 sm:my-5'>Before you upload your song, please make sure that files are in an accepted format. Stereo wav files in 24 bit (sample size) with 192 kHz (sample rate) are recommended, but 16 bit (sample size) with 44.1 kHz (sample rate) files are also accepted.</p>
            </div>

            <div className="my-6 relative">
              <input
                type="text"
                id="songwriter"
                className="w-full px-4 py-3 bg-[#161717] border border-[#C2EE0347] rounded-md focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 peer"
                placeholder=""
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

            <div className="mb-6">
              <h2 className="text-base sm:text-lg mb-2">Copyright Ownership *</h2>
              <p className="mb-2 text-sm">Is this a cover of another song?</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="yes"
                    id="cover-yes"
                    className='h-5 w-5 appearance-none rounded border-2 border-[#C2EE03] bg-[#161717] checked:bg-[#161717] checked:border-[#C2EE03] checked:text-lime-400 focus:ring-0 mr-2'
                    onChange={handleChange}
                    checked={formData.isCover === 'yes'}
                  />
                  <span>Yes</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="no"
                    id="cover-no"
                    className="h-5 w-5 appearance-none rounded border-2 border-[#C2EE03] bg-[#161717] checked:bg-[#161717] checked:border-[#C2EE03] checked:text-lime-400 focus:ring-0 mr-2"
                    onChange={handleChange}
                    checked={formData.isCover === 'no'}
                  />
                  <span>No</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                className="w-full sm:w-40 py-3 bg-lime-400 text-gray-900 my-5 font-bold rounded-3xl hover:bg-lime-500 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstForm;