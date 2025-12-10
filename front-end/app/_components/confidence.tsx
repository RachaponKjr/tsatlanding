"use client";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import LineIcon from "@/assets/icons/line";
import PhoneIcon from "@/assets/icons/phone";
import { CmsType } from "./hero-banner";
import { ContactProps } from "@/components/footer";

const Confidence = ({
  cms,
  contact,
}: {
  cms: CmsType;
  contact: ContactProps;
}) => {
  return (
    <div className="relative flex flex-col md:flex-row overflow-hidden items-center my-[55px] md:my-[130px] px-4 md:px-0 gap-2 md:gap-0 border-b border-[#1f1f1f] md:border-b-0 pb-4 md:pb-0">
      <div className="container mx-auto flex flex-1 flex-col">
        <div className="max-w-2xl md:max-w-2xl flex flex-col">
          <h4
            className="text-[#8F2F34] text-2xl md:text-4xl font-bold leading-relaxed"
            dangerouslySetInnerHTML={{ __html: cms.about_head || "" }}
          />
          <p
            className="text-xl md:text-4xl text-[#4f4f4f] font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: cms.about_detail || "" }}
          />
        </div>
        <div className="flex justify-start md:justify-center items-center gap-4 mt-2 w-full md:w-max">
          <Button
            onClick={() => window.open(`${contact.web_url}`)}
            className="text-[#8F2F34] h-full text-xl cursor-pointer hover:bg-transparent font-bold bg-transparent border"
          >
            จองคิววันนี้
          </Button>
          <div
            onClick={() => window.open(`${contact.line_url}`)}
            className="bg-[#00C300] p-1 rounded-sm aspect-square w-10 flex justify-center items-center cursor-pointer"
          >
            <LineIcon size={24} />
          </div>
          <a
            href={`tel:${contact?.phone_number}`}
            className="bg-[#8F2F34] p-1 rounded-sm w-10 aspect-square flex justify-center items-center cursor-pointer"
          >
            <PhoneIcon size={18} />
          </a>
        </div>
      </div>

      <Image
        src={`/landing-uploads${cms.about_image}`}
        alt=""
        width={600}
        height={600}
        className="md:absolute relative right-0 -mr-8"
        loading="lazy"
      />
    </div>
  );
};

export default Confidence;
