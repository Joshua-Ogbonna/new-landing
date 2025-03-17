"use client";
import Image from "next/image";
import ScrollHero from "./components/ScrollHero";
import Stats from "./components/Stats";
import AlbumPlayer from "./components/AlbumPlayer";
import DiscoverSection from "./components/DiscoverSection";
import PricingSection from "./components/PricingSection";
import "./styles.css";
import "./styles/scroll-hero.css";
import Grow from "./components/Grow";
import Trusted from "./components/Trusted";
import Download from "./components/Download";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <main>
        <ScrollHero />
      </main>
      <div className="bg-black">
        <Stats />
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
        </div>
        <PricingSection />
        {/* Container for Grow and Trusted with diagonal lines */}
        <div className="relative">
          <div className="absolute right-0 top-[-80rem] z-0 w-1/2" style={{ height: '100%' }}>
            <div className="relative w-full h-full">
              <Image 
                src="/group2.png" 
                alt="background lines" 
                fill 
                className="object-cover object-right scale-150" 
                style={{ transform: 'scale(1.5)' }}
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
    </div>
  );
}
