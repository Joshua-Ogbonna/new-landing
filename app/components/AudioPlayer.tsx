import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function AudioPlayer() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const audioData = [
    { image: "/baggenew.jpg", audio: "/songs/NoGood.mp3", title: "No Good", artist: "Bagge" },
    { image: "/mikelnew.jpg", audio: "/songs/Get-out-my-house-Mikel-.mp3", title: "Get out my house", artist: "Mikel " },
    { image: "/king thuna.jpg", audio: "/songs/RIDE OR DIE King thona.wav", title: "Ride or die", artist: "king thuna" },
    { image: "/bobbie richie.jpg", audio: "/songs/bobby dodo-short.MP3", title: "Ripple Effect", artist: "Bobbie Richie" },
  ];

  const handlePlayPause = (audioSrc: string, index: number) => {
    if (currentAudio && playingIndex === index) {
      currentAudio.pause();
      setPlayingIndex(null);
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(audioSrc);
    newAudio.play();
    setCurrentAudio(newAudio);
    setPlayingIndex(index);

    newAudio.ontimeupdate = () => {
      setProgress((newAudio.currentTime / newAudio.duration) * 100 || 0);
    };

    newAudio.onended = () => {
      setPlayingIndex(null);
      setProgress(0);
      console.log(progress);

    };
  };

  return (
    <div className="bg-[#1F201E] h-fit mt-20 font-Nebulica px-6 md:px-20 max-w-[1440px] text-white py-10 rounded-[20px] mx-auto">
      {/* Grid of Songs */}
      <h1 className="text-[30px] p-6 font-bold leading-[1.1] tracking-[-0.02em] block  text-center md:hidden">
        Indulge in Your Favorite Tunes
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {audioData.map((item, index) => (
          <div key={index} className="text-center">
            <img
              src={item.image}
              alt="Play Music"
              className={`w-full h-[300px] object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 ${playingIndex === index ? "border-4 border-[#c2ee03] " : ""
                }`}
              onClick={() => handlePlayPause(item.audio, index)}
            />
            <h2 className="text-lg font-semibold mt-2">{item.artist}</h2>
          </div>
        ))}
        {/* Music Player UI */}
      </div>


      {/* Artist & Song List Section */}
      <div className=" h-fit mt-10 font-Nebulica  md:max-w-[1440px] text-white  rounded-[48px] ">

        <div className="flex justify-between  w-full">
          <h1 className="text-[72px] font-Nebulica font-bold leading-[1.1] tracking-[-0.02em] hidden  md:block ">
            <span className="text-[#c2ee03]">Indulge</span>  in Your Favorite Tunes
          </h1>
          <div className="w-1/2">
            {audioData.map((item, index) => (
              <div
                key={index}
                className={`flex  justify-between items-center px-auto py-3 rounded-lg cursor-pointer transition-all ${playingIndex === index ? "text-[#c2ee03] " : ""
                  }`}
                onClick={() => handlePlayPause(item.audio, index)}
              >

                <div className="flex justify-between  w-full">
                  <div>
                    <p className="text-lg font-semibold">{item.artist}</p>
                    <p className="text-sm text-gray-300">{item.title}</p>
                  </div>
                  <button className="text-white">
                    {playingIndex === index ? <FaPause size={16} className="text-[#c2ee03] " /> : <FaPlay size={16} />}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
