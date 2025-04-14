// CourseCard.jsx
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { RiBookMarkedLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
export default function CourseCard() {
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




  ]
  return (
    <div>
      {
        courses.map((course) => (
          <div key={course.id} className="mt-10">
            <div className="max-w-6xl mt-10  overflow-hidden rounded-lg bg-[#1e1e1e] text-white flex">
              {/* Left side - Course Image */}
              <div className="w-1/2 relative">
                <Image
                  src={course.image}
                  alt="Student studying on laptop"
                  width={400}
                  height={220}
                  className="object-cover h-full w-full"
                />
              </div>

              {/* Right side - Course Info */}
              <div className="w-1/2 p-4 flex flex-col justify-between">
                {/* Course Title */}
                <div>
                  <h3 className="text-sm font-medium mb-2">{course.title}</h3>

                  {/* Course Stats */}
                  <div className='flex gap-2 my-6 w-[280px]'>
                    <div className='flex items-center gap-1 w-[91px]'>
                      <RiBookMarkedLine className='text-[#C2EE03] text-[16px]' />
                      <p className='text-white text-[13px]'>lessons: {course.lesson}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <IoMdPerson className='text-[#C2EE03] text-[16px]' />
                      <p className='text-white text-[12px]'>Student: {course.student}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar Section */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Points : 75 / 100</span>
                    <span>Days : 56</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-800 h-1">
                    <div className="bg-[#c2ee03] h-1 w-3/4"></div>
                  </div>
                </div>

                {/* Tutor and Action Button */}
                <div className="flex justify-between items-center">
                  {/* Tutor Info */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-sm overflow-hidden mr-2">
                      <Image
                        src="/tutpic.png"
                        alt="Tutor Jo Dash"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Jo Dash</p>
                      <p className="text-xs text-gray-400">Tutor</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="bg-[#c2ee03] text-black font-medium py-2 px-2 rounded-md flex items-center">
                    Let's Go
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}