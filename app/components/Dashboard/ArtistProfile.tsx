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
    <div className="bg-[#1F1F1F] rounded-xl p-6 flex flex-col w-[339px] h-[869px]">
      {/* Artist Info Section - Fixed Height */}
      <div className="flex flex-col items-center text-center h-[434.5px]">
        <div className="relative w-32 h-32 mb-4">
          <Image 
            src={picture || "/profilePicture.png"}
            alt="profilePicture" 
            width={152}
            height={152}
            className="rounded-full"
          />
          <div className="absolute top-0 right-0 w-4 h-4 bg-[#C2EE03] rounded-full border-2 border-[#1F1F1F]"></div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-400">{role}</p>
          {bio && <p className="text-gray-400 mt-2">{bio}</p>}
        </div>
      </div>

      {/* Recent Activities Section - Scrollable */}
      <div className="h-[434.5px] flex flex-col">
        <h4 className="text-lg font-semibold mb-4">Recent Activities</h4>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No activities available</p>
          </div>
        </div>
      </div>
    </div>
  );
}