'use client'; // Add use client as it uses hooks and event handlers

import React, { useState } from 'react'; // Import useState
import SideBar from '../components/SideBar'
import Image from 'next/image'
import EarningsBar from '../components/EarningsBar'
import TransactionTable from '../components/TransactionHistory'
import TopSec from '../components/TopSec'
import { FaBars } from 'react-icons/fa'; // Import menu icon

// Assuming Transaction type if TransactionTable needs it, otherwise remove
interface Transaction {
  id: string;
  origin: string;
  company: string;
  phoneNumber: string;
}

const EarningsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Sample data for Transaction Origin table (replace with API data)
  const originData: Transaction[] = Array(7).fill({
      id: Math.random().toString(),
      origin: 'Jane Cooper',
      company: 'Microsoft',
      phoneNumber: '(225) 555-0118'
  });

  return (
    // Standard Dashboard Layout Structure
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white font-poppins">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64"> 
          {/* Mobile Top Bar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center px-4 z-40">
             <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white mr-4">
                <FaBars size={24} />
             </button>
             <span className="font-semibold">Earnings</span>
          </div>

          {/* Main Content Area */}
          {/* Added standard padding and offset for mobile top bar */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8">
             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">Earnings</h1>
            
             {/* Responsive Grid Layout */}
             <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
                 {/* Left Column (Main Content) */}
                 <div className='lg:col-span-2 space-y-6'>
                     <TopSec />
                    
                     {/* Earnings Chart Card */}
                     <div className='bg-[#161717] rounded-2xl p-4 sm:p-6'>
                       {/* Ensure EarningsBar is responsive or has container queries */}
                       <EarningsBar
                         data={data} 
                         xAxisDataKey="name" 
                         barDataKey="value" 
                         barColor="#313133" 
                         hoverColor="#C2EE03" 
                         title="Monthly Earnings" // Updated title
                         borderRadius={12}
                       />
                     </div>
                     
                     {/* Transaction History Section */}
                     {/* Assuming TransactionTable handles its own styling/card */}
                     <TransactionTable />
                 </div>

                 {/* Right Column (Sidebar Content) */}
                 <div className='lg:col-span-1 space-y-6'>
                    {/* My Balance Card */}
                    <div className='bg-[#161717] rounded-2xl flex p-4 sm:p-6 gap-4 items-center'>
                        <div className='bg-[#4F4F4F] w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full flex-shrink-0'>
                            <Image width={40} height={40} alt='moneybag' src='/moneybag.png' className='w-8 h-8 sm:w-10 sm:h-10' />
                        </div>
                        <div className='overflow-hidden'> {/* Prevent text overflow */}
                            <p className='text-[#C2EE03] text-sm sm:text-base'>My Balance</p>
                            {/* Add loading/actual data state here */}
                            <p className='text-xl sm:text-2xl text-white font-semibold truncate'>$12,750</p> 
                        </div>
                    </div>
                     
                     {/* Withdraw Button */}
                     <button className="w-full p-3 bg-[#C2EE03] text-[#0E0E0E] flex items-center justify-center space-x-2 font-bold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#C2EE03] rounded-3xl">
                         Withdraw
                     </button>
                    
                    {/* Transaction Origin Card */}
                     <section className='bg-[#161717] rounded-2xl p-4 sm:p-6'>
                         <h2 className='text-white text-lg sm:text-xl font-semibold mb-4'>Transaction Origin</h2>
                         {/* Table container for potential overflow */}
                         <div className="overflow-x-auto">
                             <table className='w-full text-sm text-left'>
                                 <thead className='text-gray-400'>
                                     {/* Removed fixed height, adjusted padding */}
                                     <tr className='border-b border-[#313133]'>
                                         <th className='py-3 pr-3 font-medium'>Origin</th>
                                         <th className='py-3 px-3 font-medium'>Company</th>
                                         <th className='py-3 pl-3 font-medium'>Phone Number</th>
                                     </tr>
                                 </thead>
                                 <tbody className='text-white divide-y divide-[#313133]'>
                                     {originData.map((transaction) => (
                                         <tr key={transaction.id} className='hover:bg-[#2a2a2a]/30'>
                                             <td className='py-3 pr-3 truncate'>{transaction.origin}</td>
                                             <td className='py-3 px-3 truncate'>{transaction.company}</td>
                                             <td className='py-3 pl-3 truncate'>{transaction.phoneNumber}</td>
                                         </tr>
                                     ))}
                                     {/* Add case for empty data */} 
                                     {originData.length === 0 && (
                                         <tr>
                                             <td colSpan={3} className="text-center text-gray-500 py-4">No transaction origins found.</td>
                                         </tr>
                                     )}
                                 </tbody>
                             </table>
                         </div>
                     </section>
                 </div>
             </div>
          </main>
      </div>
    </div>
  );
};

export default EarningsPage; // Renamed component