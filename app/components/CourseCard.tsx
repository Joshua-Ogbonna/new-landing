// CourseCard.jsx
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { div } from 'framer-motion/client';

export default function CourseCard() {
  return (
        <div>
              <div className="max-w-6xl mt-10 mx-auto overflow-hidden rounded-lg bg-[#1e1e1e] text-white flex">
      {/* Left side - Course Image */}
      <div className="w-1/2 relative">
        <Image 
          src="/course3.png" 
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
          <h3 className="text-lg font-medium mb-2">Google Ads Training 2021: Profit With Pay</h3>
          
          {/* Course Stats */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">📚</span>
              </div>
              <span className="text-sm">Lesson : 6</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">👥</span>
              </div>
              <span className="text-sm">Student : 198</span>
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
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src="/tutor-profile.jpg" 
                alt="Tutor Jo Dash"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Jo Dash</p>
              <p className="text-xs text-gray-400">Tutor</p>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="bg-[#c2ee03] text-black font-medium px-4 py-2 rounded-md flex items-center">
            Let's Go
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mt-10 mx-auto overflow-hidden rounded-lg bg-[#1e1e1e] text-white flex">
      {/* Left side - Course Image */}
      <div className="w-1/2 relative">
        <Image 
          src="/course3.png" 
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
          <h3 className="text-lg font-medium mb-2">Google Ads Training 2021: Profit With Pay</h3>
          
          {/* Course Stats */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">📚</span>
              </div>
              <span className="text-sm">Lesson : 6</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">👥</span>
              </div>
              <span className="text-sm">Student : 198</span>
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
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src="/tutor-profile.jpg" 
                alt="Tutor Jo Dash"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Jo Dash</p>
              <p className="text-xs text-gray-400">Tutor</p>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="bg-[#c2ee03] text-black font-medium px-4 py-2 rounded-md flex items-center">
            Let's Go
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mt-10 mx-auto overflow-hidden rounded-lg bg-[#1e1e1e] text-white flex">
      {/* Left side - Course Image */}
      <div className="w-1/2 relative">
        <Image 
          src="/course3.png" 
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
          <h3 className="text-lg font-medium mb-2">Google Ads Training 2021: Profit With Pay</h3>
          
          {/* Course Stats */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">📚</span>
              </div>
              <span className="text-sm">Lesson : 6</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">👥</span>
              </div>
              <span className="text-sm">Student : 198</span>
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
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src="/tutor-profile.jpg" 
                alt="Tutor Jo Dash"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Jo Dash</p>
              <p className="text-xs text-gray-400">Tutor</p>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="bg-[#c2ee03] text-black font-medium px-4 py-2 rounded-md flex items-center">
            Let's Go
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mt-10 mx-auto overflow-hidden rounded-lg bg-[#1e1e1e] text-white flex">
      {/* Left side - Course Image */}
      <div className="w-1/2 relative">
        <Image 
          src="/course3.png" 
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
          <h3 className="text-lg font-medium mb-2">Google Ads Training 2021: Profit With Pay</h3>
          
          {/* Course Stats */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">📚</span>
              </div>
              <span className="text-sm">Lesson : 6</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">👥</span>
              </div>
              <span className="text-sm">Student : 198</span>
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
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src="/tutor-profile.jpg" 
                alt="Tutor Jo Dash"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Jo Dash</p>
              <p className="text-xs text-gray-400">Tutor</p>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="bg-[#c2ee03] text-black font-medium px-4 py-2 rounded-md flex items-center">
            Let's Go
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mt-10 mx-auto overflow-hidden rounded-lg bg-[#1e1e1e] text-white flex">
      {/* Left side - Course Image */}
      <div className="w-1/2 relative">
        <Image 
          src="/course3.png" 
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
          <h3 className="text-lg font-medium mb-2">Google Ads Training 2021: Profit With Pay</h3>
          
          {/* Course Stats */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">📚</span>
              </div>
              <span className="text-sm">Lesson : 6</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#c2ee03] w-4 h-4 flex items-center justify-center rounded-sm mr-2">
                <span className="text-black text-xs">👥</span>
              </div>
              <span className="text-sm">Student : 198</span>
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
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src="/tutor-profile.jpg" 
                alt="Tutor Jo Dash"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Jo Dash</p>
              <p className="text-xs text-gray-400">Tutor</p>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="bg-[#c2ee03] text-black font-medium px-4 py-2 rounded-md flex items-center">
            Let's Go
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
        </div>
  );
}