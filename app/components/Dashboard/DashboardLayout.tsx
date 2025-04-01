"use client";
import Image from "next/image";
import Link from "next/link";
import SideBar from "../SideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  name: string;
  image?: string;
}

export default function DashboardLayout({
  children,
  name,
  image,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      {/* Sidebar */}
      <SideBar image={image} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#121212]">
        {/* Header */}
        <header className="p-4 sm:p-6 pb-0">
          <div className="flex flex-col">
            <h1 className="text-[#C2EE03] text-2xl sm:text-3xl font-bold">
              Good Morning, {name}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Your overview is here
            </p>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}