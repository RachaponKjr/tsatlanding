"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Contact = {
  id: number;
  line?: string;
  line_url?: string;
  phone_number?: string;
  phone_number2?: string;
  facebook?: string;
  fackbook_url?: string;
  instagam?: string;
  instagam_url?: string;
  email?: string;
  web_url?: string;
};

const Page = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  // โหลดข้อมูลจาก API
  const getContact = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/get-contact`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setContact(data.data);
      } else {
        toast.error("โหลดข้อมูลไม่สำเร็จ");
      }
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    }
  };

  // บันทึกข้อมูล
  const updateContact = async () => {
    if (!contact) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/update-contact/${contact.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(contact),
        }
      );
      if (res.ok) {
        toast.success("อัพเดทข้อมูลสำเร็จ!");
        void getContact();
      } else {
        toast.error("ไม่สามารถอัพเดทข้อมูลได้");
      }
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการอัพเดท");
    }
  };

  useEffect(() => {
    void getContact();
  }, []);

  if (!contact) {
    return <p className="p-4">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div className="p-4 space-y-6">
      <h4 className="text-2xl font-bold">จัดการข้อมูลการติดต่อ</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Line"
          value={contact.line || ""}
          onChange={(e) => setContact({ ...contact, line: e.target.value })}
        />
        <Input
          placeholder="Line URL"
          value={contact.line_url || ""}
          onChange={(e) => setContact({ ...contact, line_url: e.target.value })}
        />
        <Input
          placeholder="เบอร์โทรศัพท์หลัก"
          value={contact.phone_number || ""}
          onChange={(e) =>
            setContact({ ...contact, phone_number: e.target.value })
          }
        />
        <Input
          placeholder="เบอร์โทรศัพท์สำรอง"
          value={contact.phone_number2 || ""}
          onChange={(e) =>
            setContact({ ...contact, phone_number2: e.target.value })
          }
        />
        <Input
          placeholder="Facebook"
          value={contact.facebook || ""}
          onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
        />
        <Input
          placeholder="Facebook URL"
          value={contact.fackbook_url || ""}
          onChange={(e) =>
            setContact({ ...contact, fackbook_url: e.target.value })
          }
        />
        <Input
          placeholder="Instagram"
          value={contact.instagam || ""}
          onChange={(e) => setContact({ ...contact, instagam: e.target.value })}
        />
        <Input
          placeholder="Instagram URL"
          value={contact.instagam_url || ""}
          onChange={(e) =>
            setContact({ ...contact, instagam_url: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={contact.email || ""}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <Input
          placeholder="Website URL"
          value={contact.web_url || ""}
          onChange={(e) => setContact({ ...contact, web_url: e.target.value })}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={updateContact}>บันทึกการแก้ไข</Button>
      </div>
    </div>
  );
};

export default Page;
