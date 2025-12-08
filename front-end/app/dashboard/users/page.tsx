"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// mock data
type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [addUser, setAddUser] = useState<Omit<User, "id">>({
    username: "",
    password: "",
    role: "USER",
  });
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const router = useRouter();

  // toggle password visibility
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  // ดึงข้อมูลผู้ใช้
  const getUsers = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/get-users`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setUsers(data.data);
    } else {
      router.push(data.redirect || `/login`);
      toast("ไม่สามารถดึงข้อมูลผู้ใช้ได้ !", { className: "!text-red-500" });
    }
  }, [router]);

  // กดแก้ไข
  const handleEdit = (user: User) => {
    setEditingUser({ ...user, password: "" }); // reset password เวลาแก้ไข
    setShowEditPassword(false);
    setOpen(true);
  };

  // กดสร้าง user
  const handelAddUser = async () => {
    if (!addUser.username || !addUser.password) {
      toast("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน", { className: "!text-red-500" });
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
        credentials: "include",
      }
    );

    const data = await res.json();
    if (res.ok) {
      toast("สร้างสำเร็จ", { className: "!text-green-500" });
      await getUsers();
      setOpenAdd(false);
      setAddUser({ username: "", password: "", role: "USER" });
    } else {
      toast("ไม่สามารถสร้างได้", { className: "!text-red-500" });
      await getUsers();
      console.log(data, "ERROR");
    }
  };

  // กดบันทึกแก้ไข
  const handleSave = async () => {
    if (!editingUser) return;

    const payload = {
      username: editingUser.username,
      password: editingUser.password ? editingUser.password : undefined,
      role: editingUser.role,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/update-user/${editingUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );

    const data = await res.json();
    if (res.ok) {
      toast("อัพเดทสำเร็จ", { className: "!text-green-500" });
      await getUsers();
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...editingUser, password: "" } // reset password หลังบันทึก
            : u
        )
      );
    } else {
      router.push(data.redirect);
      console.log(data, "ERROR");
    }

    setOpen(false);
    setShowEditPassword(false);
  };

  useEffect(() => {
    void getUsers();
  }, [getUsers]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold text-[#333]">จัดการผู้ใช้</h4>
        <Button
          size="sm"
          variant="outline"
          className="bg-green-500 text-white hover:bg-green-400"
          onClick={() => setOpenAdd(true)}
        >
          สร้างผู้ใช้
        </Button>
      </div>

      {/* ตาราง */}
      <Table>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead>ลำดับ</TableHead>
            <TableHead className="text-center">ชื่อ</TableHead>
            <TableHead className="text-center">สิทธิ์</TableHead>
            <TableHead className="text-center">การจัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} className="text-center">
              <TableCell className="text-left">{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(user)}
                >
                  แก้ไข
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog: สร้างผู้ใช้ */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>สร้างผู้ใช้งาน</DialogTitle>
          </DialogHeader>
          {openAdd && (
            <div className="space-y-4">
              <div>
                <label className="text-sm">ชื่อ</label>
                <Input
                  value={addUser.username}
                  onChange={(e) =>
                    setAddUser({ ...addUser, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm">รหัสผ่าน</label>
                <div className="relative">
                  <Input
                    type={showAddPassword ? "text" : "password"}
                    value={addUser.password}
                    onChange={(e) =>
                      setAddUser({ ...addUser, password: e.target.value })
                    }
                    placeholder="รหัสผ่านใหม่"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500"
                    onClick={() => setShowAddPassword(!showAddPassword)}
                  >
                    {showAddPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm">สิทธิ์</label>
                <Select
                  value={addUser.role}
                  onValueChange={(value) =>
                    setAddUser({ ...addUser, role: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกสิทธิ์" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="OWNER">OWNER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handelAddUser}>บันทึก</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: แก้ไข */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แก้ไขผู้ใช้</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm">ชื่อ</label>
                <Input
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm">รหัสผ่าน</label>
                <div className="relative">
                  <Input
                    type={showEditPassword ? "text" : "password"}
                    value={editingUser.password}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        password: e.target.value,
                      })
                    }
                    placeholder="รหัสผ่านใหม่"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500"
                    onClick={() => setShowEditPassword(!showEditPassword)}
                  >
                    {showEditPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm">สิทธิ์</label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) =>
                    setEditingUser({ ...editingUser, role: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกสิทธิ์" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="OWNER">OWNER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSave}>บันทึก</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
