"use client"
import { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import Modal from '../components/Modal';

interface Song {
  id: string;
  cover: string;
  title: string;
  artist: string;
  year: string;
}

const songs: Song[] = [
  {
    id: '1',
    cover: '/cover1.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  },
  {
    id: '2',
    cover: '/cover2.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  },{
    id: '3',
    cover: '/cover3.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  },
  {
    id: '4',
    cover: '/cover4.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  },
  {
    id: '5',
    cover: '/cover5.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  },
  {
    id: '6',
    cover: '/cover6.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  },
]

const Page = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 3; // Show 3 songs per page

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem("userId");
      const storedUserToken = localStorage.getItem("token")
      setUserId(storedUserId);
      setUserToken(storedUserToken)
    }
  }, [])
console.log(userId, userToken);

  // Calculate pagination
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //modal 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="flex font-poppins  bg-black text-white overflow-hidden">
      <SideBar />
      <div className='w-full px-20'>
        <div className=''>
          {/* topline */}
          <div className='flex items-center mt-10 gap-6'>
            <p className='text-xl'>Singles</p>
            <div className='w-[50vw] h-0 border-t-4 border-solid border-[#161717]'></div>
            <div className='flex gap-5'>
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <FaAngleLeft size={10} className='text-[#C2EE03] rounded-full h-6 border-4 border-[#C2EE03] border-solid w-6'/>
              </button>
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <FaAngleRight size={10} className='text-[#C2EE03] rounded-full h-6 border-4 border-[#C2EE03] border-solid w-6'/>
              </button>
            </div>
          </div>
          
          {/* cards section */}
          <div className='grid grid-cols-4 gap-8'>
            {currentSongs.map((song) => (
              <div key={song.id} className='bg-[#161717] rounded-lg shadow-md overflow-hidden w-72 transition-transform duration-300 hover:scale-105 my-10'>
                <div className='relative h-60 w-full'>
                  <Image 
                    src={song.cover} 
                    alt='cover of song' 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  />
                </div>
                <div className='p-4 font-poppins'>
                  <p className='font-semibold text-base'>{song.title}</p>
                  <p className='text-[#C2EE03]'>{song.year}</p>
                </div>
                <div className='flex justify-between p-4'>
                  <FaRegTrashAlt size={20} className='text-red-700'/>
                  <FaEdit  onClick={openModal} size={20} className='text-[#C2EE03]' />
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} song={song} />
              </div>
              
            ))}
            <div className="relative h-[23rem] w-72 bg-[#161717] rounded-lg shadow-md mt-10 flex items-center justify-center">
              <div>
                <div className='border-4 border-solid border-[#C2EE03] rounded-lg p-10 text-center'>
                  <FaPlus className='font-semibold text-[90px]' />
                </div>
                <p className='text-[#C2EE03] text-center pt-4'>Add</p>
              </div>
            </div>
          </div>
          
          {/* pagination info */}
          <div className='flex gap-5 items-center'>
            <div className='w-[56vw] h-0 border-t-4 border-solid border-[#161717]'></div>
            <div className='flex gap-5 items-center'>
              <div className=' text-base text-[#C2EE03] font-poppins'>
                <Link href="/songs" >see more</Link>
              </div>
            </div>
          </div>
        </div>
      {/* albums section  */}
      <div className=''>
          {/* topline */}
          <div className='flex items-center mt-10 gap-6'>
            <p className='text-xl'>Albums</p>
            <div className='w-[50vw] h-0 border-t-4 border-solid border-[#161717]'></div>
            <div className='flex gap-5'>
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <FaAngleLeft size={10} className='text-[#C2EE03] rounded-full h-6 border-4 border-[#C2EE03] border-solid w-6'/>
              </button>
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <FaAngleRight size={10} className='text-[#C2EE03] rounded-full h-6 border-4 border-[#C2EE03] border-solid w-6'/>
              </button>
            </div>
          </div>
          
          {/* cards section */}
          <div className='grid grid-cols-4 gap-8'>
            {currentSongs.map((song) => (
              <div key={song.id} className='bg-[#161717] rounded-lg shadow-md overflow-hidden w-72 transition-transform duration-300 hover:scale-105 my-10'>
                <div className='relative h-60 w-full'>
                  <Image 
                    src={song.cover} 
                    alt='cover of song' 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  />
                </div>
                <div className='p-4 font-poppins'>
                  <p className='font-semibold text-base'>{song.title}</p>
                  <p className='text-[#C2EE03]'>{song.year}</p>
                </div>
                <div className='flex justify-between p-4'>
                  <FaRegTrashAlt size={20} className='text-red-700'/>
                  <FaEdit  onClick={openModal} size={20} className='text-[#C2EE03]'/>
                </div>
              </div>
            ))}
            <div className="relative h-[23rem] w-72 bg-[#161717] rounded-lg shadow-md mt-10 flex items-center justify-center">
              <div>
                <div className='border-4 border-solid border-[#C2EE03] rounded-lg p-10 text-center'>
                  <FaPlus className='font-semibold text-[90px]' />
                </div>
                <p className='text-[#C2EE03] text-center pt-4'>Add</p>
              </div>
            </div>
          </div>

        

    
          
          {/* pagination info */}
          <div className='flex gap-5 items-center mb-10'>
            <div className='w-[56vw] h-0 border-t-4 border-solid border-[#161717]'></div>
            <div className='flex gap-5 items-center'>
              <div className=' text-base text-[#C2EE03] font-poppins'>
                <Link href="/albums" >see more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Page