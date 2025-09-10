"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import LineIcon from "@/assets/icons/line";
import PhoneIcon from "@/assets/icons/phone";
import { CmsType } from "./hero-banner";
import { ContactProps } from "@/components/footer";

const CayenneInfo = ({
  cms,
  contact,
}: {
  cms: CmsType;
  contact: ContactProps;
}) => {
  return (
    <div className="py-10 md:py-20 container mx-auto bg-white flex flex-col gap-4 px-4 md:px-0">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-[#8F2F34] text-xl md:text-3xl font-semibold text-center">
          {cms.section2_header}
        </h2>
        <p
          className="text-base md:text-2xl text-[#1f1f1f] text-center font-light"
          dangerouslySetInnerHTML={{ __html: cms.section2_sub || "" }}
        />
      </div>
      <div className="w-full aspect-[16/6] rounded-[20px] bg-neutral-100 relative overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${cms.section2_banner_url}`}
          alt=""
          fill
          style={{objectFit:"cover",objectPosition:"center"}}
          loading="lazy"
        />
      </div>
      <p
        className="text-base md:text-2xl text-[#1f1f1f] font-light text-center"
        dangerouslySetInnerHTML={{ __html: cms.section2_sub2 || "" }}
      />
      <div className="flex justify-center items-center gap-4 mt-2">
        <Button
          onClick={() => {
            window.open(`${contact.web_url}`);
          }}
          className="text-[#8F2F34] text-xl cursor-pointer hover:bg-transparent font-bold bg-transparent border"
        >
          ปรึกษางานซ่อม
        </Button>
        <div
          onClick={() => window.open(`${contact.line_url}`)}
          className="bg-[#00C300] p-1 rounded-sm aspect-square w-10 flex justify-center items-center cursor-pointer"
        >
          <LineIcon size={24} />
        </div>
        <a
          href={`tel:${contact?.phone_number2}`}
          className="bg-[#8F2F34] p-1 rounded-sm w-10 aspect-square flex justify-center items-center cursor-pointer"
        >
          <PhoneIcon size={18} />
        </a>
      </div>
    </div>
  );
};

export default CayenneInfo;
