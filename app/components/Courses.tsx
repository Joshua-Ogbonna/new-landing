import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RiBookMarkedLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaAngleRight, FaHeart, FaSpinner } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

// Define the Course interface
interface Course {
  id: string;
  title: string;
  thumbnail_url: string;
  lesson: number;
  student: number;
}

// Define the API response interface
interface ApiResponse {
  courses: Course[]; 
}

const Courses = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getCourses = async () => {
      if (!session?.accessToken) { 
        setLoading(false);
        setError("Authentication required to view courses.");
        console.log("No access token found, skipping course fetch.");
        return; 
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        
        console.log("API Response:", response.data);
        
        if (response.data?.courses && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          console.warn("API response did not contain a 'courses' array:", response.data);
          setCourses([]);
        }
      } catch (err: any) {
        console.error("API error fetching courses:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to load courses";
        setError(errorMessage);
        toast.error(errorMessage);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (session?.accessToken) {
      getCourses();
    } else if (session === null) {
       setLoading(false);
       setError("Please log in to view courses.");
       setCourses([]);
    }

  }, [session]);

  const handleCourseClick = (id: string) => {
    console.log("Navigating to course:", id);
    router.push(`/courses/${id}`);
  }
  
  if (loading) {
    return (
       <div className="flex justify-center items-center py-10">
         <FaSpinner className="animate-spin text-lime-400 mr-2" size={24} />
         <span className="text-white">Loading courses...</span>
       </div>
    );
  }
  
  if (error) {
    return <div className="text-center text-red-400 py-10">Error: {error}</div>;
  }

  return (
    <div>
      {courses.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No courses available at the moment.</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {courses.map((course: Course) => (
            <div key={course.id} className="bg-[#1F1F1F] rounded-lg overflow-hidden shadow-md flex flex-col transition-transform duration-200 hover:scale-105">
              <div className="relative w-full aspect-video">
                 <Image 
                   src={course.thumbnail_url || '/placeholder-image.png'}
                   alt={`${course.title} thumbnail`} 
                   fill
                   className="object-cover"
                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                   onError={(e) => (e.currentTarget.src = '/placeholder-image.png')}
                 />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h4 className='text-white text-base sm:text-lg font-semibold mb-2 line-clamp-2'>{course.title}</h4>
                
                <div className='flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-400 mb-4'>
                  <div className='flex items-center gap-1'>
                    <RiBookMarkedLine className='text-[#C2EE03]' />
                    <span>{course.lesson} Lessons</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <IoMdPerson className='text-[#C2EE03]' />
                    <span>{course.student} Students</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <button 
                     className="bg-lime-400 flex items-center justify-center gap-1.5 py-1.5 px-3 sm:px-4 text-black rounded-md font-semibold text-xs sm:text-sm transition-all hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm"
                     onClick={() => handleCourseClick(course.id)}
                   >
                    Start Course
                    <FaAngleRight />
                  </button>
                  <button 
                     title="Add to favorites"
                     className="bg-gray-700 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lime-400 transition-all hover:bg-gray-600 hover:text-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm"
                   >
                    <FaHeart size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Courses