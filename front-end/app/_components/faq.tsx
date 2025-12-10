"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";

const FAQ = () => {
  // ดึงข้อมูลจาก API
  const [faq, setFaq] = useState<
    { id: number; title: string; detail: string }[]
  >([]);

  const getFAQ = useCallback(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faq/get-faq`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      setFaq(json.data);
    } else {
      console.error("โหลด FAQ ไม่สำเร็จ");
    }
  }, []);

  useEffect(() => {
    void getFAQ();
  }, []);

  return (
    <div className="container mx-auto bg-white flex flex-col md:flex-row gap-4 md:gap-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#8F2F34]">FAQ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-3.5 gap-x-10">
        {faq.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger className="text-start">
              <ItemBox text={item?.title} />
            </DialogTrigger>
            <DialogContent className="!max-w-3xl">
              <DialogTitle className="text-[#8F2F34] md:text-3xl">
                {item?.title}
              </DialogTitle>
              <span
                className="text-2xl text-[#1f1f1f] font-light"
                dangerouslySetInnerHTML={{ __html: item?.detail || "" }}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

const ItemBox = ({ text }: { text: string }) => {
  return (
    <div className="border-b border-[#CCCCCC] p-2 md:p-[10px] h-full cursor-pointer">
      <span className="text-[#1f1f1f] text-sm md:text-xl font-medium">
        {text}
      </span>
    </div>
  );
};

export default FAQ;
