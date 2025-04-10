import React from 'react'
import SideBar from '../components/SideBar'
import Categories from '../components/Categories'
import Courses from '../components/Courses'
import CourseCard from '../components/CourseCard'

const page = () => {
    return (
        <div className='flex font-poppins'>
            <SideBar />
            <div>
                <div className='grid grid-cols-7 md:mx-10 mt-10'>
                    <div className='col-span-6 md:col-span-4  w-full '>
                        <div className="bg-gradient-to-r rounded-3xl h-[170px] w-[600px] p-5 from-[#F3FCCF] to-[#8FA13B]">
                            <p className='text-white text-2xl font-thin'>Online Course</p>
                            <h2 className='font-bold text-2xl text-black w-[350px] mt-8'>Sharpen  Your Skills With
                                Professional Online Courses</h2>
                        </div>
                        <Courses />
                    </div>

                    <div className='col-span-3 ml-10 mr-5'>
                        <div className=''>
                        <p>Categories</p>
                        <Categories />
                        </div>
                        <CourseCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page