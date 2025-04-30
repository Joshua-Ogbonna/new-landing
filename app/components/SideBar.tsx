"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaSignOutAlt, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

interface SideBarProps {
  image?: string;
  isOpen: boolean;
  onClose: () => void;
}

// Define navigation items
const primaryNavItems = [
  { href: "/Dashboard", label: "Dashboard", iconSrc: "/home.svg", alt: "Dashboard" },
  { href: "/earnings", label: "Earnings", iconSrc: "/stats.svg", alt: "Earnings" },
];

// Define Music submenu items
const musicSubmenuItems = [
   { href: "/albums", label: "Albums", iconSrc: "/apps.svg", alt: "Albums" },
   { href: "/singles", label: "Singles", iconSrc: "/music_note.svg", alt: "Singles" },
];

// Add New Release item
const newReleaseItem = { href: "/newRelease", label: "New Release", iconSrc: "/add_circle.svg", alt: "New Release" };

// Add Course item
const courseItem = { href: "/courses", label: "Courses", iconSrc: "/education.svg", alt: "Courses" };

// Add Merch item
const merchItem = { href: "/merch", label: "Merchandise", iconSrc: "/shopping.svg", alt: "Merchandise" };

const profileNavItems = [
   { href: "/Dashboard/profile", label: "Profile", iconSrc: "/profile.svg", alt: "Profile" },
   { href: "/Dashboard/settings", label: "Settings", iconSrc: "/settings.svg", alt: "Settings" },
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
    return pathname.startsWith(href);
  };

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
            <div className="w-12 h-12 bg-gray-400 rounded-full overflow-hidden mb-2">
                <Image 
                    src={session?.user?.artistImage || ''}
                    alt="User profile"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                />
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
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                           ${active ? 'bg-black' : 'hover:bg-black'}`} 
                onClick={onClose}
              >
                <Image 
                  src={item.iconSrc} 
                  alt={item.alt} 
                  width={24} 
                  height={24} 
                  className={`w-6 h-6 flex-shrink-0 transition-all duration-200 
                             ${active ? '[filter:invert(100%)]' : '[filter:invert(55%)]'} group-hover:[filter:invert(100%)]`} 
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
                       ${isMusicSectionActive ? 'bg-black' : 'hover:bg-black'}`}
          >
            <div className="flex items-center">
                <Image 
                  src="/music_folder.svg"
                  alt="Music"
                  width={24} 
                  height={24} 
                  className={`w-6 h-6 flex-shrink-0 transition-all duration-200 
                             ${isMusicSectionActive ? '[filter:invert(100%)]' : '[filter:invert(55%)]'} group-hover:[filter:invert(100%)]`} 
                />
                <span className={`ml-4 transition-colors duration-200 
                               ${isMusicSectionActive ? 'text-[#C2EE03]' : 'text-white'} 
                               ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
                  Music
                </span> 
            </div>
            <span className={`${isOpen ? 'inline' : 'hidden'} lg:inline ${isMusicSectionActive ? 'text-[#C2EE03]' : 'text-white'} group-hover:text-white`}>
                {isMusicOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </span>
          </button>

          {/* Music Submenu - Conditionally Rendered */}
          {isMusicOpen && (
            <div className="pl-6 space-y-1 w-full mt-1">
              {musicSubmenuItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className={`p-2 rounded-lg transition-colors group w-full flex items-center 
                                 ${active ? 'bg-black' : 'hover:bg-black'}`} 
                      onClick={onClose}
                    >
                      <Image 
                        src={item.iconSrc} 
                        alt={item.alt} 
                        width={20}
                        height={20} 
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-200 
                                   ${active ? '[filter:invert(100%)]' : '[filter:invert(55%)]'} group-hover:[filter:invert(100%)]`} 
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
          <Link
            key={newReleaseItem.href}
            href={newReleaseItem.href}
            className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                         ${isActive(newReleaseItem.href) ? 'bg-black' : 'hover:bg-black'}`}
            onClick={onClose}
          >
            <Image
              src={newReleaseItem.iconSrc}
              alt={newReleaseItem.alt}
              width={24}
              height={24}
              className={`w-6 h-6 flex-shrink-0 transition-all duration-200 
                             ${isActive(newReleaseItem.href) ? '[filter:invert(100%)]' : '[filter:invert(55%)]'} group-hover:[filter:invert(100%)]`}
            />
            <span className={`ml-4 transition-colors duration-200 
                             ${isActive(newReleaseItem.href) ? 'text-[#C2EE03]' : 'text-white'} 
                             ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
              {newReleaseItem.label}
            </span>
          </Link>
          
          {/* Course Link */}
          <Link
            key={courseItem.href}
            href={courseItem.href}
            className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                         ${isActive(courseItem.href) ? 'bg-black' : 'hover:bg-black'}`}
            onClick={onClose}
          >
            <Image
              src={courseItem.iconSrc}
              alt={courseItem.alt}
              width={24}
              height={24}
              className={`w-6 h-6 flex-shrink-0 transition-all duration-200 
                             ${isActive(courseItem.href) ? '[filter:invert(100%)]' : '[filter:invert(55%)]'} group-hover:[filter:invert(100%)]`}
            />
            <span className={`ml-4 transition-colors duration-200 
                             ${isActive(courseItem.href) ? 'text-[#C2EE03]' : 'text-white'} 
                             ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
              {courseItem.label}
            </span>
          </Link>
          
          {/* Merch Link */}
          <Link
            key={merchItem.href}
            href={merchItem.href}
            className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                         ${isActive(merchItem.href) ? 'bg-black' : 'hover:bg-black'}`}
            onClick={onClose}
          >
            <Image
              src={merchItem.iconSrc}
              alt={merchItem.alt}
              width={24}
              height={24}
              className={`w-6 h-6 flex-shrink-0 transition-all duration-200 
                             ${isActive(merchItem.href) ? '[filter:invert(100%)]' : '[filter:invert(55%)]'} group-hover:[filter:invert(100%)]`}
            />
            <span className={`ml-4 transition-colors duration-200 
                             ${isActive(merchItem.href) ? 'text-[#C2EE03]' : 'text-white'} 
                             ${isOpen ? 'inline' : 'hidden'} lg:inline`}>
              {merchItem.label}
            </span>
          </Link>

          {/* Separator */}
          <hr className="border-t border-gray-700 my-4" />

          {/* Profile/Settings Links */}
          {profileNavItems.map((item) => {
             const active = isActive(item.href);
             return (
               <Link 
                 key={item.href} 
                 href={item.href} 
                 className={`p-3 rounded-lg transition-colors group w-full flex items-center 
                           ${active ? 'bg-black' : 'hover:bg-black'}`} 
                 onClick={onClose}
               >
                 <Image 
                   src={item.iconSrc} 
                   alt={item.alt} 
                   width={24} 
                   height={24} 
                   className={`w-6 h-6 flex-shrink-0 transition-all duration-200 
                             ${active ? '[filter:invert(100%)]' : '[filter:invert(55%)]'} group-hover:[filter:invert(100%)]`} 
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
             <FaSignOutAlt className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors flex-shrink-0" />
             <span className={`ml-4 text-red-400 ${isOpen ? 'inline' : 'hidden'} lg:inline`}>Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;