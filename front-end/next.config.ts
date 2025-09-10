import { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // อนุญาตให้โหลดรูปภาพจากโดเมนเหล่านี้
    domains: [
      "http://150.95.26.51",
      "example.com",
      "cdn.example.com",
      "images.unsplash.com",
      "via.placeholder.com",
    ],

    // หรือใช้ remotePatterns แทน (แนะนำสำหรับ Next.js 12.3+)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // อนุญาตทุกโดเมน HTTPS
      },
      {
        protocol: "http",
        hostname: "150.95.26.51",
        port: "4000",
        pathname: "/uploads/**", // อนุญาตเฉพาะ path /uploads
      },
    ],

    // กำหนดขนาดรูปภาพที่อนุญาต
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // กำหนดขนาดสำหรับ responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // รูปแบบไฟล์ที่รองรับ
    formats: ["image/webp", "image/avif"],

    // เปิดใช้งาน optimization
    unoptimized: false,

    // Loader สำหรับ external image service
    // loader: 'custom',
    // loaderFile: './my-loader.ts',

    // เปิดใช้งาน blur placeholder
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
