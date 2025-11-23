import Image from "next/image";
import Link from "next/link";
import React from "react";

import image1 from "@/assets/images/image1.png";
import image2 from "@/assets/images/image2.png";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="container mx-auto md:pt-10 pb-[60px] px-4 md:px-0">
      <div className="text-[#8F2F34] font-semibold text-center space-y-3 mb-3 md:mb-0">
        <h2 className="text-xl md:text-3xl">
          เข้าชมเว็บไซต์เพื่อดูบริการด้านอื่นๆ
        </h2>
        <Link
          href={"https://topserviceautotechnic.com"}
          className="text-sm md;text-[22px] cursor-pointer"
        >
          www.topserviceautotechnic.com →
        </Link>
      </div>
      <div className="flex justify-evenly relative">
        <div className="flex flex-col justify-center items-center gap-1 z-10">
          <Image src={image1} alt="" width={500} height={500} />
          <span className="text-[#8F2F34] font-light">สาขานิมิตรใหม่ 61</span>
          <Button className="bg-[#8F2F34] hover:bg-[#8F2F34] text-white rounded-full font-medium mt-2 cursor-pointer">
            แผนที่ →
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 z-10">
          <Image src={image2} alt="" width={500} height={500} loading="lazy" />
          <span className="text-[#8F2F34] font-semibold">
            สาขานิมิตรใหม่ 61
          </span>
          <Button className="bg-[#8F2F34] hover:bg-[#8F2F34] text-white rounded-full font-medium mt-2 cursor-pointer">
            แผนที่ →
          </Button>
        </div>
        <div className=" absolute bg-gradient-to-b from-[#999999]/20 to-[#FFFFFF] h-[10rem] w-screen bottom-10" />
      </div>
    </div>
  );
};

export default Contact;
