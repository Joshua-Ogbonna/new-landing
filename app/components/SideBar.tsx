"use client";
import Image from "next/image";
import Link from "next/link";
const SideBar = () => {
  return (
    <div>
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
    </div>
  )
}

export default SideBar