import React from 'react'
import SideBar from '../components/SideBar'
import Image from 'next/image'
import EarningsBar from '../components/EarningsBar'
import TransactionTable from '../components/TransactionHistory'
import TopSec from '../components/TopSec'
const page = () => {
      // Sample data for the chart
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 200 },
    { name: 'Jul', value: 300 },
    { name: 'Aug', value: 500 },
    { name: 'Sep', value: 100 },
    // { name: 'Oct', value: 900 },
    // { name: 'Nov', value: 900 },
    // { name: 'Dec', value: 900 },
  ];
    return (
        <div>
            <div className="flex font-poppins">
                <SideBar />

                <div className='grid grid-cols-6 w-full md:mx-20 mt-10'>
                    <div className='col-span-6 md:col-span-4'>
                        <TopSec />
                       <div className='bg-[#161717] m-6 rounded-2xl'>
                       <EarningsBar
                         data={data} 
                         xAxisDataKey="name" 
                         barDataKey="value" 
                         barColor="#313133" 
                         hoverColor="#C2EE03" 
                         title="Monthly Sales Data"
                         borderRadius={12}
                        />
                       </div>
                       <section>
                     <TransactionTable />
                       </section>
                    </div>
                    <div className=' col-span-2 '>
                        <div className=' md:w-[400px] h-[120px]'>
                            <div className='bg-[#161717] w-[300px] md:w-full mx-4 md:mx-0 my-3 px-7 rounded-2xl flex p-6 gap-4 items-center'>
                                <div className='bg-[#4F4F4F] w-20 p-3 h-20 flex items-center justify-center rounded-full'>
                                    <Image width={40} height={40} alt='moneybag' src='/moneybag.png' />
                                </div>
                                <div>
                                    <p className='text-[#C2EE03]'>My Balance</p>
                                    <p className='text-2xl text-white'>$12,750</p>
                                </div>
                            </div>
                            <div className=''>
                                <button className="md:w-full p-3 bg-[#C2EE03] text-[#0E0E0E] flex items-center justify-center space-x-2 my-3 font-bold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#C2EE03] rounded-3xl w-[300px] mx-3 ">Withdraw</button>
                            </div>
                        </div>
                        <section className='bg-[#161717] px-3 pt-3 max-h-full mt-20 w-[330px] md:w-[400px] mx-3 rounded-2xl'>
                            <p className='text-white text-xl font-semibold mb-8'>Transaction Origin</p>
                            <table className=' text-sm'>
                                <thead>
                                    <tr className='h-12 border-t-[#313133] border-t'>
                                        <th className=''>Origin</th>
                                        <th className='pr-5'>Company</th>
                                        <th className='pr-5'>Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody className='text-white'>
                                    <tr className='p-3 h-12 border-t-[#313133] border-t'>
                                        <td className='pr-5'>Jane Cooper</td>
                                        <td className='pr-5'>Microsoft</td>
                                        <td className='pr-5'>(225) 555-0118</td>
                                    </tr>
                                    <tr className='p-3 h-12 border-t-[#313133] border-t'>
                                        <td className='pr-5'>Jane Cooper</td>
                                        <td className='pr-5'>Microsoft</td>
                                        <td className='pr-5'>(225) 555-0118</td>
                                    </tr>
                                    <tr className='p-3 h-12 border-t-[#313133] border-t'>
                                        <td className='pr-5'>Jane Cooper</td>
                                        <td className='pr-5'>Microsoft</td>
                                        <td className='pr-5'>(225) 555-0118</td>
                                    </tr>
                                    <tr className='p-3 h-12 border-t-[#313133] border-t'>
                                        <td className='pr-5'>Jane Cooper</td>
                                        <td className='pr-5'>Microsoft</td>
                                        <td className='pr-5'>(225) 555-0118</td>
                                    </tr>
                                    <tr className='p-3 h-12 border-t-[#313133] border-t'>
                                        <td className='pr-5'>Jane Cooper</td>
                                        <td className='pr-5'>Microsoft</td>
                                        <td className='pr-5'>(225) 555-0118</td>
                                    </tr>
                                    <tr className='p-3 h-12 border-t-[#313133] border-t'>
                                        <td className='pr-5'>Jane Cooper</td>
                                        <td className='pr-5'>Microsoft</td>
                                        <td className='pr-5'>(225) 555-0118</td>
                                    </tr>
                                    <tr className='p-3 h-12 border-t-[#313133] border-t'>
                                        <td className='pr-5'>Jane Cooper</td>
                                        <td className='pr-5'>Microsoft</td>
                                        <td className='pr-5'>(225) 555-0118</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default page