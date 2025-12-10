"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // ใช้ Icon หมุนๆ ตอนโหลด

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // เพิ่มสถานะ Loading
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // เริ่มโหลด ปิดปุ่ม

    // Debug: เช็คว่า URL ถูกต้องไหม (กด F12 ดู Console)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("Attempting login to:", `${apiUrl}/user/login`);

    try {
      const res = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: user,
          password: password,
        }),
      });

      if (!res.ok) {
        // กรณี Server ตอบกลับมาว่า Error (400, 401, 500)
        const errorData = await res.json().catch(() => ({})); // กันกรณี json พัง
        console.error("Login failed response:", errorData);
        toast.error(
          "เข้าสู่ระบบไม่สำเร็จ: " + (errorData.message || "รหัสผ่านผิด")
        );
      } else {
        // กรณีสำเร็จ
        toast.success("เข้าสู่ระบบสำเร็จ");
        // ย้ายไปหน้า Dashboard ใหม่ที่คุณตั้งไว้
        router.push("/dashboard-landing");
      }
    } catch (error) {
      // กรณี Network Error (เช่น ต่อ Server ไม่ได้, เน็ตหลุด, CORS)
      console.error("Network/System Error:", error);
      toast.error("เชื่อมต่อ Server ไม่ได้ กรุณาลองใหม่");
    } finally {
      setIsLoading(false); // หยุดโหลด คืนค่าปุ่ม
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            เข้าสู่ระบบ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Username</label>
              <Input
                type="text"
                placeholder="admin"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                disabled={isLoading} // ล็อกช่องตอนโหลด
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">รหัสผ่าน</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading} // ล็อกช่องตอนโหลด
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังตรวจสอบ...
                </>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
