"use client";
import React from "react";
import banner from "@/assets/images/banner.png";
import bannermobile from "@/assets/images/mobile-banner.png";

import Image from "next/image";

import carname from "@/assets/images/caryen.png";
import { Cms } from "@/types/cms.type";

export interface CmsType extends Cms {
  id: string;
}

const HeroBanner = ({ cms }: { cms: CmsType }) => {
  return (
    <div className="w-screen h-[587px] md:h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center absolute z-0 hidden md:block"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${cms.banner_image})`,
        }}
      />
      <div
        className="w-full h-full bg-cover bg-center absolute z-0 block md:hidden"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${cms.bannermobile})`,
        }}
      />
      <div className="text-white flex flex-col gap-1 justify-center items-center pt-[100px] px-4 md:px-0 !z-50 relative">
        <Image src={carname} alt="" width={300} height={300} priority />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-[42px] font-bold md:font-semibold text-shadow-md text-center leading-relaxed">
            {cms.section1_header}
          </h1>
          <span className="text-base md:text-4xl font-normal">
            {cms.section1_sub}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
