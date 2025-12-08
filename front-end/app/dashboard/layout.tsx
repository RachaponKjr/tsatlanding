"use client";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const router = useRouter();
  const checkToken = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/check-token`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
        } else {
          router.push(`${data.redirect}` || `/login`);
        }
      })
      .catch((err) => {
        console.log(err, "ERROR");
      });
  }, []);
  useEffect(() => {
    void checkToken();
  }, [checkToken]);
  return (
    <section className="flex h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="p-4 w-full h-full flex-1 overflow-hidden overflow-y-scroll">
        <div className="border shadow rounded-2xl w-full">{children}</div>
      </div>
    </section>
  );
}
