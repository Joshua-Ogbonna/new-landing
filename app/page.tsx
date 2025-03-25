"use client";
import "./styles/fonts.css"
import AlbumPlayer from "./components/AlbumPlayer";
import Sec2 from "./components/Sec2";
import Image from "next/image";
import DiscoverSection from "./components/DiscoverSection";
import PricingSection from "./components/PricingSection";
import Grow from "./components/Grow";
import Trusted from "./components/Trusted";
import Download from "./components/Download";
import Footer from "./components/Footer";
import NewHero from "./components/NewHero";
export default function Home() {
  return (
    <div className="bg-black h-full">
      <NewHero />
      <div className="relative top-[20px]nnnnn">
        <Sec2 />
        
      </div>
      {/* Container for AlbumPlayer and DiscoverSection with background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Group.png"
            alt="background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
          <AlbumPlayer />
          <DiscoverSection />
        </div>
        <PricingSection />
      </div>
      {/* Container for Grow and Trusted with diagonal lines */}{" "}
      <div className="relative">
        <div
          className="absolute right-0 top-[-40rem] z-10 w-1/2 overflow-hidden"
          style={{ height: "100%" }}
        >
          <div className="relative w-full h-full">
            {" "}
            <Image
              src="/group2.png"
              alt="background lines"
              fill
              className="object-cover object-right scale-150"
              style={{ transform: "scale(1.5)" }}
            />
          </div>
        </div>
        <div className="relative z-10">
          <Grow />
          <Trusted />
        </div>
      </div>
      <Download />
      <Footer />
    </div>
  );
}
