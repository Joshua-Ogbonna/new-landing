"use client"
// import { useState } from "react";
 import { Download } from "lucide-react";


export default function TransactionTable() {
  // Sample transaction data
  const transactions = [
    {
      id: "TRX-5678-ABCD",
      description: "Spotify Subscription",
      type: "Debit",
      card: " 4321 ****",
      date: "2025-04-08",
      amount: "$249.99",
      receipt: "receipt_5678.pdf"
    },
    {
      id: "TRX-1234-EFGH",
      description: "Freepik Sales",
      type: "Credit",
      card: "  8765 ****",
      date: "2025-04-07",
      amount: "$87.45",
      receipt: "receipt_1234.pdf"
    },
    {
      id: "TRX-9012-IJKL",
      description: "Mobile Service",
      type: "Credit",
      card: "  4321 ****",
      date: "2025-04-05",
      amount: "$14.99",
      receipt: "receipt_9012.pdf"
    },
    {
      id: "TRX-3456-MNOP",
      description: "Mobile Service",
      type: "Debit",
      card: "  9876 ****",
      date: "2025-04-03",
      amount: "$68.50",
      receipt: "receipt_3456.pdf"
    },
    {
      id: "TRX-7890-QRST",
      description: "Freepik Sales",
      type: "Credit",
      card: "  8765 ****",
      date: "2025-04-01",
      amount: "$35.25",
      receipt: "receipt_7890.pdf"
    }
  ];

  // Function to handle download (mock functionality)
  const handleDownload = (receipt: string) => {
    alert(`Downloading receipt: ${receipt}`);
    // In a real application, this would trigger the actual file download
  };

  return (
    <div className="bg-[#161717] p-6 rounded-2xl shadow-md max-w-6xl mx-auto">
      <p className='text-2xl text-white'>Recent Transactions</p>
      <p className='text-[rgb(194,238,3)]'>All Transactions</p>
      
      {/* Responsive table container with horizontal scroll for small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr className=" text-[#666666] text-left">
              <th className="py-3 px-4 font-semibold">Description</th>
              <th className="py-3 px-4 font-semibold">Transaction ID</th>
              <th className="py-3 px-4 font-semibold">Type</th>
              <th className="py-3 px-4 font-semibold">Card</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-white">
                <td className="py-3 px-4">{transaction.description}</td>
                <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                <td className="py-3 px-4">
                {transaction.type}
                </td>
                <td className="py-3 px-4">{transaction.card}</td>
                <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="py-3 px-4 font-medium">
                <span className={`px-2 py-1 rounded-full text-md font-medium ${
                    transaction.type === "Credit" 
                      ? " text-[#16DBAA]" 
                      : " text-[#FE5C73]"
                  }`}>
                    {transaction.amount}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => handleDownload(transaction.receipt)}
                    className="flex items-center gap-1 text-[#C2EE03]"
                  >
                    <span className="text-sm border border-solid  border-[#C2EE03] p-2 rounded-3xl">Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}