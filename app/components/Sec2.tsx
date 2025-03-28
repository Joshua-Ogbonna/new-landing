import Image from "next/image";

const Sec2 = () => {
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
                    <button className="rounded-md w-32 h-10 my-5 text-center text-black font-semibold bg-[#CCFF00]">
                        Learn more
                    </button>
                </div>
                <div className="relative w-full md:w-1/2 h-full">
                    <Image src="/couple.png" width={450} height={450} alt="man" />
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
            <div className=" bg-[#c2ee03] py-8 w-screen">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center text-black max-w-[1300px] font-Nebulica mx-auto">
                        <div>
                            <p className="text-4xl font-bold">150K+</p>
                            <p className="text-base mt-2 font-poppins">Our Happy Visitors</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">50+</p>
                            <p className="text-base mt-2 font-poppins">Our Popular Artists</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">100+</p>
                            <p className="text-base mt-2 font-poppins">Our Business Partners</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">750+</p>
                            <p className="text-base mt-2 font-poppins">Our Coming Events</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">20+</p>
                            <p className="text-base mt-2 font-poppins">Our Media Partners</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sec2;
