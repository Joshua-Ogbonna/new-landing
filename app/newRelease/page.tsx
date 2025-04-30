'use client'
import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import FirstForm from '../components/Form1';
import SecondForm from '../components/Form2';
import { FaBars } from 'react-icons/fa'; 
import toast from 'react-hot-toast'; 
import { useRouter } from 'next/navigation';


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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const router = useRouter();
  
  const handleFirstFormSubmit = (data: ReleaseFormData) => {
    setFormData(data);
    setStep(2);
  };
  
  const handleSecondFormSubmit = (data: CompleteReleaseFormData) => {
    toast.success('Release submitted successfully!');
    router.push('/singles');
  };
  
  const handleBack = () => {
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