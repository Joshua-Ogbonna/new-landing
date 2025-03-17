import React from 'react'

const SongPlay = () => {
  return (
    <div>
           <div className="w-[500px] pt-4">
            {selectedAlbum && (
              <div className="space-y-10">
                {/* Currently Playing Song */}
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-white/40 text-sm w-8">01</span>
                    <div className="flex-1">
                      <h3 className="text-[40px] font-medium leading-none mb-3">
                        {selectedAlbum.songs[0].title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="text-[13px] text-white/40">2024</span>
                        <span className="text-[13px] text-[#c2ee03]">
                          {selectedAlbum.artist}
                        </span>
                        <span className="text-[13px] text-white/40">
                          {selectedAlbum.songs[0].duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                        className="group flex items-center gap-4 cursor-pointer"
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <span className="text-white/40 text-sm w-8">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-[32px] text-white/40 group-hover:text-white transition-colors font-medium leading-none">
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
  )
}

export default SongPlay