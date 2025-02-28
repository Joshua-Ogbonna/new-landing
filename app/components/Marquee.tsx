"use client";

interface MarqueeProps {
  firstBg: string;
  secondBg: string;
  color: string
}

const Marquee = ({ firstBg, secondBg, color }: MarqueeProps) => {
  return (
    <div className="absolute bottom-0 w-full overflow-hidden h-[700px]">
      {/* Background stripe */}
      <div 
        className={`${firstBg} h-[180px] absolute w-[120vw] -left-[10vw]`}
        style={{
          top: '50%',
          transform: 'rotate(2deg)',
        }}
      ></div>
      
      {/* Main stripe with text */}
      <div 
        className={`${secondBg} absolute h-[180px] flex items-center w-[120vw] -left-[10vw]`}
        style={{
          top: '55%',
          transform: 'rotate(-3deg)',
          padding: '1rem 0',
        }}
      >
        <div className={`animate-bounce-x whitespace-nowrap inline-flex gap-12 text-7xl font-bold ${color}`}>
          <span>YOUR SOUND YOUR RULE</span>
          <span>•</span>
          <span>YOUR SOUND YOUR RULE</span>
          <span>•</span>
          <span>YOUR SOUND YOUR RULE</span>
          <span>•</span>
          <span>YOUR SOUND YOUR RULE</span>
          <span>•</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
