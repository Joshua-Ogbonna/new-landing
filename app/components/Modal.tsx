// components/Modal.tsx
import { FC, } from 'react';

import { FaPlus } from "react-icons/fa6";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="bg-black rounded-lg p-6 z-10 relative max-w-md w-full">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
<div className='flex gap-10'>
{/* image div */}

              <div className='relative h-[15rem]'>
                <div className='border-4 border-solid border-[#C2EE03] rounded-lg p-10 text-center'>
                  <FaPlus className='font-semibold text-[90px]' />
                </div>
                <p className='bg-[#C2EE03] text-black w-full font-semibold rounded-xl my-5 text-center p-2'>Add Album Art</p>
              </div>
            </div>
            {/* form div */}
            <div>
            <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium text-gray-700">
            Release Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 rounded focus:outline-none focus:ring"
            style={{ border: '2px solid #C2EE03' }}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="featured" className="block font-medium text-gray-700">
            Featured Name
          </label>
          <input
            type="text"
            id="featured"
            name="featured"
            className="w-full p-2 rounded focus:outline-none focus:ring"
            style={{ border: '2px solid #C2EE03' }}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="genre" className="block font-medium text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            className="w-full p-2 rounded focus:outline-none focus:ring"
            style={{ border: '2px solid #C2EE03' }}
            required
          >
            <option value="">Select a genre</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="hiphop">Hip Hop</option>
            <option value="electronic">Electronic</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            <option value="rnb">R&B</option>
            <option value="country">Country</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="year" className="block font-medium text-gray-700">
            Year of Release
          </label>
          <input
            type="number"
            id="year"
            name="year"
            min="1900"
            max="2030"
            className="w-full p-2 rounded focus:outline-none focus:ring"
            style={{ border: '2px solid #C2EE03' }}
            required
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:ring"
            style={{ borderBottom: '3px solid #C2EE03' }}
          >
            Submit Release
          </button>
        </div>
      </form>
            </div>
</div>
   
      </div>
 
  );
};

export default Modal;