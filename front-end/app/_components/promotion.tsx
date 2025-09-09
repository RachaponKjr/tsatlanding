import React from "react";
import promotionItem from "@/assets/images/promotion-item.png";
import promotionCar from "@/assets/images/promotioncar.png";
import Image from "next/image";
import { CmsType } from "./hero-banner";
const Promotion = ({ cms }: { cms: CmsType }) => {
  return (
    <div className=" container mx-auto md:px-[100px]">
      <div className="w-full bg-red-300 h-max rounded-lg overflow-hidden">
        <div className="w-full aspect-video md:min-h-[331px] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${cms.promotion_banner}`}
            alt=""
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="bg-gradient-to-b from-[#C65359] to-[#8F2F34] p-5 md:py-8 md:px-10 flex flex-col items-center md:flex-row gap-4 relative">
          <div className="flex flex-col gap-3 text-white max-w-xl">
            <h6 className="text-2xl md:text-3xl font-bold ">
             {cms.promotion_head}
            </h6>
            <p className="text-base md:text-xl font-medium">
              {cms.promotion_detail}
            </p>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${cms.promotion_item_image}`}
            alt=""
            width={270}
            height={270}
            className=" md:absolute p-4 top-0 right-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Promotion;
