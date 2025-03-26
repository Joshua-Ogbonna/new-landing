/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface TopCountriesProps {
  artistId?: string;
}

interface SongData {
  title: string;
  saved: number;
  addedToPlaylist: number;
  shared: number;
}

interface ApiSong {
  id: string;
  title: string;
  play_count: number;
  purchase_count: number;
  shared_count: number;
}

export default function TopCountries({ artistId }: TopCountriesProps) {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistSongs = async () => {
    try {
      const token = localStorage.getItem("token");
      const currentArtistId = artistId || localStorage.getItem("artistId");

      if (!token || !currentArtistId) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/songs/artist/${artistId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const transformedSongs: SongData[] = response.data.data.map(
        (song: ApiSong) => ({
          title: song.title,
          saved: Math.min(100, (song.play_count / 10) * 100),
          addedToPlaylist: Math.min(100, (song.purchase_count / 10) * 100),
          shared: Math.min(100, (song.shared_count / 10) * 100),
        })
      );

      setSongs(transformedSongs);
    } catch (err) {
      setError("Failed to fetch songs");
      console.error("Error fetching songs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (artistId) {
      fetchArtistSongs();
    }
  }, [artistId]);

  if (loading) {
    return (
      <div className="bg-[#1F1F1F] rounded-xl p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C2EE03]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1F1F1F] rounded-xl p-6">
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="bg-[#1F1F1F] rounded-xl p-6">
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-400">No songs available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1F1F1F] rounded-xl p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="space-y-4">
            <div className="grid grid-cols-4 text-sm text-gray-400 pb-2 border-b border-gray-800">
              <div>SONGS</div>
              <div>SAVED</div>
              <div>ADDED TO PLAYLIST</div>
              <div>SHARED</div>
            </div>
            {songs.map((song, index) => (
              <div key={index} className="grid grid-cols-4 items-center">
                <div className="text-white">{song.title}</div>
                <div className="pr-4">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${song.saved}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pr-4">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C2EE03]"
                      style={{ width: `${song.addedToPlaylist}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pr-4">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#31C4FB]"
                      style={{ width: `${song.shared}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}