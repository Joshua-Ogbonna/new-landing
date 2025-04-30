"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  FaSignOutAlt, FaTimes, FaChevronDown, FaChevronUp, 
  FaHome, FaDollarSign, FaMusic, FaFolderOpen, FaCompactDisc, FaHeadphones, FaPlusCircle, FaUserCircle, FaCog 
} from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

interface SideBarProps {
  image?: string;
  isOpen: boolean;
  onClose: () => void;
}

// Define navigation items with React Icons
const primaryNavItems = [
  { href: "/Dashboard", label: "Dashboard", icon: FaHome },
  { href: "/earnings", label: "Earnings", icon: FaDollarSign },
];

// Define Music submenu items with React Icons
const musicSubmenuItems = [
   { href: "/albums", label: "Albums", icon: FaCompactDisc },
   { href: "/singles", label: "Singles", icon: FaHeadphones },
];

// Add New Release item with React Icons
const newReleaseItem = { href: "/newRelease", label: "New Release", icon: FaPlusCircle };

// Profile items with React Icons
const profileNavItems = [
   { href: "/Dashboard/profile", label: "Profile", icon: FaUserCircle },
   { href: "/Dashboard/settings", label: "Settings", icon: FaCog },
];

const SideBar: React.FC<SideBarProps> = ({ image, isOpen, onClose }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMusicOpen, setIsMusicOpen] = useState(false);

  // Check if current path is under /albums or /singles
  const isMusicSectionActive = pathname.startsWith('/albums') || pathname.startsWith('/singles');

  // Open music dropdown if the current path is within that section
  useEffect(() => {
      if (isMusicSectionActive) {
          setIsMusicOpen(true);
      }
  }, [pathname, isMusicSectionActive]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const isActive = (href: string) => {
    if (href === "/Dashboard") return pathname === href; 
    if (href === "/albums" || href === "/singles" || href === "/newRelease" || href === "/earnings" || href === "/Dashboard/profile" || href === "/Dashboard/settings") {
        return pathname.startsWith(href);
    }
    return false;
  };
  
  // Adjusted isActive check specifically for the Music dropdown *trigger*
  const isMusicTriggerActive = () => {
      return pathname.startsWith('/albums') || pathname.startsWith('/singles');
  }

  const toggleMusicDropdown = () => {
      setIsMusicOpen(!isMusicOpen);
  };

  return (
    <div className={`
      fixed top-0 left-0 h-screen bg-[#121212] border-r border-[#2a2a2a] 
      flex flex-col justify-between py-6 z-50 
      transition-transform duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0 w-64 shadow-xl' : '-translate-x-full w-64'}
      lg:translate-x-0 lg:w-64 lg:py-6 
    `}>
      {/* Top section */}
      <div className="w-full px-4 overflow-y-auto flex-grow">
        {/* Mobile Close Button */}
        <div className={`lg:hidden flex justify-end mb-6 ${isOpen ? 'block' : 'hidden'}`}>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <FaTimes size={24} />
          </button>
        </div>
        
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gray-400 rounded-full overflow-hidden mb-2 relative">
                {session?.user?.artistImage ? (
                    <Image 
                        src={session.user.artistImage}
                        alt="User profile"
                        fill
                        className="w-full h-full object-cover"
                        sizes="48px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-600">
                        <FaUserCircle size={30} className="text-gray-400" />
                    </div>
                )}
            </div>
            <span className={`text-white text-sm font-medium truncate ${isOpen ? 'block' : 'hidden'} lg:block`}>
                {status === 'authenticated' ? (session?.user?.artistName ?? 'User') : 'Loading...'}
            </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start space-y-1 mt-8"> 
          {/* Primary Links */}
          {primaryNavItems.map((item) => {
            const active = isActive(item.href);
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                           ${active ? 'bg-black' : 'hover:bg-black'}`} 
                onClick={onClose}
              >
                <IconComponent 
                  size={22}
                  className={`flex-shrink-0 transition-colors duration-200 
                             ${active ? 'text-[#C2EE03]' : 'text-gray-400'} group-hover:text-white`} 
                />
                <span className={`ml-4 transition-colors duration-200 
                               ${active ? 'text-[#C2EE03]' : 'text-white'} 
                               ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
                  {item.label}
                </span> 
              </Link>
            );
          })}

          {/* Music Dropdown Trigger */}
          <button 
            onClick={toggleMusicDropdown}
            className={`p-3 rounded-lg transition-colors group w-full flex items-center justify-between 
                       ${isMusicTriggerActive() ? 'bg-black' : 'hover:bg-black'}`}
          >
            <div className="flex items-center">
                <FaFolderOpen 
                   size={22} 
                   className={`flex-shrink-0 transition-colors duration-200 
                              ${isMusicTriggerActive() ? 'text-[#C2EE03]' : 'text-gray-400'} group-hover:text-white`} 
                 />
                <span className={`ml-4 transition-colors duration-200 
                               ${isMusicTriggerActive() ? 'text-[#C2EE03]' : 'text-white'} 
                               ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
                  Music
                </span> 
            </div>
            <span className={`${isOpen ? 'inline' : 'hidden'} lg:inline ${isMusicTriggerActive() ? 'text-[#C2EE03]' : 'text-white'} group-hover:text-white`}>
                {isMusicOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </span>
          </button>

          {/* Music Submenu - Conditionally Rendered */}
          {isMusicOpen && (
            <div className="pl-6 space-y-1 w-full mt-1">
              {musicSubmenuItems.map((item) => {
                  const active = isActive(item.href);
                  const IconComponent = item.icon;
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className={`p-2 rounded-lg transition-colors group w-full flex items-center 
                                 ${active ? 'bg-black' : 'hover:bg-black'}`} 
                      onClick={onClose}
                    >
                      <IconComponent 
                          size={18}
                          className={`flex-shrink-0 transition-colors duration-200 
                                     ${active ? 'text-[#C2EE03]' : 'text-gray-400'} group-hover:text-white`} 
                      />
                      <span className={`ml-3 transition-colors duration-200 text-sm 
                                     ${active ? 'text-[#C2EE03]' : 'text-white'} 
                                     ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
                        {item.label}
                      </span> 
                    </Link>
                  );
              })}
            </div>
          )}

          {/* New Release Link */}
          {(() => {
            const active = isActive(newReleaseItem.href);
            const IconComponent = newReleaseItem.icon;
            return (
              <Link
                key={newReleaseItem.href}
                href={newReleaseItem.href}
                className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                            ${active ? 'bg-black' : 'hover:bg-black'}`}
                onClick={onClose}
              >
                <IconComponent 
                   size={22} 
                   className={`flex-shrink-0 transition-colors duration-200 
                              ${active ? 'text-[#C2EE03]' : 'text-gray-400'} group-hover:text-white`} 
                 />
                <span className={`ml-4 transition-colors duration-200 
                                ${active ? 'text-[#C2EE03]' : 'text-white'} 
                                ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
                  {newReleaseItem.label}
                </span>
              </Link>
            );
          })()}
          

          {/* Separator */}
          <hr className="border-t border-gray-700 my-4" />

          {/* Profile/Settings Links */}
          {profileNavItems.map((item) => {
             const active = isActive(item.href);
             const IconComponent = item.icon;
             return (
               <Link 
                 key={item.href} 
                 href={item.href} 
                 className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                           ${active ? 'bg-black' : 'hover:bg-black'}`} 
                 onClick={onClose}
               >
                 <IconComponent 
                    size={22} 
                    className={`flex-shrink-0 transition-colors duration-200 
                               ${active ? 'text-[#C2EE03]' : 'text-gray-400'} group-hover:text-white`} 
                 />
                 <span className={`ml-4 transition-colors duration-200 
                               ${active ? 'text-[#C2EE03]' : 'text-white'} 
                               ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
                   {item.label}
                 </span> 
               </Link>
             );
           })}

        </nav>
      </div>

      {/* Bottom section: Logout button */}
      <div className="w-full px-4">
        {status === "authenticated" && (
          <button
            onClick={handleSignOut} 
            title="Sign Out"
            className="p-3 rounded-lg hover:bg-red-800/50 transition-colors group w-full flex items-center"
          >
            <FaSignOutAlt size={22} className="text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
            <span className={`ml-4 text-white group-hover:text-red-400 transition-colors duration-200 ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
              Logout
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;