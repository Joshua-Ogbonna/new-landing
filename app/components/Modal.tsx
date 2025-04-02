// components/Modal.tsx
import { FC } from 'react';
import { FaTimes } from "react-icons/fa";
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: {
    id: string;
    cover: string;
    title: string;
    artist: string;
    year: string;
  }
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, song }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted');
  };
console.log(song);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Backdrop */}
    <div 
      className="fixed inset-0 bg-black/25 backdrop-blur-md transition-opacity" 
      onClick={onClose}
    />
    
    {/* Modal content */}
    <div className="bg-zinc-900 rounded-xl p-8 z-10 relative max-w-3xl w-full mx-4 shadow-2xl border border-zinc-800">
      <button 
        className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <FaTimes size={24} />
      </button>

      <h2 className="text-2xl font-bold text-white mb-6">New Release</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Album Art Section */}
        <div className="md:w-1/3">
         <div>
          <Image src={song.cover} width={900} height={900} alt='album art' />
         </div>
          <button className="bg-[#C2EE03] text-black w-full font-semibold rounded-lg mt-4 p-3 hover:bg-[#b2dd03] transition-colors">
          Change Artwork
          </button>
        </div>

        {/* Form Section */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium text-white">
               
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder=" Release Title"
                className="w-full p-3 bg-zinc-800 text-white rounded-lg border-2 border-zinc-700 focus:border-[#C2EE03] focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="featured" className="block font-medium text-white">
              
              </label>
              <input
                type="text"
                id="featured"
                name="featured"
                placeholder="  Featured Artist"
                className="w-full p-3 bg-zinc-800 text-white rounded-lg border-2 border-zinc-700 focus:border-[#C2EE03] focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="genre" className="block font-medium text-white">
              
              </label>
              <select
                id="genre"
                name="genre"
                className="w-full p-3 bg-zinc-800 text-white rounded-lg border-2 border-zinc-700 focus:border-[#C2EE03] focus:outline-none transition-colors appearance-none"
                required
              >
                <option value="">  Genre</option>
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
              <label htmlFor="year" className="block font-medium text-white">
             
              </label>
              <input
                type="number"
                id="year"
                name="year"
                min="1900"
                max="2030"
                placeholder="Year of Release"
                className="w-full p-3 bg-zinc-800 text-white rounded-lg border-2 border-zinc-700 focus:border-[#C2EE03] focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#C2EE03] text-black font-bold rounded-lg hover:bg-[#b2dd03] transition-colors shadow-lg shadow-[#C2EE03]/20"
              >
                Submit Release
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
 
  );
};

export default Modal;