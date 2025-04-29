import Image from 'next/image'
import React from 'react'
import { RiBookMarkedLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const Courses = () => {
    const courses = [
        {
            id: 1,
            image: '/course2.png',
            title: 'Complete Web Development Bootcamp',
            lesson: 42,
            student: 15243
        },
        {
            id: 2,
            image: '/course2.png',
            title: 'Advanced JavaScript: From Zero to Hero',
            lesson: 36,
            student: 8976
        },
        {
            id: 3,
            image: '/course1.png',
            title: 'React.js: Build Modern Web Applications',
            lesson: 28,
            student: 12650
        },
        {
            id: 4,
            image: '/course2.png',
            title: 'Python Programming Masterclass',
            lesson: 45,
            student: 19820
        },
        {
            id: 5,
            image: '/course2.png',
            title: 'Data Science and Machine Learning',
            lesson: 38,
            student: 7430
        },
        {
            id: 6,
            image: '/course1.png',
            title: 'Mobile App Development with Flutter',
            lesson: 32,
            student: 5678
        },
        {
            id: 7,
            image: '/course2.png',
            title: 'UX Design Principles and Best Practices',
            lesson: 24,
            student: 6932
        },
        {
            id: 8,
            image: '/course2.png',
            title: 'Learn Figma - UI/UX Design Essential Training',
            lesson: 22,
            student: 9145
        },
        {
            id: 9,
            image: '/course1.png',
            title: 'Blockchain Development and Cryptocurrency',
            lesson: 30,
            student: 4587
        },
       
    ]
  return (
    <div>
        <div className='grid grid-cols-3 gap-5'>
            {
               courses.map((course) => (
                <div key={course.id} className="mt-10">
                    <Image width={300} height={300} src={course.image} alt='course image'/>
                    <p className='text-white text-[16px] font-[500]'>{course.title}</p>
                   <div className='flex gap-2 mt-4 w-[280px]'>
                   <div className='flex items-center gap-1 w-[91px]'>
                   <RiBookMarkedLine  className='text-[#C2EE03] text-[16px]' />
                   <p className='text-white text-[13px]'>lessons: {course.lesson}</p>
                   </div>
                   <div  className='flex items-center gap-1'>
                    <IoMdPerson className='text-[#C2EE03] text-[16px]' />
                    <p className='text-white text-[13px]'>Student: {course.student}</p>
                   </div>
                   </div>
                   <div className="flex items-center mt-8 gap-4">
      <button className="bg-lime-400 flex items-center justify-center gap-2 py-2 px-4 text-black rounded-xl font-bold text-sm transition-all hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm">
        Start Course
        <FaAngleRight size={16} className="font-medium" />
      </button>
      
      <button className="bg-lime-400 w-10 h-10 rounded-full flex items-center justify-center text-black transition-all hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm">
        <FaHeart size={16} />
      </button>
    </div>
                    </div>
               ))
            }
        </div>
    </div>
  )
}

export default Courses