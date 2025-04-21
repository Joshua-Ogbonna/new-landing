import Image from "next/image";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Link from "next/link";
const Sec2 = () => {
        const { ref, inView } = useInView({
          triggerOnce: true,
          threshold: 0.1
        });
    
  const statsData = [
    { value: 72, suffix: 'K+', label: 'Our Happy Visitors' },
    { value: 50, suffix: '+', label: 'Our Popular Artists' },
    { value: 20, suffix: '+', label: 'Our Business Partners' },
    { value: 30, suffix: '+', label: 'Our Coming Events' }
  ];
    return (
        <div className="overflow-hidden font-poppins h-full bg-black">
            <div className="relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Group.png"
                        alt="background"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="md:px-32 px-10 bg-black flex flex-col md:flex-row md:gap-[180px] justify-between items-center  h-full">
                <div className="full md:w-1/2 h-fit">
                    <p className="text-[#CCFF00] text-md md:text-xl mt-10">
                        Welcome to MySounds Global, where music isn&apos;t just streamed—it&apos;s
                        empowered. We&apos;re here to amplify underground voices, push new genres,
                        and create space for sounds that deserve to shine.
                        This is more than a platform, it&apos;s a movement. Listeners unlock exclusive
                        tracks, connect with rising stars, and directly support the artists shaping the
                        future of music.
                    </p>
                    <p className="text-white text-sm md:text-xl pt-5">
                        Whether you&apos;re an artist striving to break through or a listener seeking culture
                        beyond the mainstream, this is your soundscape
                    </p>
                    <Link href='/create'>
                    
                    <button className="rounded-md w-32 h-10 my-5 text-center text-black font-semibold bg-[#CCFF00]">
                        Learn more
                    </button>
                    </Link>
                </div>
                <div className="relative md:px-[63px]  w-full md:w-1/2 h-full">
                    <Image src="/AboutImg (1).png" width={550} height={550} alt="man" className="h-[450px] object-center w-full" />
                </div>
                {/* <div className="absolute top-[76%] md:top-[26%] md:right-[120px] right-[90px]  md:p-4 ">
                    <Image
                        width={150}
                        height={119}
                        src="/ca2.png"
                        alt="card 1"
                        className="w-[50px] md:w-[100px] h-auto"
                    />
                </div> */}

                {/* <div className="absolute md:bottom-[10%] bottom-[1%] left-[20%] md:left-[55%] p-2 md:p-4 ">
                    <Image
                        width={150}
                        height={119}
                        src="/card 2.png"
                        alt="card 1"
                        className="w-[60px] md:w-[100px]"
                    />
                </div> */}
            </div>
            {/* Bottom stats section */}
            <div className="bg-[#c2ee03] py-8 w-screen" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center text-black max-w-[1300px] font-Nebulica mx-auto">
          {statsData.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-bold">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    delay={0.2}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </p>
              <p className="text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
    );
};

export default Sec2;
