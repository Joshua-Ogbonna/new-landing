/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'; // Import Image for cover art
import { useSession } from 'next-auth/react'; // Import useSession
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Example icons for like status
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SongsProps {
  artistId?: string; // Artist ID passed from the parent (DashboardPage)
}

// Interface matching the API response structure for a song
interface ApiArtist {
  id: string;
  name: string;
}
interface ApiSong {
  id: string;
  title: string;
  audio_url: string;
  cover_image: string;
  is_liked: boolean;
  artist: ApiArtist;
}

export default function Songs({ artistId }: SongsProps) {
  const { data: session, status } = useSession(); // Get session
  const [songs, setSongs] = useState<ApiSong[]>([]); // State holds actual API songs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      // Only fetch if artistId is provided and user is authenticated
      if (status === 'authenticated' && artistId && session?.accessToken) {
        setLoading(true);
        setError(null);
        try {
          console.log(`Fetching songs for artist: ${artistId}`);
          const response = await axios.get(
            // Use environment variable and correct endpoint
            `${API_URL}/api/songs/artist/${artistId}`, 
            {
              headers: { 
                  // Use token from session
                  Authorization: `Bearer ${session.accessToken}` 
                },
            }
          );
          setSongs(response.data.data);

        } catch (err: any) { // Catch specific axios error or generic
          console.error("Error fetching songs:", err);
          setError(err.response?.data?.message || err.message || "Failed to fetch songs");
          setSongs([]); // Clear songs on error
        } finally {
          setLoading(false);
        }
      } else if (status === 'loading' || !artistId) {
         // Initial loading state or waiting for artistId prop
         setLoading(true);
      } else {
         // Not authenticated or missing artistId
         setLoading(false);
         setError("Cannot load songs. Artist ID missing or user not authenticated.");
         setSongs([]);
      }
    };

    fetchArtistSongs();
  }, [artistId, session, status]); // Rerun when artistId or session changes

  if (loading) {
    return (
      <div className="bg-[#1F1F1F] rounded-xl p-6 min-h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C2EE03]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1F1F1F] rounded-xl p-6 min-h-[200px] flex items-center justify-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="bg-[#1F1F1F] rounded-xl p-6 min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400">No songs found for this artist.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1F1F1F] rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-medium mb-4">Your Songs</h3>
      <div className="overflow-x-auto">
        {/* Apply min-width to ensure table layout on small screens before scroll */}
        <table className="min-w-full w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2 px-2 font-normal">COVER</th>
              <th className="py-2 px-2 font-normal">TITLE</th>
              {/* Artist name might be redundant here? Optional */}
              {/* <th className="py-2 px-2 font-normal">ARTIST</th> */}
              <th className="py-2 px-2 font-normal text-center">LIKED</th> 
              {/* Add other relevant headers like Plays, Duration? */}
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-2 px-2">
                  <Image 
                    src={song.cover_image || '/placeholder-cover.png'} // Add a fallback image
                    alt={`${song.title} cover`}
                    width={40} 
                    height={40} 
                    className="rounded object-cover w-10 h-10"
                  />
                </td>
                <td className="py-2 px-2 text-white font-medium truncate max-w-xs">{song.title}</td>
                {/* <td className="py-2 px-2 text-gray-300 truncate max-w-xs">{song.artist.name}</td> */}
                <td className="py-2 px-2 text-center">
                   {song.is_liked ? 
                      <FaHeart className="text-red-500 inline" title="Liked" /> : 
                      <FaRegHeart className="text-gray-500 inline" title="Not Liked" />
                   }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}