"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: user,
          password: password,
        }),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      toast("เข้าสู่ระบบไม่สำเร็จ", { className: "!text-red-500" });

      console.error("Login failed:", error);
    } else {
      toast("เข้าสู่ระบบสำเร็จ", { className: "!text-green-500" });
      router.push("/dashboard");
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
              <label className="block mb-1 text-sm font-medium">อีเมล</label>
              <Input
                type="text"
                placeholder="admin"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
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
              />
            </div>
            <Button type="submit" className="w-full">
              เข้าสู่ระบบ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
