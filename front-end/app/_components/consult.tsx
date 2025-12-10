"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import LineIcon from "@/assets/icons/line";
import PhoneIcon from "@/assets/icons/phone";
import { CmsType } from "./hero-banner";
import { ContactProps } from "@/components/footer";
const Consult = ({ cms, contact }: { cms: CmsType; contact: ContactProps }) => {
  return (
    <div className="container mx-auto my-[30px] md:my-20 px-4  flex flex-col gap-[20px] md:gap-20">
      <div className="md:px-10 flex flex-col justify-center items-center gap-3 border-y py-10">
        <h2
          className="text-2xl md:text-4xl font-bold md:font-semibold text-[#8F2F34] text-center leading-relaxed"
          dangerouslySetInnerHTML={{ __html: cms.consult_head || "" }}
        />
        <span
          className="text-[#4f4f4f] text-xl text-center md:text-4xl"
          dangerouslySetInnerHTML={{ __html: cms.consult_detail || "" }}
        />
        <div className="flex justify-center items-center gap-4 mt-2">
          <Button
            onClick={() => window.open(`${contact.web_url}`)}
            className="text-[#8F2F34] h-full text-xl cursor-pointer hover:bg-transparent font-bold bg-transparent border"
          >
            นัดหมายเข้ารับบริการ
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
      <div className="bg-[#F5F5F5] px-[15px] py-8 md:p-10 rounded-[20px] flex flex-col md:flex-row gap-[40px] md:gap-20">
        <div className="flex-1 flex flex-col gap-3">
          <h2
            className="text-[#8F2F34] font-semibold text-2xl md:text-3xl"
            dangerouslySetInnerHTML={{ __html: cms.service_head || "" }}
          />
          <p
            className="text-lg md:text-2xl text-[#1f1f1f]"
            dangerouslySetInnerHTML={{ __html: cms.service_detail || "" }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-5 md:gap-10 ">
          <div className="flex items-center gap-7">
            <Image
              src={`/landing-uploads${cms.icon_service_one}`}
              alt=""
              width={70}
              height={70}
              className="shrink-0 w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
              loading="lazy"
            />
            <div className="flex flex-col gap-1 md:gap-4">
              <h6
                className="text-base md:text-[22px] font-bold text-[#8F2F34]"
                dangerouslySetInnerHTML={{
                  __html: cms.service_item_head_one || "",
                }}
              />
              <p
                className="text-sm md:text-xl text-[#1f1f1f]"
                dangerouslySetInnerHTML={{
                  __html: cms.service_item_detail_one || "",
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-7">
            <Image
              src={`/landing-uploads${cms.icon_service_two}`}
              alt=""
              width={70}
              height={70}
              className="shrink-0 w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
              loading="lazy"
            />
            <div className="flex flex-col gap-1 md:gap-4">
              <h6
                className="text-base md:text-[22px] font-bold text-[#8F2F34]"
                dangerouslySetInnerHTML={{
                  __html: cms.service_item_head_two || "",
                }}
              />
              <p
                className="text-sm md:text-xl text-[#1f1f1f]"
                dangerouslySetInnerHTML={{
                  __html: cms.service_item_detail_two || "",
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-7">
            <Image
              src={`/landing-uploads${cms.icon_service_three}`}
              alt=""
              width={70}
              height={70}
              className="shrink-0 w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
              loading="lazy"
            />
            <div className="flex flex-col gap-1 md:gap-4">
              <h6
                className="text-base md:text-[22px] font-bold text-[#8F2F34]"
                dangerouslySetInnerHTML={{
                  __html: cms.service_item_head_three || "",
                }}
              />
              <p
                className="text-sm md:text-xl text-[#1f1f1f]"
                dangerouslySetInnerHTML={{
                  __html: cms.service_item_detail_three || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consult;
