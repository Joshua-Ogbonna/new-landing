"use client";

interface MarqueeProps {
  firstBg: string;
  secondBg: string;
  color?: string
}

const Marquee = ({ firstBg, secondBg }: MarqueeProps) => {
  return (
    <div className="absolute bottom-0 w-full overflow-hidden h-[900px]">
      {/* Background stripe */}
      <div 
        className={`${firstBg} h-[480px] absolute w-[120vw] -left-[10vw]`}
        style={{
          top: '50%',
          transform: 'rotate(2deg)',
        }}
      ></div>
      
      {/* Main stripe with text */}
      <div 
        className={`${secondBg} absolute h-[580px] flex items-center w-[120vw] -left-[10vw]`}
        style={{
          top: '15%',
          transform: 'rotate(-3deg)',
          padding: '2rem 0',
        }}
      >
      </div>
    </div>
  );
};

export default Marquee;