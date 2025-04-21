import React from 'react'

const TopSec = () => {
    return (
        <div>
            <div className='flex flex-col ml-6 md:ml-10 gap-11 lg:flex-row'>
                <div className="relative w-full mt-14 md:mt-0">
                    {/* Container with only 2 cards visible on mobile */}
                    <div className="grid grid-flow-col auto-cols-[150px] md:grid-cols-4 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                        <div className='bg-[#C2EE03] h-[140px] text-base text-black pt-14 text-center rounded-2xl snap-start mx-2 first:ml-0'>
                            <p className=''>Streams</p>
                            <h1 className='font-bold text-xl'>€1500</h1>
                        </div>
                        <div className='bg-[#C2EE03] h-[140px] text-base text-black pt-14 text-center rounded-2xl snap-start mx-2'>
                            <p className=''>Sales</p>
                            <h1 className='font-bold text-xl'>€750</h1>
                        </div>
                        <div className='bg-[#C2EE03] h-[140px] text-base text-black pt-14 text-center rounded-2xl snap-start mx-2'>
                            <p className=''>Merchandise</p>
                            <h1 className='font-bold text-xl'>€6500</h1>
                        </div>
                        <div className='bg-[#C2EE03] h-[140px] text-base text-black pt-14 text-center rounded-2xl snap-start mx-2'>
                            <p className=''>Others</p>
                            <h1 className='font-bold text-xl'>€10,750</h1>
                        </div>
                    </div>

                    {/* Optional scroll indicators */}
                    <div className="flex justify-center gap-2 mt-4 md:hidden">
                        <span className="h-1 w-10 bg-gray-300 rounded-full"></span>
                        <span className="h-1 w-10 bg-gray-300 rounded-full"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopSec