"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Settings,
  Menu,
  X,
  ChevronDown,
  FileText,
  BadgeQuestionMark,
  Contact,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; // ถ้าไม่มี lib/utils ให้ลบ cn ออกเเล้วใช้ template literal ธรรมดา

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // ข้อมูลเมนู
  const sidebarItems: SidebarItem[] = [
    {
      id: "cms",
      label: "ภาพรวมระบบ",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/dashboard",
    },
    {
      id: "web-manage",
      label: "จัดการหน้าเว็บ",
      icon: <Globe className="w-5 h-5" />,
      href: "", // เป็น Parent menu ไม่ต้องมี link
      children: [
        {
          id: "faq",
          label: "ข้อมูล FAQ",
          icon: <BadgeQuestionMark className="w-4 h-4" />,
          href: "/dashboard/faq",
        },
        {
          id: "contact",
          label: "ข้อมูลการติดต่อ",
          icon: <Contact className="w-4 h-4" />,
          href: "/dashboard/contact",
        },
      ],
    },
    {
      id: "seosetup",
      label: "ตั้งค่า SEO",
      icon: <Settings className="w-5 h-5" />,
      href: "",
      children: [
        {
          id: "reports",
          label: "SEO พื้นฐาน",
          icon: <FileText className="w-4 h-4" />,
          href: "/dashboard/seosetup/basic",
        },
      ],
    },
    {
      id: "usersetup",
      label: "ผู้ใช้งานระบบ",
      icon: <Users className="w-5 h-5" />,
      href: "/dashboard/users",
    },
  ];

  // เปิดเมนูอัตโนมัติถ้า Route ปัจจุบันอยู่ใน Submenu นั้น
  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.href === pathname
        );
        if (hasActiveChild && !expandedItems.includes(item.id)) {
          setExpandedItems((prev) => [...prev, item.id]);
        }
      }
    });
  }, [pathname]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
      toast.success("ออกจากระบบเรียบร้อย");
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    }
  };

  // --- Sub Component สำหรับเรนเดอร์แต่ละรายการ ---
  const MenuItem = ({
    item,
    level = 0,
  }: {
    item: SidebarItem;
    level?: number;
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive =
      item.href === pathname ||
      (hasChildren && item.children?.some((c) => c.href === pathname));

    // CSS Classes สำหรับ State ต่างๆ
    const baseClasses = `
      flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 group
      ${
        isActive
          ? "bg-blue-600/10 text-blue-500 font-semibold"
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
      }
      ${level > 0 ? "text-sm pl-11" : ""}
    `;

    const content = (
      <>
        <div className="flex items-center gap-3">
          <span
            className={`${
              isActive
                ? "text-blue-500"
                : "text-slate-500 group-hover:text-slate-200"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={!isOpen && level === 0 ? "hidden lg:hidden" : "block"}
          >
            {item.label}
          </span>
        </div>
        {hasChildren && isOpen && (
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        )}
      </>
    );

    return (
      <div className="mb-1">
        {item.href && !hasChildren ? (
          <Link href={item.href} className={baseClasses}>
            {content}
          </Link>
        ) : (
          <button
            onClick={() => toggleExpanded(item.id)}
            className={baseClasses}
          >
            {content}
          </button>
        )}

        {/* Render Children */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            hasChildren && isExpanded ? "max-h-96" : "max-h-0"
          }`}
        >
          {item.children?.map((child) => (
            <MenuItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* --- Mobile Top Bar (แสดงเฉพาะมือถือ) --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-slate-600 dark:text-slate-300"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <span className="font-bold text-lg text-slate-800 dark:text-white">
            Admin Panel
          </span>
        </div>
        {/* อาจจะใส่ Avatar หรือ Logo ตรงนี้เพิ่มได้ */}
      </div>

      {/* --- Desktop & Mobile Sidebar Container --- */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-slate-950 border-r border-slate-800
          transition-all duration-300 ease-in-out shadow-2xl
          ${
            isOpen
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full lg:translate-x-0 lg:w-20"
          }
          lg:static lg:h-screen lg:shrink-0
        `}
      >
        {/* Header ส่วนบนของ Sidebar */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
          <div
            className={`flex items-center gap-2 font-bold text-white transition-opacity duration-300 ${
              !isOpen ? "lg:hidden" : ""
            }`}
          >
            {/* ใส่ Logo ตรงนี้ได้ */}
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              A
            </div>
            <span>Admin</span>
          </div>

          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {isOpen ? (
              <Menu className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5 mx-auto" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-8rem)] custom-scrollbar">
          {sidebarItems.map((item) =>
            isOpen ? (
              <MenuItem key={item.id} item={item} />
            ) : (
              // กรณีพับหน้าจอ (Collapsed Mode) แสดงเฉพาะ Icon พร้อม Tooltip
              <div
                key={item.id}
                className="group relative flex justify-center py-2"
              >
                <Link
                  href={item.children ? "#" : item.href}
                  className={`p-3 rounded-xl hover:bg-slate-800 transition-colors ${
                    item.href === pathname
                      ? "bg-blue-600/20 text-blue-500"
                      : "text-slate-400"
                  }`}
                >
                  {item.icon}
                </Link>
                {/* Tooltip on Hover */}
                <div className="absolute left-14 top-2 z-50 hidden rounded-md bg-slate-800 px-3 py-2 text-xs text-white shadow-lg group-hover:inline-block whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            )
          )}
        </nav>

        {/* Footer / Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-950 border-t border-slate-800">
          {isOpen ? (
            <Button
              onClick={logout}
              variant="destructive"
              className="w-full flex items-center gap-2 justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-0"
            >
              <LogOut className="w-4 h-4" />
              <span>ออกจากระบบ</span>
            </Button>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={logout}
                className="p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                title="ออกจากระบบ"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* --- Mobile Overlay (พื้นหลังดำจางๆ เวลาเปิดเมนูบนมือถือ) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
