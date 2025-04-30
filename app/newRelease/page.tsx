'use client'
import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import FirstForm from '../components/Form1';
import SecondForm from '../components/Form2';
import { FaBars } from 'react-icons/fa'; // Import menu icon for mobile

// Renamed from FormData to ReleaseFormData to avoid collision
interface ReleaseFormData {
  releaseTitle: string;
  artistName: string;
  featuredArtist: string;
  genre?: string; // Make genre optional to match Form1
  releaseDate: string;
  songwriter: string;
  isCover: string;
  category: string,
  contentType: string
}

// Updated to extend the renamed interface
interface CompleteReleaseFormData extends ReleaseFormData {
  artwork: File | null;
  musicFile: File | null;
}

const NewReleasePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReleaseFormData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  
  // Updated parameter type
  const handleFirstFormSubmit = (data: ReleaseFormData) => {
    console.log("First form data submitted:", data);
    setFormData(data);
    setStep(2);
  };
  
  // Updated parameter type
  const handleSecondFormSubmit = (data: CompleteReleaseFormData) => {
    console.log("Complete submission data (from Form2 via parent):", data);
    // The actual API submission is handled within Form2's handleSubmit,
    // triggered by SongService.createSong.
    // This handler is mainly for reacting after successful submission in Form2.
    alert("Release submitted successfully! (Parent notified)");
    // Optionally redirect or reset the entire flow here
    // setStep(1);
    // setFormData(null); // Reset form state
  };
  
  const handleBack = () => {
    // When going back, keep the existing formData
    setStep(1); 
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white font-poppins">
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64"> 
          {/* Mobile Top Bar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center px-4 z-40">
             <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white mr-4">
                <FaBars size={24} />
             </button>
             <span className="font-semibold">New Release</span>
          </div>

          {/* Scrollable Form Area */} 
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8">
            {/* Form Title (Optional, shown above the form) */}
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {step === 1 ? 'Step 1: Release Details' : 'Step 2: Upload Files'}
            </h1> */}

             {/* Form Container (centers form content on page, max width) */} 
             <div className="max-w-3xl mx-auto"> 
                {step === 1 ? (
                  <FirstForm 
                    onSubmit={handleFirstFormSubmit} 
                    initialData={formData} // Pass existing data to Form1
                  />
                ) : (
                  <SecondForm 
                    // Pass the formData from the parent state (ensure it's not null)
                    formData={formData || { releaseTitle: '', artistName: '', featuredArtist: '', releaseDate: '', songwriter: '', isCover: 'no', category: '', contentType: '' }} 
                    onSubmit={handleSecondFormSubmit}
                    onBack={handleBack}
                  />
                )}
             </div>
          </main>
      </div>
    </div>
  );
};

export default NewReleasePage;