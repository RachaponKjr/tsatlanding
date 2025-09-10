import Image from "next/image";
import React from "react";

const ItemCayenneService = ({
  title,
  detail,
  image,
}: {
  title?: string;
  detail?: string;
  image?: string;
}) => {
  return (
    <div className="flex flex-row items-start even:flex-row-reverse md:even:flex-col md:flex-col gap-4">
      <div className=" w-full aspect-square bg-neutral-500 rounded-[10px] md:rounded-[20px] relative overflow-hidden">
        <Image
          src={image || ""}
          alt=""
          fill
          style={{objectFit:"cover",objectPosition:"center"}}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-[10px] text-[#1f1f1f]">
        <h3 className="text-xl md:text-2xl font-semibold ">{title}</h3>
        <p className="text-base md:text-[22px] font-light">{detail}</p>
      </div>
    </div>
  );
};

export default ItemCayenneService;
