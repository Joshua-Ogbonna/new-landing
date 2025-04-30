// CourseCard.tsx - Displays a single featured/active course
import Image from 'next/image';
// import { ArrowRight } from 'lucide-react'; // Replaced with react-icons
import { RiBookMarkedLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa"; // Using react-icons for consistency
// Removed FaHeart as it's not used here

// Define props if this were dynamic
interface Course {
  id: number; // Changed to number to match static data
  image: string;
  title: string;
  lesson: number;
  student: number;
}

// interface CourseCardProps {
//   course: Course;
//   progress?: { points: number; totalPoints: number; days: number };
//   tutor?: { name: string; image: string };
// }

// Hardcoded data for demonstration - ideally fetch or receive as props
const featuredCourse: Course = {
  id: 1,
  image: '/course2.png',
  title: 'Complete Web Development Bootcamp',
  lesson: 42,
  student: 15243
};

const progressData = {
    points: 75,
    totalPoints: 100,
    days: 56
};

const tutorData = {
    name: "Jo Dash",
    image: "/tutpic.png"
};


export default function CourseCard(/* { course, progress, tutor }: CourseCardProps */) {
    // Use the static data for now
    const course = featuredCourse;
    const progress = progressData;
    const tutor = tutorData;

    if (!course) { // Add a check in case course data is missing
        return <div className="text-gray-500">No featured course data available.</div>;
    }

  // Removed the outer div with margin and the map function
  return (
    // Responsive Card Layout: Stacks vertically on small, horizontal on medium+ 
    <div className="overflow-hidden rounded-lg bg-[#1e1e1e] text-white flex flex-col md:flex-row shadow-md">
        {/* Image Section */}
        <div className="w-full md:w-5/12 relative aspect-video md:aspect-auto md:h-full"> {/* Responsive width and aspect ratio */}
            <Image
            src={course.image || '/placeholder-image.png'} // Fallback
            alt={`${course.title} thumbnail`}
            fill
            className="object-cover" // Cover the container
            sizes="(max-width: 768px) 100vw, 40vw" // Optimized sizes
            onError={(e) => (e.currentTarget.src = '/placeholder-image.png')} // Error handling
            />
        </div>

        {/* Right side - Course Info */}
        <div className="w-full md:w-7/12 p-4 flex flex-col justify-between"> {/* Responsive width and padding */}
            {/* Top part: Title & Stats */}
            <div>
            <h3 className="text-base font-semibold mb-2 line-clamp-2">{course.title}</h3> {/* Standard text size */}

            {/* Course Stats */}
            <div className='flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 my-3'> {/* Removed fixed widths, responsive text, adjusted margin */}
                <div className='flex items-center gap-1'>
                <RiBookMarkedLine className='text-[#C2EE03] text-sm' /> {/* Consistent icon size */}
                <span>{course.lesson} Lessons</span>
                </div>
                <div className='flex items-center gap-1'>
                <IoMdPerson className='text-[#C2EE03] text-sm' /> {/* Consistent icon size */}
                <span>{course.student} Students</span>
                </div>
            </div>
            </div>

            {/* Middle part: Progress Bar Section */}
            {progress && ( // Only show if progress data exists
                 <div className="my-3"> {/* Adjusted margin */}
                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                         <span>Points : {progress.points} / {progress.totalPoints}</span>
                         <span>Days : {progress.days}</span>
                     </div>
                     {/* Progress Bar */}
                     <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"> {/* Thicker bar, rounded */}
                         <div 
                           className="bg-[#c2ee03] h-full rounded-full" 
                           style={{ width: `${(progress.points / progress.totalPoints) * 100}%` }} // Dynamic width
                         ></div>
                     </div>
                 </div>
            )}

            {/* Bottom part: Tutor and Action Button */}
            {tutor && ( // Only show if tutor data exists
                 <div className="flex justify-between items-center mt-auto pt-2"> {/* Pushed to bottom */}
                     {/* Tutor Info */}
                     <div className="flex items-center">
                         <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-600"> {/* Rounded tutor image */}
                             <Image
                                 src={tutor.image || '/placeholder-avatar.png'} // Fallback avatar
                                 alt={tutor.name}
                                 width={32}
                                 height={32}
                                 className="object-cover"
                                 onError={(e) => (e.currentTarget.src = '/placeholder-avatar.png')} // Error handling
                             />
                         </div>
                         <div>
                             <p className="text-sm font-medium leading-tight">{tutor.name}</p>
                             <p className="text-xs text-gray-400 leading-tight">Tutor</p>
                         </div>
                     </div>

                     {/* Action Button */}
                     <button className="bg-[#c2ee03] text-black font-semibold py-1.5 px-3 rounded-md flex items-center gap-1 text-sm transition hover:bg-opacity-80">
                         Let's Go
                         <FaAngleRight size={14} /> {/* Consistent Icon */}
                     </button>
                 </div>
            )}
        </div>
    </div>
  );
}