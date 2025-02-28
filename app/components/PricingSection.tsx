import Image from "next/image";

export default function PricingSection() {
  return (
    <div className="relative w-full md:max-w-[1440px] mx-auto py-32">
      <div className="flex items-start justify-between">
        {/* Left side */}
        <div className="w-[928px]">
          <h2 className="w-full text-[72px] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-8">
            Get Ready
            <br />
            with our
            <br />
            Premium Plan
          </h2>
          <button className="text-white bg-none border border-white rounded-full px-8 h-14 font-medium hover:bg-white/90 hover:text-black transition-colors">
            Continue With Free Plan
          </button>
        </div>

        {/* Right side */}
        <div className="flex gap-6 items-center text-center">
          {/* Special Offer Card */}
          <div className="relative w-[300px] aspect-square rounded-[32px] bg-[#556B2F] p-8 flex flex-col">
            <div>
              <div className="text-[24px] text-white font-medium">
                Special Offer
              </div>
              <div className="text-[36px] text-white font-bold mt-4">
                New Users
                <br />3 Months
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-black/20" />
            <button className="absolute bottom-8 left-8 right-8 h-14 rounded-full bg-[#C2EE03] text-black text-lg font-bold hover:bg-[#d4ff03] transition-colors">
              $34 USD
            </button>
          </div>

          {/* Annual Card */}
          <div className="relative w-[300px] aspect-square rounded-[32px] bg-[#1A1A1A] p-8 flex flex-col">
            <div>
              <div className="text-[24px] text-white font-medium">Annual</div>
            </div>
            <Image
              src="/iconn.png"
              alt=""
              width={40}
              height={40}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-black/20"
            />
            <button className="absolute bottom-8 left-8 right-8 h-14 rounded-full bg-[#C2EE03] text-black text-lg font-bold hover:bg-[#d4ff03] transition-colors">
              $34 USD
            </button>
          </div>

          {/* Monthly Card */}
          <div className="relative w-[300px] aspect-square rounded-[32px] bg-[#1A1A1A] p-8 flex flex-col">
            <div>
              <div className="text-[24px] text-white font-medium">Month</div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-black/20" />
            <button className="absolute bottom-8 left-8 right-8 h-14 rounded-full bg-[#C2EE03] text-black text-lg font-bold hover:bg-[#d4ff03] transition-colors">
              $34 USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
