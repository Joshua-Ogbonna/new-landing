"use client";
import Image from "next/image";
import Link from "next/link";

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
      <div className="w-[60px] sm:w-[80px] bg-[#121212] border-r border-[#2a2a2a] flex flex-col items-center py-4 sm:py-6 space-y-6 sm:space-y-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 rounded-full overflow-hidden">
          <Image
            src={image ?? "/ava.png"}
            alt="Profile"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>

        <nav className="flex flex-col items-center space-y-6 sm:space-y-8">
          <Link
            href="/"
            className="p-2 sm:p-3 rounded-lg hover:bg-black transition-colors group"
          >
            <Image
              src="/home.svg"
              alt="Home"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 [filter:invert(55%)] group-hover:[filter:invert(100%)]"
            />
          </Link>
          <Link
            href="/dashboard/apps"
            className="p-2 sm:p-3 rounded-lg hover:bg-black transition-colors group"
          >
            <Image
              src="/apps.svg"
              alt="Apps"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 [filter:invert(55%)] group-hover:[filter:invert(100%)]"
            />
          </Link>
          <Link
            href="/dashboard/stats"
            className="p-2 sm:p-3 rounded-lg hover:bg-black transition-colors group"
          >
            <Image
              src="/stats.svg"
              alt="Stats"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 [filter:invert(55%)] group-hover:[filter:invert(100%)]"
            />
          </Link>
          <Link
            href="/dashboard/profile"
            className="p-2 sm:p-3 rounded-lg hover:bg-black transition-colors group"
          >
            <Image
              src="/profile.svg"
              alt="Profile"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 [filter:invert(55%)] group-hover:[filter:invert(100%)]"
            />
          </Link>
          <Link
            href="/dashboard/settings"
            className="p-2 sm:p-3 rounded-lg hover:bg-black transition-colors group"
          >
            <Image
              src="/settings.svg"
              alt="Settings"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 [filter:invert(55%)] group-hover:[filter:invert(100%)]"
            />
          </Link>
        </nav>

        <div className="mt-auto">
          <Link
            href="/logout"
            className="p-2 sm:p-3 rounded-lg hover:bg-[#2a2a2a] transition-colors"
          >
            <Image
              src="/logout.svg"
              alt="Logout"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </Link>
        </div>
      </div>

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