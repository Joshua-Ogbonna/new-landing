import Image from "next/image";
import Link from "next/link";
import React from "react";

const Download = () => {
  return (
    <div>
      <div className="w-full md:max-w-[1440px] mx-auto px-6 pt-[200px] flex items-start justify-between">
        <div className="flex items-start justify-between flex-col gap-12">
          <p className="text-white text-[60px]">
            Come on, join now <br /> and feel the music <br /> events vibe
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

        <div className="flex gap-12 flex-col items-start justify-between">
          <h5 className="text-[60px] text-white font-medium">Download our App</h5>
          <div className="flex items-center gap-4">
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
