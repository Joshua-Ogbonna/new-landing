'use client'
import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import FirstForm from '../components/Form1';
import SecondForm from '../components/Form2';

interface FormData {
  releaseTitle: string;
  artistName: string;
  featuredArtist: string;
  genre: string;
  releaseDate: string;
  songwriter: string;
  isCover: string;
}

interface CompleteFormData extends FormData {
  artwork: File | null;
  musicFile: File | null;
}

const NewReleasePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFirstFormSubmit = (data: FormData) => {
    console.log("First form data submitted:", data);
    setFormData(data);
    setStep(2);
  };

  const handleSecondFormSubmit = (completeData: CompleteFormData) => {
    console.log("Complete submission data:", completeData);
    
    // Here you would typically send all the data to your API
    // Add your API submission logic here
    
    // For demonstration:
    alert("Release submitted successfully!");
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="min-h-screen bg-black text-white font-poppins flex justify-center items-center">
        {step === 1 ? (
          <FirstForm onSubmit={handleFirstFormSubmit} />
        ) : (
          <SecondForm 
            formData={formData as FormData}
            onSubmit={handleSecondFormSubmit} 
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  );
};

export default NewReleasePage;