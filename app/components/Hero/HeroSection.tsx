import Image from "next/image";

interface HeroSectionProps {
  phone: string;
  heading: string;
  subheading: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

const HeroSection = ({
  phone,
  heading,
  subheading,
  backgroundColor,
  textColor,
  accentColor,
}: HeroSectionProps) => {
  return (
    <div className="hero-section h-screen w-full flex items-center justify-between" style={{ backgroundColor }}>
      <div className="phone-container relative">
        <Image
          src={phone}
          alt="App Screenshot"
          width={1041}
          height={817}
          className="object-contain"
          priority
        />
      </div>
      <div className="text-container">
        <h2 className="text-7xl lg:text-8xl font-bold" style={{ color: accentColor }}>
          {heading}
        </h2>
        <h3 className="text-5xl lg:text-6xl font-bold mt-4" style={{ color: textColor }}>
          {subheading}
        </h3>
      </div>
    </div>
  );
};

export default HeroSection;
