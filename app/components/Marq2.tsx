import Marquee from "react-fast-marquee";

const MarqueeComp = () => {
  return (
    <Marquee
      className="bg-[#CCFF00] text-black py-2 md:py-5 text-lg md:text-xl"
      speed={80} // Slightly faster speed
      gradient={false}
      direction="right"
    >
      For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound •
    </Marquee>
  );
};

export default MarqueeComp;
