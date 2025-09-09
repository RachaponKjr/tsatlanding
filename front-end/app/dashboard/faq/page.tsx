"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Faq = {
  id: number;
  title: string;
  detail: string;
};

const Page = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [open, setOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Faq | null>(null);
  const [tempQuestion, setTempQuestion] = useState("");
  const [tempAnswer, setTempAnswer] = useState("");

  // โหลดข้อมูล FAQ
  const getFAQ = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/faq/get-faq`,
      { method: "GET" }
    );
    if (res.ok) {
      const data = await res.json();
      setFaqs(data.data);
    } else {
      toast.error("ไม่สามารถโหลดข้อมูลได้", { className: "!text-red-400" });
    }
  }, []);

  // เพิ่ม
  const createFAQ = async () => {
    try {
      const payload: Omit<Faq, "id"> = {
        title: tempQuestion,
        detail: tempAnswer,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/faq/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      if (res.ok) {
        toast.success("สร้างสำเร็จ!", { className: "!text-green-400" });
        closeDialog();
        void getFAQ();
      } else {
        toast.error("สร้างไม่สำเร็จ!", { className: "!text-red-400" });
      }
    } catch {
      toast.error("ไม่สามารถสร้าง FAQ ได้", { className: "!text-red-400" });
    }
  };

  // อัพเดท
  const updateFAQ = async (id: number) => {
    try {
      const payload: Omit<Faq, "id"> = {
        title: tempQuestion,
        detail: tempAnswer,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/faq/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      if (res.ok) {
        toast.success("อัพเดทสำเร็จ", { className: "!text-green-500" });
        closeDialog();
        void getFAQ();
      } else {
        toast.error("ไม่สามารถอัพเดทได้", { className: "!text-red-500" });
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด", { className: "!text-red-500" });
    }
  };

  // ลบ
  const delFaq = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/faq/del/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        toast.success("ลบข้อมูลเรียบร้อยเเล้ว", {
          className: "text-green-500",
        });
        void getFAQ();
      } else {
        toast.error("ไม่สามารถลบได้", { className: "text-red-500" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // โหลดข้อมูลครั้งแรก
  useEffect(() => {
    void getFAQ();
  }, [getFAQ]);

  // ฟังก์ชันปิด Dialog และเคลียร์ state
  const closeDialog = () => {
    setOpen(false);
    setEditingFaq(null);
    setTempQuestion("");
    setTempAnswer("");
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">จัดการ FAQ</h4>
        <Button
          onClick={() => {
            setEditingFaq(null);
            setTempQuestion("");
            setTempAnswer("");
            setOpen(true);
          }}
        >
          เพิ่ม FAQ
        </Button>
      </div>

      {/* FAQ List */}
      <div className="space-y-2">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-4 border rounded-lg shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="font-medium">{faq.title}</p>
              <p className="text-sm text-gray-600">{faq.detail}</p>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingFaq(faq);
                  setTempQuestion(faq.title);
                  setTempAnswer(faq.detail);
                  setOpen(true);
                }}
              >
                แก้ไข
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setConfirmDelete(faq)}
              >
                ลบ
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Add/Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingFaq ? "แก้ไข FAQ" : "เพิ่ม FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="คำถาม"
              value={tempQuestion}
              onChange={(e) => setTempQuestion(e.target.value)}
            />
            <Textarea
              placeholder="คำตอบ"
              value={tempAnswer}
              onChange={(e) => setTempAnswer(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => editingFaq ? updateFAQ(editingFaq.id) : createFAQ()}>
              {editingFaq ? "อัพเดท" : "บันทึก"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Confirm Delete */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการลบ</DialogTitle>
          </DialogHeader>
          <p>
            คุณแน่ใจหรือไม่ว่าต้องการลบ FAQ:{" "}
            <span className="font-medium">{confirmDelete?.title}</span>
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              ยกเลิก
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete) {
                  void delFaq(confirmDelete.id);
                  setConfirmDelete(null);
                }
              }}
            >
              ลบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
