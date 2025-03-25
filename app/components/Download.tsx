import Image from "next/image";
import Link from "next/link";
import React from "react";

const Download = () => {
  return (
    <div className="mt-20">
      <div 
  style={{
    width: '100%',
    height: '2px',
    background: 'linear-gradient(to left, #00131300, #C2EE03, #00131300)'
  }}
></div>
      <div className="w-full font-Nebulica md:max-w-[1440px] px-6 my-20 flex flex-col md:flex-row gap-10 md:gap-0 justify-between">
        <div className="flex items-start justify-between flex-col gap-6">
          <p className="text-white text-3xl md:text-5xl">
            Come on, <span className="text-[#C2EE03]">Join Now </span><br /> and feel the music <br /> events vibe
          </p>
          <div className="flex items-center gap-4">
            <Link href={"/"}>
              <Image src="/ig.png" alt="" width={36} height={36} />
            </Link>
            <Link href={"/"}>
              <Image src="/yt.png" alt="" width={36} height={36} />
            </Link>
            <Link href={"/"}>
              <Image src="/tw.png" alt="" width={36} height={36} />
            </Link>
          </div>
        </div>

        <div className="">
          <h5 className="text-3xl md:text-5xl text-white font-medium">Download our App</h5>
          <div className="flex items-center">
            <Link href="">
              <Image src="/appp.png" alt="" width={205} height={100} />
            </Link>
            <Link href="">
              <Image src="/play.png" alt="" width={205} height={100} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
