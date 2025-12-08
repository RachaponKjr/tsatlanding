"use client";
import React, { useState } from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronDown,
  FileText,
  ShoppingCart,
  Calendar,
  File,
  BadgeQuestionMark,
  Contact,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const router = useRouter();
  const sidebarItems: SidebarItem[] = [
    {
      id: "cms",
      label: "จัดการหน้าเว็บ",
      icon: <File className="w-5 h-5" />,
      href: "/dashboard",
    },
    {
      id: "faq",
      label: "จัดการช้อมูล FAQ",
      icon: <BadgeQuestionMark className="w-5 h-5" />,
      href: "/dashboard/faq",
    },
    {
      id: "contact",
      label: "จัดการช้อมูลการติดต่อ",
      icon: <Contact className="w-5 h-5" />,
      href: "/dashboard/contact",
    },
    {
      id: "seosetup",
      label: "จัดการ SEO",
      icon: <Settings className="w-5 h-5" />,
      href: "",
      children: [
        {
          id: "reports",
          label: "จัดการ SEO พื้นฐาน",
          icon: <FileText className="w-4 h-4" />,
          href: "/dashboard/seosetup/basic",
        },
      ],
    },
    {
      id: "usersetup",
      label: "จัดการผู้ใช้",
      icon: <Users className="w-5 h-5" />,
      href: "/dashboard/users",
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const logout = async () => {
    try {
      // เรียก API logout ถ้ามี หรือแค่ล้าง cookie ที่ client
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/logout`, {
        method: "POST",
        credentials: "include", // สำคัญสำหรับ cookie
      });

      // redirect ไปหน้า login
      router.push("/login");
      toast("ออกจากระบบเรียบร้อย", { className: "!text-green-500" });
    } catch (err) {
      console.error(err);
      toast("เกิดข้อผิดพลาดในการออกจากระบบ", { className: "!text-red-500" });
    }
  };

  const SidebarItem: React.FC<{ item: SidebarItem; level?: number }> = ({
    item,
    level = 0,
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div className="mb-1 shrink-0">
        <div
          className={`flex items-center justify-between  text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer rounded-lg mx-2 ${
            level > 0 ? "ml-2" : ""
          }`}
          onClick={() => hasChildren && toggleExpanded(item.id)}
        >
          {item.href != "" ? (
            <Link
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-3 px-4 py-3">
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          )}
          {hasChildren && (
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4">
            {item.children?.map((child) => (
              <SidebarItem key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex lg:flex-col w-64 bg-gray-800 transition-all duration-300 ${
          isOpen ? "lg:w-64" : "lg:w-16"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          {isOpen && (
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
          )}
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-white p-1"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className={`mt-2 overflow-y-auto flex-1 ${!isOpen && "px-2"}`}>
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`mb-1 ${!isOpen && "flex justify-center"}`}
            >
              {isOpen ? (
                <SidebarItem item={item} />
              ) : (
                <div className="flex items-center justify-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer rounded-lg group relative">
                  {item.icon}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.label}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="px-2">
          <Button
            onClick={logout}
            variant={"outline"}
            className="my-4 cursor-pointer w-full"
          >
            ออกจากระบบ
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <button onClick={onToggle} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-2 overflow-y-auto h-full pb-20">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
