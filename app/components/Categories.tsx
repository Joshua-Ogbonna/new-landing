import React from 'react'
// import { motion } from 'framer-motion' // Framer motion not used, commented out
import Image from 'next/image'

const Categories = () => {
   // Keep static data for now
   const staticCategories = [
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
         {
            id: 5, // Example of more items
            image: '/mixing.png', 
            title: 'Mixing',
        },
         {
            id: 6,
            image: '/mastering.png', 
            title: 'Mastering',
        },
    ]
    
   // TODO: Replace with dynamic data fetching if categories come from API
   // const [categories, setCategories] = useState([]);
   // useEffect(() => { /* Fetch categories */ }, []);

  return (
     // Removed background, padding, fixed height/width - parent handles container styling
    <div className='flex flex-wrap justify-start gap-x-6 gap-y-4'> {/* Use flex-wrap and gap */}
      {
        staticCategories.map((category) => (
          <div key={category.id} className="flex flex-col items-center text-center group cursor-pointer"> {/* Added group and cursor */}
             {/* Slightly smaller, consistent image size */}
            <div className="relative w-16 h-16 mb-1.5 rounded-full overflow-hidden bg-gray-700 group-hover:bg-gray-600 transition-colors flex items-center justify-center"> {/* Added background circle */}
               <Image  
                  width={40} // Smaller icon size within the circle
                  height={40} 
                  src={category.image || '/placeholder-icon.png'} // Add fallback
                  alt={category.title} 
                  className="object-contain" // Use contain if icons shouldn't be cropped
                  onError={(e) => (e.currentTarget.src = '/placeholder-icon.png')} // Handle errors
                />
             </div>
            <p className="text-gray-300 group-hover:text-white text-xs sm:text-sm transition-colors">{category.title}</p> {/* Adjusted text color/size */}
          </div>
        ))
      }
    </div>
  )
}

export default Categories;