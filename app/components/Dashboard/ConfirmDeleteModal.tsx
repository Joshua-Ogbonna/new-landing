'use client';

import React, { useState } from 'react';
import { FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>; // Make confirm async to handle loading state
  itemName: string; // Item name to display (e.g., album title)
  itemType: string; // Added itemType prop
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    itemName, 
    itemType // Destructure itemType
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onConfirm();
      // onClose(); // Let the parent handle closing on success
    } catch (err: any) { // Catch errors from the onConfirm promise
        console.error("Error during confirmation:", err);
        setError(err.message || "An error occurred during deletion.");
        setIsLoading(false); // Stop loading only if confirm action throws error
    } 
    // Don't set loading false here if successful, parent might close modal first
  };

  // Reset state when closing externally
  React.useEffect(() => {
      if (!isOpen) {
          setIsLoading(false);
          setError(null);
      }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="bg-[#1F1F1F] rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Optional: Close button */}
        {/* <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <FaTimes size={20} />
        </button> */} 

        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-2xl mr-3 flex-shrink-0" />
          <h2 className="text-xl font-semibold text-white">Confirm Deletion</h2>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <p className="text-gray-300 mb-6">
          Are you sure you want to delete the {itemType} "<span className="font-medium text-white">{itemName}</span>"? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose} // Simply close the modal
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-150 disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClick}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal; 