"use client";

import { useState } from "react";
import Image from "next/image";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  year: string;
}

interface Album {
  id: string;
  cover: string;
  title: string;
  artist: string;
  songs: Song[];
}

const albums: Album[] = [
  {
    id: "3",
    cover: "/gilly-mu.jpeg",
    title: "Kese",
    artist: "Kese",
    songs: [
      {
        id: "1",
        title: "Kese",
        artist: "Gilly",
        duration: "3:45",
        year: "2024",
      },
    ],
  },
  {
    id: "2",
    cover: "/turner.png",
    title: "X",
    artist: "TXRNER",
    songs: [
      {
        id: "1",
        title: "Txrner",
        artist: "TXRNER",
        duration: "4:20",
        year: "2024",
      },
    ],
  },
  {
    id: "1",
    cover: "/L.Christo.jpg",
    title: "Me & U",
    artist: "L Christo",
    songs: [
      {
        id: "1",
        title: "Lets dance",
        artist: "L Christo",
        duration: "3:50",
        year: "2024",
      },
      {
        id: "2",
        title: "Track 2",
        artist: "L Christo",
        duration: "3:30",
        year: "2024",
      },
    ],
  },

  {
    id: "4",
    cover: "/mikelnew.jpg",
    title: "Wrap it up",
    artist: "Mikel",
    songs: [
      {
        id: "1",
        title: "Wrap it up",
        artist: "Mikel",
        duration: "3:55",
        year: "2024",
      },
    ],
  },
];

const AlbumPlayer = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  return (
    <div className="bg-[#1F201E] h-fit mt-20 font-Nebulica  md:max-w-[1440px] text-white py-10 rounded-[48px] mx-6 md:mx-20 ">
      <div className="">
            <h2 className="text-[30px] p-6 font-bold leading-[1.1] tracking-[-0.02em] block  text-center md:hidden ">
              Indulge in Your
              Favorite Tunes
            </h2>
          </div>
      <div className="container mx-auto px-4">
        {/* Album Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 rounded-2xl overflow-hidden">
          {albums.map((album) => (
            <div
              key={album.id}
              className="relative aspect-video rounded-md overflow-hidden cursor-pointer group"
              onClick={() => setSelectedAlbum(album)}
            >
              <Image
                src={album.cover}
                alt={`${album.title} by ${album.artist}`}
                fill
                className=" object-center transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                {album === selectedAlbum && (
                  <div className="absolute bottom-4 right-4 bg-[#c2ee03] rounded-full p-2">
                    <span className="text-black">▶️</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:flex gap-32">
          {/* Title */}
          <div className="md:flex-1">
            <h2 className="text-[52px] font-bold leading-[1.1] tracking-[-0.02em] hidden  md:block">
              Indulge in Your
              <br />
              Favorite Tunes
            </h2>
          </div>

          {/* Song List */}
          <div className="w-full md:w-[500px] pt-4">
            {selectedAlbum && (
              <div className="space-y-10">
                {/* Currently Playing Song */}
                <div className="">
                  <div className="flex iL Christo-center gap-4">
                    <span className="text-white/40 text-sm w-8">01</span>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-medium leading-none mb-3">
                        {selectedAlbum.songs[0].title}
                      </h3>
                      <div className="flex iL Christo-center gap-4">
                        <span className="text-[13px] text-white/40">2024</span>
                        <span className="text-[13px] text-[#c2ee03]">
                          {selectedAlbum.artist}
                        </span>
                        <span className="text-[13px] text-white/40">
                          {selectedAlbum.songs[0].duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex iL Christo-center gap-2">
                      <button className="text-white/60 hover:text-white transition-colors">
                        ⏸️
                      </button>
                      <button className="text-white/60 hover:text-white transition-colors">
                        •••
                      </button>
                    </div>
                  </div>
                </div>

                {/* Next Songs */}
                <div className="space-y-8">
                  {albums
                    .filter((album) => album.id !== selectedAlbum.id)
                    .map((album, index) => (
                      <div
                        key={album.id}
                        className="group flex iL Christo-center gap-4 cursor-pointer"
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <span className="text-white/40 text-sm w-8">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-[22px] text-white/40 group-hover:text-white transition-colors font-medium leading-none">
                            {album.title}
                          </h3>
                        </div>
                        <button className="text-white/60 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                          ▶️
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPlayer;
