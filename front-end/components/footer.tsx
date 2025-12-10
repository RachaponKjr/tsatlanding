"use client";
import Facebook from "@/assets/icons/facebook";
import Line from "@/assets/icons/line2";
import { cn } from "@/lib/utils";
import { formatPhoneNumber } from "@/utils/format";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export interface ContactProps {
  id: number;
  line_url: string;
  phone_number: string;
  web_url: string;
  email: string;
  facebook: string;
  facebook_url: string;
  instagam: string;
  instagam_url: string;
  line: string;
  phone_number2: string;
}

const Footer = () => {
  const path = usePathname();
  const router = useRouter();
  const [contact, setContact] = useState<ContactProps>();

  const getContact = useCallback(async () => {
    const res = await fetch(`/api/landing/contact/get-contact`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setContact(data.data);
    }
  }, []);

  useEffect(() => {
    void getContact();
  }, []);

  return (
    <footer
      className={cn(
        path === "landing/login" || path.startsWith("landing/dashboard")
          ? "hidden"
          : "block",
        "bg-[#8F2F34] text-white py-6 md:py-12 px-6 sm:px-12"
      )}
    >
      <div className="container mx-auto flex md:flex-row flex-col justify-between gaap-0">
        <div className="max-w-xl hidden lg:flex flex-col gap-[18px]">
          <Image src="/Logowhite.webp" alt="" width={350} height={350} />
          <p className="text-white font-bold">
            Top Service Auto Technic — อู่ซ่อมบำรุง Porsche ครบวงจร เช็คระยะ
            ซ่อมเครื่องยนต์ ระบบไฟฟ้า ลงโปรแกรมด้วย Piwis Tester 3
            มาตรฐานศูนย์บริการ ปอร์เช่ ทั่วโลก
            พร้อมอะไหล่แท้และของเหลวสังเคราะห์ เกรดพรีเมียม
            ดูแลโดยทีมช่างผู้เชี่ยวชาญ
          </p>
          <span className="text-[#BD676B] text-sm font-bold">
            © 2025 Top Service Auto Technic. All rights reserved.
          </span>
        </div>
        <div className="flex items-center justify-center md:justify-start md:items-start flex-wrap-reverse md:flex-nowrap md:flex-col gap-4 font-bold text-sm py-3 md:py-0 border-b border-[#BD676B] md:border-none">
          <div className="flex gap-2">
            <Phone size={20} color="white" />
            <div className="flex flex-row items-center gap-2">
              <a
                href={`tel:${contact?.phone_number}`}
                className="text-base hover:underline"
              >
                {formatPhoneNumber(String(contact?.phone_number))}
              </a>
              <span>/</span>
              <a
                href={`tel:${contact?.phone_number2}`}
                className="text-base hover:underline"
              >
                {formatPhoneNumber(String(contact?.phone_number2))}
              </a>
            </div>
          </div>
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => window.open(`${contact?.line_url}`)}
          >
            <Line size={20} color="white" />
            <span>{contact?.line}</span>
          </div>
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => window.open(`mailto:${contact?.email}`)}
          >
            <Mail size={20} />
            <span>{contact?.email}</span>
          </div>
          <div
            className="flex gap-2 flex-col md:flex-row items-center cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            <MapPin size={20} />
            <span>สาขานิมิตรใหม่ 61 →</span>
          </div>
          <div
            className="flex flex-col md:flex-row items-center gap-2 cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            <MapPin size={20} />
            <span>สาขารัชดาภิเษก 19 →</span>
          </div>
        </div>
        <div className="flex flex-row justify-between md:justify-start md:flex-col gap-4 font-bold text-sm py-3 md:py-0 border-b border-[#BD676B] md:border-none">
          <div
            className="flex flex-col md:flex-row items-center gap-2 cursor-pointer"
            onClick={() => window.open(`${contact?.facebook_url}`)}
          >
            <Facebook color="white" size={20} />
            <span>{contact?.facebook}</span>
          </div>
          <div
            className="flex flex-col md:flex-row items-center gap-2 cursor-pointer"
            onClick={() => window.open(`${contact?.instagam_url}`)}
          >
            <Instagram className="text-[20px]" />
            <span>{contact?.instagam}</span>
          </div>
        </div>
        <div className="flex flex-col md:hidden gap-4 text-center py-3">
          <p className="font-semibold">
            Top Service Auto Technic — อู่ซ่อมบำรุง Porsche ครบวงจร เช็คระยะ
            ซ่อมเครื่องยนต์ ระบบไฟฟ้า ลงโปรแกรมด้วย Piwis Tester 3
            มาตรฐานศูนย์บริการ ปอร์เช่ ทั่วโลก
            พร้อมอะไหล่แท้และของเหลวสังเคราะห์ เกรดพรีเมียม
            ดูแลโดยทีมช่างผู้เชี่ยวชาญ
          </p>
          <span className="text-[#BD676B] text-sm font-bold">
            © 2025 Top Service Auto Technic. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
