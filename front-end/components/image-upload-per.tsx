/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

export default function ImageUploadWithPreview({
  title,
  onChange,
  preview,
}: {
  title?: string;
  preview?: string;
  onChange?: (file: File | null) => void;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update previewUrl เมื่อ preview prop เปลี่ยน
  useEffect(() => {
    if (preview && preview !== previewUrl) {
      setPreviewUrl(preview);
      setImage(null); // Reset file เมื่อมี external preview
    }
  }, [preview]);

  // Cleanup object URL เมื่อ component unmount หรือ file เปลี่ยน
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  console.log("Current previewUrl:", previewUrl);
  console.log("Preview prop:", preview);
  console.log("Image file:", image);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Cleanup previous object URL if exists
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      setImage(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      if (onChange) onChange(file);
    }
  };

  const removeImage = () => {
    // Cleanup object URL if exists
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(null);
    setPreviewUrl(preview || null); // Reset กลับไปเป็น external preview หรือ null

    if (onChange) onChange(null);
  };

  // ตรวจสอบว่ามี preview URL หรือไม่
  const hasPreview = previewUrl && previewUrl.trim() !== "";

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <label className="text-base font-medium text-gray-800 dark:text-gray-200">
        {title || "อัพโหลดรูปภาพ"}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {" "}
          (รองรับไฟล์ .jpg, .png)
        </span>
      </label>

      <div className="relative w-full h-64 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-[#f1f1f1] dark:bg-gray-800">
        {hasPreview ? (
          <>
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover w-full h-full"
              onError={(e) => {
                console.error("Image load error:", e);
                setPreviewUrl(null);
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-all z-10"
              title="ลบรูปภาพ"
            >
              <X className="w-4 h-4" />
            </button> */}
          </>
        ) : (
          <label className="flex flex-col justify-center items-center w-full h-full text-xl gap-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <ImageIcon className="w-10 h-10" />
            เลือกรูป
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}
