import Image from 'next/image'
import React, { useEffect, useState,  } from 'react'
import { RiBookMarkedLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
  courses?: Course[];
  data?: {
    courses?: Course[];
  } | Course[];
  // Add other potential response properties as needed
  [key: string]: any;
}

const Courses = () => {
  // Properly type the state with the Course interface
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    getCourses();
  }, []);
  const navigate = useRouter()
  const getCourses = async() => {
    const token = localStorage.getItem('token')
    console.log(token);
    
    try {
      setLoading(true);
      // Use process.env to access environment variables
      const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("API Response:", response.data);
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        // If response.data is directly an array of courses
        setCourses(response.data);
      } else if (response.data?.courses && Array.isArray(response.data.courses)) {
        // If response.data has a courses property that is an array
        setCourses(response.data.courses);
      } else if (response.data?.data) {
        // Handle nested data property
        if (Array.isArray(response.data.data)) {
          // If data is an array of courses
          setCourses(response.data.data);
        } else if (response.data.data?.courses && Array.isArray(response.data.data.courses)) {
          // If data contains a courses property that is an array
          setCourses(response.data.data.courses);
        }
      } else {
        // If we can't find an array in expected locations
        console.error("Unexpected API response format:", response.data);
        setError("Couldn't load courses. Unexpected data format.");
        setCourses([]);
      }
    } catch (error: any) {
      console.error("API error:", error);
      setError(error.message || "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div className="text-white">Loading courses...</div>;
  }
  
  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }
  const handleCourse =(id: string) =>{
    console.log(id);  

    navigate.push(`/courses/${id}`)
  }
  return (
    <div>
      {courses.length === 0 ? (
        <div className="text-white">No courses available.</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {courses.map((course: Course) => (
            <div key={course.id} className="mt-10 ">
              <Image width={300} height={300} src={course.thumbnail_url
} alt={`${course.title} image`} />
              <p className='text-white text-[16px] font-[500]'>{course.title}</p>
              <div className='flex gap-2 mt-4 w-[280px]'>
                <div className='flex items-center gap-1 w-[91px]'>
                  <RiBookMarkedLine className='text-[#C2EE03] text-[16px]' />
                  <p className='text-white text-[13px]'>Lessons: {course.lesson}</p>
                </div>
                <div className='flex items-center gap-1'>
                  <IoMdPerson className='text-[#C2EE03] text-[16px]' />
                  <p className='text-white text-[13px]'>Students: {course.student}</p>
                </div>
              </div>
              <div className="flex items-center mt-8 gap-4">
                <button className="bg-lime-400 flex items-center justify-center gap-2 py-1 px-4 text-black rounded-xl font-bold text-sm transition-all hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm"
                onClick={() => handleCourse(course.id)}>
                  Start Course
                  <FaAngleRight size={16} className="font-medium" />
                </button>
                <button className="bg-lime-400 w-10 h-10 rounded-full flex items-center justify-center text-black transition-all hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600 shadow-sm">
                  <FaHeart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Courses