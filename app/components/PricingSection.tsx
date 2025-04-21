import Image from "next/image";

export default function PricingSection() {
  return (
    <div className="relative w-full md:max-w-[1440px] mx-auto md:mx-0 py-10 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row items-start justify-between p-4 sm:p-6 md:p-8 rounded-lg md:rounded-2xl">
        {/* Top/Left side */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-white md:mt-10 font-bold text-3xl font-Nebulica sm:text-4xl md:text-[45px]  mb-6 md:mb-8">
            Register as an artist,
            <br />
            Promote great Music,
            <br />
            Access Courses &  Webinars
          </h2>
          <button className="text-white bg-transparent border border-white rounded-full px-6 sm:px-8 h-12 sm:h-14 font-medium hover:bg-white/90 hover:text-black transition-colors text-sm sm:text-base font-poppins">
            Continue With Free Plan
          </button>
        </div>

        {/* Bottom/Right side */}
        <div className="flex flex-col font-poppins sm:flex-row md:flex-col lg:flex-row w-full gap-4 items-center justify-center py-4 md:py-6">
          {/* Special Offer Card */}
          <div className="relative h-[240px] sm:h-[270px] w-full sm:w-[230px] max-w-[230px] rounded-[20px] md:rounded-[32px] bg-[#556B2F] p-6 md:p-8 flex flex-col">
            <div>
              <div className="text-xl sm:text-[26px] text-white text-center font-medium">
                Special Offer
              </div>

              <div className="text-lg sm:text-[22px] text-white text-center font-bold mt-2 md:mt-4">
                New Users
                <br />3 Months
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-black/20" />
            <button className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 h-12 sm:h-14 rounded-full bg-[#C2EE03] text-black text-xl sm:text-lg font-bold hover:bg-[#d4ff03] transition-colors">
              $85.50 USD
            </button>
          </div>


          {/* Monthly Card */}
          <div className="relative h-[240px] sm:h-[270px] w-full sm:w-[330px] max-w-[230px] rounded-[20px] md:rounded-[32px] bg-[#1A1A1A] p-6 md:p-8 flex flex-col">
            <div>
              <div className="text-xl sm:text-[24px] text-white text-center font-medium">Monthly</div>
            </div>
            <Image
              src="/iconn.png"
              alt=""
              width={40}
              height={40}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-black/20"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-black/20" />
            <div className="text-lg absolute top-24 right-0 sm:text-[22px] text-white text-center font-bold mt-2 md:mt-4 w-full">
              Affordable tunes,
              No strings
            </div>
            <button className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 h-12 sm:h-14 rounded-full bg-[#C2EE03] text-black text-xl sm:text-lg font-bold hover:bg-[#d4ff03] transition-colors">
              $29.99 USD
            </button>
          </div>

          {/* Annual Card */}
          <div className="relative h-[240px] sm:h-[270px] w-full sm:w-[230px] max-w-[230px] rounded-[20px] md:rounded-[32px] bg-[#1A1A1A] p-6 md:p-8 flex flex-col">
            <div>
              <div className="text-xl sm:text-[24px] text-white text-center font-medium">Annual</div>
            </div>
            <Image
              src="/iconn.png"
              alt=""
              width={40}
              height={40}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-black/20"
            />
            <div className="text-lg absolute top-24 right-0 sm:text-[22px] text-white text-center font-bold mt-2 md:mt-4 w-full">
              Vibes High, <br /> Costs Low
            </div>
            <button className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 h-12 sm:h-14 rounded-full bg-[#C2EE03] text-black text-xl sm:text-lg font-bold hover:bg-[#d4ff03] transition-colors">
              $320 USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}