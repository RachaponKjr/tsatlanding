"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface TextareaWithLabelProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value"
  > {
  label: string;
  name: string;
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  helperText?: string; // เพิ่ม prop เผื่ออยากเปลี่ยนข้อความแนะนำ
}

const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  className,
  helperText = "กด Enter เพื่อขึ้นบรรทัดใหม่ (ระบบจะแปลงเป็น <br/> อัตโนมัติ)",
  ...props
}) => {
  // แปลงค่าจาก <br/> เป็น \n เพื่อแสดงผลใน textarea
  const displayValue = useMemo(() => {
    if (!value) return "";
    return value.replace(/<br\/>/g, "\n");
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) return;

    const newValue = e.target.value;
    // แปลง \n กลับเป็น <br/> ก่อนส่งให้ Parent
    const processedValue = newValue.replace(/\n/g, "<br/>");

    // สร้าง Synthetic Event ปลอมๆ เพื่อส่งกลับไปให้ Parent ใช้งานได้เหมือนปกติ
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: processedValue,
        name: name, // สำคัญ: ต้องส่ง name กลับไปด้วยเพื่อให้ Generic Handler ทำงานได้
      },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    onChange(syntheticEvent);
  };

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <textarea
        id={name}
        name={name}
        value={displayValue}
        onChange={handleTextChange}
        className="border min-h-[100px] border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8F2F34] focus:border-[#8F2F34] resize-y"
        {...props}
      />

      <p className="text-xs text-gray-500">{helperText}</p>

      {/* Preview Section (Optional: ซ่อนไว้ถ้าไม่จำเป็นต้องดูตลอด) */}
      {value && (
        <details className="mt-1 group">
          <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 select-none">
            ดูตัวอย่างการแสดงผลจริง
          </summary>
          <div className="text-sm bg-blue-50 p-2 rounded mt-1 border text-gray-700">
            {renderTextWithBreaks(value)}
          </div>
        </details>
      )}
    </div>
  );
};

// Helper function
export const renderTextWithBreaks = (text?: string | null) => {
  if (!text) return null;
  return text.split("<br/>").map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
};

export default TextareaWithLabel;
