import Image from 'next/image'
import React from 'react'
import { RiBookMarkedLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
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
        {
            id: 10,
            image: '/course2.png',
            title: 'Digital Marketing Strategy and Implementation',
            lesson: 26,
            student: 8240
        }
    ]
  return (
    <div>
        <div className='grid grid-cols-3 gap-5 justify-between'>
            {
               courses.map((course) => (
                <div key={course.id} className="mt-10">
                    <Image width={300} height={300} src={course.image} alt='course image'/>
                    <p className='text-white text-md '>{course.title}</p>
                   <div className='flex mt-4 w-[280px]'>
                   <div className='flex items-center gap-1'>
                   <RiBookMarkedLine size={20} className='text-[#C2EE03]' />
                   <p className='text-white text-sm'>lessons: {course.lesson}</p>
                   </div>
                   <div  className='flex items-center gap-1'>
                    <IoMdPerson  size={20} className='text-[#C2EE03]' />
                    <p className='text-white text-sm'>Student: {course.student}</p>
                   </div>
                   </div>
                    </div>
               ))
            }
        </div>
    </div>
  )
}

export default Courses