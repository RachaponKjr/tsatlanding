import React from "react";
import ItemCayenneService from "./item-cayenne-service";

import item1 from "@/assets/images/item1.png";
import item2 from "@/assets/images/item2.png";
import item3 from "@/assets/images/item3.png";
import { CmsType } from "./hero-banner";

const CayenneService = ({
  className,
  cms,
}: {
  className?: string;
  cms: CmsType;
}) => {
  return (
    <div className="py-[60px] bg-gradient-to-b from-[#999999]/20 to-[#FFFFFF] px-4 md:px-0">
      <div className="container mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2
            className="text-[#8F2F34] text-xl md:text-3xl font-semibold text-center"
            dangerouslySetInnerHTML={{ __html: cms.section3_header || "" }}
          />
          <h3
            className="font-semibold text-xl md:text-2xl leading-relaxed text-[#1f1f1f] text-center"
            dangerouslySetInnerHTML={{ __html: cms.section3_sub || "" }}
          />
        </div>
        {/* Grid 3 Item */}
        <div className="flex flex-col md:grid grid-cols-3 gap-10 md:gap-8">
          <ItemCayenneService
            image={`/landing-uploads${cms.section3_item1_image}`}
            detail={cms.section3_item1_sub}
            title={cms.section3_item1_header}
          />
          <ItemCayenneService
            image={`/landing-uploads${cms.section3_item2_image}`}
            detail={cms.section3_item2_sub}
            title={cms.section3_item2_header}
          />
          <ItemCayenneService
            image={`/landing-uploads${cms.section3_item3_image}`}
            detail={cms.section3_item3_sub}
            title={cms.section3_item3_header}
          />
        </div>
      </div>
    </div>
  );
};

export default CayenneService;
