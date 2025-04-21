import Marquee from "react-fast-marquee";

interface MarqueeProps {
  background: string;
  textColor: string;
}
const MarqueeComp: React.FC<MarqueeProps> = ({background,textColor}) => {
  return (
<Marquee
  style={{ 
    backgroundColor: background, 
    color: textColor,
 
  }}
  className="font-bold py-2 md:py-5 text-lg md:text-5xl skew-x-[-5deg] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)] "
  speed={120} 
  gradient={false}
  direction="right"
>
  For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound • For the Culture • For the Future • For the Sound
</Marquee>

  );
};

export default MarqueeComp;
