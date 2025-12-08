"use client";
import ImageUploadWithPreview from "@/components/image-upload-per";
import TextareaWithLabel from "@/components/textarea-with-label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [seo, setSeo] = useState({
    id: "",
    slug: "",
    title: "",
    description: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogImageAlt: "",
    ogUrl: "",
    ogSiteName: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterSite: "",
    twitterCreator: "",
    author: "",
    publisher: "",
    ogImage: "",
    twitterImage: "",
  });
  const [ogImage, setOgImage] = useState<File | null>(null);
  const router = useRouter();
  const [ogTwitterImage, setTwitterOgImage] = useState<File | null>(null);

  const getSeo = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/seopage/get-seo-page`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error(`Fetch failed with status ${res.status}`);
      }

      const { data } = await res.json();
      setSeo(data);
    } catch (err) {
      console.error("Error fetching SEO data:", err);
      return null;
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("slug", seo.slug);
      form.append("title", seo.title);
      form.append("description", seo.description);
      form.append("canonical", seo.canonical);
      form.append("ogTitle", seo.ogTitle);
      form.append("ogDescription", seo.ogDescription);
      form.append("ogUrl", seo.ogUrl);
      form.append("ogSiteName", seo.ogSiteName);
      form.append("twitterTitle", seo.twitterTitle);
      form.append("twitterDescription", seo.twitterDescription);
      form.append("twitterSite", seo.twitterSite);
      form.append("twitterCreator", seo.twitterCreator);
      form.append("ogImageAlt", seo.ogImageAlt);
      form.append("author", seo.author);
      form.append("publisher", seo.publisher);
      if (ogImage) {
        form.append("ogImage", ogImage);
      }
      if (ogTwitterImage) {
        form.append("twitterImage", ogTwitterImage);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/seopage/update-seo-page/${seo.id}`,
        {
          method: "PATCH",
          body: form,
          credentials: "include",
        }
      );

      if (res.ok) {
        toast("อัพเดทเรียบร้อย");
        router.refresh();
        return;
      }
      toast("เกิดข้อผิดพลาด");
    } catch (err) {
      console.error("Error fetching SEO data:", err);
      return null;
    }
  };

  useEffect(() => {
    void getSeo();
  }, [getSeo]);

  return (
    <div className="p-4 flex flex-col gap-6">
      <h5 className="text-xl font-semibold text-[#1f1f1f]">
        จัดการ SEO พื้นฐาน
      </h5>
      <div className="flex flex-col w-full gap-4 pb-8 border-b border-[#4f4f4f]">
        <span className="text-2xl font-bold text-[#1f1f1f]">พื้นฐาน</span>
        <div className="grid grid-cols-2 gap-6">
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, title: e.target.value }));
            }}
            value={seo.title}
            name="title"
            label="Title"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, description: e.target.value }));
            }}
            value={seo.description}
            name="description"
            label="description"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, canonical: e.target.value }));
            }}
            value={seo.canonical}
            name="canonical"
            label="canonical"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, slug: e.target.value }));
            }}
            value={seo.slug}
            name="slug"
            label="slug"
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 pb-8 border-b border-[#4f4f4f]">
        <span className="text-2xl font-bold text-[#1f1f1f]">
          จัดการ Og ของเว็บ
        </span>
        <div className="grid grid-cols-2 gap-6">
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, ogTitle: e.target.value }));
            }}
            value={seo.ogTitle}
            name="ogTitle"
            label="ogTitle"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, ogDescription: e.target.value }));
            }}
            value={seo.ogDescription}
            name="ogDescription"
            label="ogDescription"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, ogImageAlt: e.target.value }));
            }}
            value={seo.ogImageAlt}
            name="ogImageAlt"
            label="ogImageAlt"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, ogUrl: e.target.value }));
            }}
            value={seo.ogUrl}
            name="ogUrl"
            label="ogUrl"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, ogSiteName: e.target.value }));
            }}
            value={seo.ogSiteName}
            name="ogSiteName"
            label="ogSiteName"
          />
          <ImageUploadWithPreview
            onChange={setOgImage}
            preview={`/landing-uploads${seo.ogImage}`}
            title="ogImage"
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 pb-8 border-b border-[#4f4f4f]">
        <span className="text-2xl font-bold text-[#1f1f1f]">
          จัดการ Og Twitter ของเว็บ
        </span>
        <div className="grid grid-cols-2 gap-6">
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, twitterTitle: e.target.value }));
            }}
            value={seo.twitterTitle}
            name="twitterTitle"
            label="twitterTitle"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({
                ...prev,
                twitterDescription: e.target.value,
              }));
            }}
            value={seo.twitterDescription}
            name="twitterDescription"
            label="twitterDescription"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, ogImageAlt: e.target.value }));
            }}
            value={seo.ogImageAlt}
            name="ogImageAlt"
            label="ogImageAlt"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, twitterSite: e.target.value }));
            }}
            value={seo.twitterSite}
            name="twitterSite"
            label="twitterSite"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, twitterCreator: e.target.value }));
            }}
            value={seo.twitterCreator}
            name="twitterCreator"
            label="twitterCreator"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, author: e.target.value }));
            }}
            value={seo.author}
            name="author"
            label="author"
          />
          <TextareaWithLabel
            onChange={(e) => {
              setSeo((prev) => ({ ...prev, publisher: e.target.value }));
            }}
            value={seo.publisher}
            name="publisher"
            label="publisher"
          />
          <ImageUploadWithPreview
            onChange={setTwitterOgImage}
            preview={`/landing-uploads${seo.twitterImage}`}
            title="twitterImage"
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        className="h-[56px] bg-green-400 hover:bg-green-500 cursor-pointer font-bold text-lg"
      >
        บันทึก
      </Button>
    </div>
  );
};

export default page;
