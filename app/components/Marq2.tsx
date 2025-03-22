"use client";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

const Marq2: React.FC<MarqueeProps> = ({ text, speed = 20, className = '' }) => {
  return (
    <div className={`marquee-container ${className}`}>
      <div className="marquee-content font-bold text-5xl" style={{ animationDuration: `${speed}s` }}>
        <span>{text}</span>
        <span>{text}</span> {/* Duplicate for smooth looping */}
      </div>
      
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        
        .marquee-content {
          display: flex;
          gap: 2rem;
          min-width: 200%;
          animation: marquee ${speed}s linear infinite;
        }
        
        .marquee-content span {
          flex-shrink: 0;
          min-width: 100%;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marq2;
