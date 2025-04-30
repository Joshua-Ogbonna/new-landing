"use client";
import Image from "next/image";

interface ArtistProfileProps {
  name: string;
  role: string;
  bio?: string;
  picture?: string;
}

export default function ArtistProfile({ name, role, bio, picture }: ArtistProfileProps) {

  return (
    <div className="bg-[#1F1F1F] rounded-xl p-4 sm:p-6 flex flex-col w-full h-full"> {/* Use w-full and h-full to fill parent, adjust padding */}
      {/* Artist Info Section - Allow natural height */}
      <div className="flex flex-col items-center text-center mb-6"> {/* Added margin-bottom */}
        {/* Responsive image size container */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
          <Image
            src={picture || "/profilePicture.png"}
            alt="profilePicture"
            layout="fill" // Use layout fill for responsiveness within the container
            objectFit="cover" // Ensure image covers the area without distortion
            className="rounded-full" // Keep it circular
          />
          {/* Adjusted indicator size and position slightly */}
          <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#C2EE03] rounded-full border-2 border-[#1F1F1F]"></div>
        </div>
        <div>
          {/* Responsive text sizes */}
          <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
          <p className="text-sm sm:text-base text-gray-400">{role}</p>
          {bio && <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xs">{bio}</p>} {/* Added max-width for bio */}
        </div>
      </div>

      {/* Recent Activities Section - Scrollable */}
      {/* Use flex-1 to take remaining space, min-h-0 prevents overflow issues in flex column */}
      <div className="flex flex-col flex-1 min-h-0">
        <h4 className="text-center sm:text-sm mb-4 flex-shrink-0">Recent Activities</h4> {/* Prevent title from shrinking */}
        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2"> {/* Removed fixed height, added max-h for safety */}
          {/* Placeholder Content - Replace with actual activities */}
          <div className="flex items-center justify-center h-full">
            <p className="text-sm sm:text-base text-gray-400">No recent activities</p>
          </div>
          {/* Example Activity Item (if needed later)
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0"></div>
            <p className="text-sm text-gray-300 truncate">Uploaded a new track: "Sunset Groove"</p>
          </div>
          */}
        </div>
      </div>
    </div>
  )
}