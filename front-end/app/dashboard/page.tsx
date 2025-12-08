"use client";
import ImageUploadWithPreview from "@/components/image-upload-per";
import InputWithLabel from "@/components/input-with-lable";
import TextareaWithLabel from "@/components/textarea-with-label";
import { Button } from "@/components/ui/button";
import { Cms } from "@/types/cms.type";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [cms, setCms] = useState<Cms | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerMobile, setBannerMobile] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [banner2, setBanner2] = useState<File | null>(null);
  const [item1, setItem1] = useState<File | null>(null);
  const [item2, setItem2] = useState<File | null>(null);
  const [item3, setItem3] = useState<File | null>(null);
  const [promotionBanner, setPromotionBanner] = useState<File | null>(null);
  const [promotionItem, setPromotionItem] = useState<File | null>(null);
  const [iconServiceOne, setIconServiceOne] = useState<File | null>(null);
  const [iconServiceTwo, setIconServiceTwo] = useState<File | null>(null);
  const [iconServiceThree, setIconServiceThree] = useState<File | null>(null);
  const [aboutimage, setAboutimage] = useState<File | null>(null);
  const router = useRouter();
  const getCMS = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cms/get-cms`,
      { method: "GET" }
    );
    if (res.ok) {
      const { data } = await res.json();
      console.log(data, "CMS!");
      setCms(data);
    }
  }, []);

  const updateCMS = async () => {
    try {
      const formData = new FormData();
      formData.append("section1_header", cms?.section1_header || "");
      formData.append("section1_sub", cms?.section1_sub || "");
      formData.append("section2_header", cms?.section2_header || "");
      formData.append("section2_sub", cms?.section2_sub || "");
      formData.append("section2_sub2", cms?.section2_sub2 || "");
      formData.append("section3_header", cms?.section3_header || "");
      formData.append("section3_sub", cms?.section3_sub || "");
      formData.append(
        "section3_item1_header",
        cms?.section3_item1_header || ""
      );
      formData.append("section3_item1_sub", cms?.section3_item1_sub || "");
      formData.append(
        "section3_item2_header",
        cms?.section3_item2_header || ""
      );
      formData.append("section3_item2_sub", cms?.section3_item2_sub || "");
      formData.append(
        "section3_item3_header",
        cms?.section3_item3_header || ""
      );
      formData.append("section3_item3_sub", cms?.section3_item3_sub || "");
      formData.append("promotion_head", cms?.promotion_head || "");
      formData.append("promotion_detail", cms?.promotion_detail || "");
      formData.append("consult_head", cms?.consult_head || "");
      formData.append("consult_detail", cms?.consult_detail || "");
      formData.append("service_head", cms?.service_head || "");
      formData.append("service_detail", cms?.service_detail || "");
      formData.append(
        "service_item_head_one",
        cms?.service_item_head_one || ""
      );
      formData.append(
        "service_item_detail_one",
        cms?.service_item_detail_one || ""
      );
      formData.append(
        "service_item_head_two",
        cms?.service_item_head_two || ""
      );
      formData.append(
        "service_item_detail_two",
        cms?.service_item_detail_two || ""
      );
      formData.append(
        "service_item_head_three",
        cms?.service_item_head_three || ""
      );
      formData.append(
        "service_item_detail_three",
        cms?.service_item_detail_three || ""
      );
      formData.append("about_head", cms?.about_head || "");
      formData.append("about_detail", cms?.about_detail || "");

      if (banner) {
        formData.append("banner", banner);
      }
      if (bannerMobile) {
        formData.append("bannermobile", bannerMobile);
      }
      if (logo) {
        formData.append("logo", logo);
      }
      if (banner2) {
        formData.append("section2_banner", banner2);
      }
      if (item1) {
        formData.append("item1", item1);
      }
      if (item2) {
        formData.append("item2", item2);
      }
      if (item3) {
        formData.append("item3", item3);
      }
      if (promotionBanner) {
        formData.append("promotion_banner", promotionBanner);
      }
      if (promotionItem) {
        formData.append("promotion_item", promotionItem);
      }
      if (iconServiceOne) {
        formData.append("iconserviceone", iconServiceOne);
      }
      if (iconServiceTwo) {
        formData.append("iconservicetwo", iconServiceTwo);
      }
      if (iconServiceThree) {
        formData.append("iconservicethree", iconServiceThree);
      }
      if (aboutimage) {
        formData.append("aboutimage", aboutimage);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cms/update-cms/${cms?.id}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      if (res.ok) {
        toast("อัพเดท สำเร็จ!");
        router.refresh();
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    void getCMS();
  }, []);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <h5 className="text-xl font-semibold text-[#1f1f1f]">จัดการหน้าเว็บ</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section1_header: e.target.value } : prev
            );
          }}
          value={cms?.section1_header}
          name="section1_header"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section1_sub: e.target.value } : prev
            );
          }}
          value={cms?.section1_sub}
          name="section1_sub"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section2_header: e.target.value } : prev
            );
          }}
          value={cms?.section2_header}
          name="section2_header"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section2_sub: e.target.value } : prev
            );
          }}
          value={cms?.section2_sub}
          name="section2_sub"
          label="canonical"
        />
        <TextareaWithLabel
          value={cms?.section2_sub2}
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section2_sub2: e.target.value } : prev
            );
          }}
          name="section2_sub2"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_header: e.target.value } : prev
            );
          }}
          value={cms?.section3_header}
          name="section3_header"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_sub: e.target.value } : prev
            );
          }}
          value={cms?.section3_sub}
          name="section3_sub"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_item1_header: e.target.value } : prev
            );
          }}
          value={cms?.section3_item1_header}
          name="section3_item1_header"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_item1_sub: e.target.value } : prev
            );
          }}
          value={cms?.section3_item1_sub}
          name="section3_item1_sub"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_item2_header: e.target.value } : prev
            );
          }}
          value={cms?.section3_item2_header}
          name="section3_item2_header"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_item2_sub: e.target.value } : prev
            );
          }}
          value={cms?.section3_item2_sub}
          name="section3_item2_sub"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_item3_header: e.target.value } : prev
            );
          }}
          value={cms?.section3_item3_header}
          name="section3_item3_header"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, section3_item3_sub: e.target.value } : prev
            );
          }}
          value={cms?.section3_item3_sub}
          name="section3_item3_sub"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, promotion_detail: e.target.value } : prev
            );
          }}
          value={cms?.promotion_detail}
          name="promotion_detail"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, consult_head: e.target.value } : prev
            );
          }}
          name="consult_head"
          value={cms?.consult_head}
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, consult_detail: e.target.value } : prev
            );
          }}
          value={cms?.consult_detail}
          name="consult_detail"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, service_head: e.target.value } : prev
            );
          }}
          value={cms?.service_head}
          name="service_head"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, service_detail: e.target.value } : prev
            );
          }}
          value={cms?.service_detail}
          name="service_detail"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, service_item_head_one: e.target.value } : prev
            );
          }}
          value={cms?.service_item_head_one}
          name="service_item_head_one"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, service_item_detail_one: e.target.value } : prev
            );
          }}
          value={cms?.service_item_detail_one}
          name="service_item_detail_one"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, service_item_head_two: e.target.value } : prev
            );
          }}
          value={cms?.service_item_head_two}
          name="service_item_head_two"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, service_item_detail_two: e.target.value } : prev
            );
          }}
          value={cms?.service_item_detail_two}
          name="service_item_detail_two"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, service_item_head_three: e.target.value } : prev
            );
          }}
          value={cms?.service_item_head_three}
          name="service_item_head_three"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev
                ? { ...prev, service_item_detail_three: e.target.value }
                : prev
            );
          }}
          value={cms?.service_item_detail_three}
          name="service_item_detail_three"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, about_head: e.target.value } : prev
            );
          }}
          value={cms?.about_head}
          name="about_head"
          label="canonical"
        />
        <TextareaWithLabel
          onChange={(e) => {
            setCms((prev) =>
              prev ? { ...prev, about_detail: e.target.value } : prev
            );
          }}
          value={cms?.about_detail}
          name="about_detail"
          label="canonical"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.banner_image}`
              : undefined
          }
          onChange={setBanner}
          title="Banner หลัก"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.bannermobile}`
              : undefined
          }
          onChange={setBannerMobile}
          title="Banner mobile หลัก"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image ? `/landing-uploads${cms.logo_image}` : undefined
          }
          onChange={setLogo}
          title="รูป Logo"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.section2_banner_url}`
              : undefined
          }
          onChange={setBanner2}
          title="Banner อันที่ 2"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.section3_item1_image}`
              : undefined
          }
          onChange={setItem1}
          title="รูปบริการ1"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.section3_item2_image}`
              : undefined
          }
          onChange={setItem2}
          title="รูปบริการ2"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.section3_item3_image}`
              : undefined
          }
          onChange={setItem3}
          title="รูปบริการ3"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.promotion_banner}`
              : undefined
          }
          onChange={setPromotionBanner}
          title="รูปPromotion"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.promotion_item_image}`
              : undefined
          }
          onChange={setPromotionItem}
          title="รูปPromotion 2"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.icon_service_one}`
              : undefined
          }
          onChange={setIconServiceOne}
          title="Icon บริการ1"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.icon_service_two}`
              : undefined
          }
          onChange={setIconServiceTwo}
          title="Icon บริการ2"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image
              ? `/landing-uploads${cms.icon_service_three}`
              : undefined
          }
          onChange={setIconServiceThree}
          title="Icon บริการ3"
        />
        <ImageUploadWithPreview
          preview={
            cms?.banner_image ? `/landing-uploads${cms.about_image}` : undefined
          }
          onChange={setAboutimage}
          title="รูปรถ"
        />
      </div>
      <Button
        onClick={updateCMS}
        size={"lg"}
        className="h-13 bg-green-400 hover:bg-green-500 cursor-pointer text-lg font-semibold my-4"
      >
        Update ข้อมูล SEO
      </Button>
    </div>
  );
};

export default page;
