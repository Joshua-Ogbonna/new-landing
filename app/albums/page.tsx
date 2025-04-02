"use client"
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import SideBar from "../components/SideBar";
import { useState } from "react";
import Modal from "../components/Modal";
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
  {
    id: '7',
    cover: '/cover4.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  },
  {
    id: '8',
    cover: '/cover2.png',
    title: 'Dance with me',
    artist: 'Daniel the entertainer',
    year: '2024'
  }
]
const Page = () => {
 //modal 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
   <div className="flex gap-8">
    <SideBar />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:grid-cols-4 ">
        {
          songs.map((song)=>(
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
                              <FaEdit onClick={openModal} size={20} className='text-[#C2EE03]'/>
                              <Modal  isOpen={isModalOpen} onClose={closeModal} song={song} />
                            </div>
                          </div>
          ))
        }
    </div>
   </div>
  )
}

export default Page