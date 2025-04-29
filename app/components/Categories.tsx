import React from 'react'
import { motion } from 'framer-motion' // Correct import if you want to use framer-motion
import Image from 'next/image'

const Categories = () => {
   const courses = [
        {
            id: 1,
            image: '/marketing.png',
            title: 'Marketing',
        },
        {
            id: 2,
            image: '/promotion.png',
            title: 'Promotion',
        },
        {
            id: 3,
            image: '/scaling.png',
            title: 'Scaling',
        },
        {
            id: 4,
            image: '/perfomance.png',
            title: 'Performance',
        },
    ]
  return (
    <div className='bg-[#161717] mt-2 md:w-[480px] h-[120px] rounded-3xl p-4 flex items-center justify-around'>
      {
        courses.map((course) => (
          <div key={course.id} className="flex flex-col items-center">
            <Image  width={300} height={300} src={course.image} alt={course.title} className="w-20 h-20 mb-2" />
            <p className="text-white text-sm">{course.title}</p>
          </div>
        ))
      }         
    </div>
  )
}

export default Categories