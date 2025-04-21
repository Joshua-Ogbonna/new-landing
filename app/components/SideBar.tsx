"use client";
import Image from "next/image";
import Link from "next/link";
interface SideBarProps {
  image?: string; // Optional string property
}
const SideBar: React.FC<SideBarProps> = ({ image }) => {
  return (
    <div>
      <div className="w-[60px] h-full sm:w-[80px] bg-[#121212] border-r border-[#2a2a2a] flex flex-col items-center py-4 sm:py-6 space-y-6 sm:space-y-8">
             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 rounded-full overflow-hidden">
               {/* <Image
                 src={ "/ava.png"}
                 alt="Profile"
                 width={40}
                 height={40}
                 className="w-full h-full object-cover"
               /> */}
                {image && <Image src={image || "/ava.png"} alt="User profile"  
                width={40}
                 height={40}
                 className="w-full h-full object-cover"/>}
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
                 className="p-2 sm:p-3 rounded-lg hover:bg-black transition-colors group"
               >
                 <Image
                   src="/logout.svg"
                   alt="Logout"
                   width={24}
                   height={24}
                   className="w-5 h-5 sm:w-6 sm:h-6 [filter:invert(55%)] group-hover:[filter:invert(100%)]"
                 />
               </Link>
             </div>
           </div>
    </div>
  )
}

export default SideBar