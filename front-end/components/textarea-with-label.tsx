'use client'
import React from 'react'
import { cn } from '../lib/utils';

interface TextareaWithLabelProps {
  label: string
  name: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
  className?: string
}

const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className
}) => {

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) return;

    const newValue = e.target.value;
    
    // ตรวจจับ line breaks (\n) และแทรก <br/> เข้าไป
    const processedValue = newValue.replace(/\n/g, '<br/>');
    
    // สร้าง synthetic event ด้วยข้อความที่ประมวลผลแล้ว
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: processedValue
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    
    onChange(syntheticEvent);
  };

  // แปลง <br/> กลับเป็น \n สำหรับแสดงใน textarea
  const getDisplayValue = (text: string = '') => {
    return text.replace(/<br\/>/g, '\n');
  };

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)}>
      {/* Label */}
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* Textarea */}
      <textarea
        id={name}
        name={name}
        value={getDisplayValue(value)}
        onChange={handleTextChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="border h-max border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8F2F34] focus:border-[#8F2F34] resize-y"
      />

      {/* Helper text */}
      <p className="text-xs text-gray-500">
        กด Enter เพื่อขึ้นบรรทัดใหม่ (จะแปลงเป็น &lt;br/&gt; อัตโนมัติ)
      </p>

      {/* แสดงข้อความจริงที่บันทึก */}
      {value && (
        <details className="mt-1">
          <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
            ดูข้อความที่จะบันทึก ({(value.match(/<br\/>/g) || []).length} บรรทัด)
          </summary>
          <div className="text-xs bg-gray-50 p-2 rounded mt-1 border break-all font-mono">
            {value}
          </div>
        </details>
      )}

      {/* Preview การแสดงผลจริง */}
      {value && (
        <details className="mt-1">
          <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
            ดูตัวอย่างการแสดงผล
          </summary>
          <div className="text-sm bg-blue-50 p-2 rounded mt-1 border">
            {renderTextWithBreaks(value)}
          </div>
        </details>
      )}
    </div>
  )
}

// Helper function สำหรับแสดงผลข้อความที่มี <br/>
export const renderTextWithBreaks = (text: string) => {
  if (!text) return null;
  
  return text.split('<br/>').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
};

// Hook สำหรับจัดการข้อความ
export const useTextWithBreaks = () => {
  // แปลงข้อความปกติให้มี <br/>
  const convertLineBreaks = (text: string) => {
    return text.replace(/\n/g, '<br/>');
  };

  // แปลง <br/> กลับเป็น \n
  const convertToPlainText = (text: string) => {
    return text.replace(/<br\/>/g, '\n');
  };

  // นับจำนวนบรรทัด
  const countLines = (text: string) => {
    return (text.match(/<br\/>/g) || []).length + 1;
  };

  // ลบ <br/> ทั้งหมด
  const removeAllBreaks = (text: string) => {
    return text.replace(/<br\/>/g, '');
  };

  // ตรวจสอบว่ามี line breaks หรือไม่
  const hasLineBreaks = (text: string) => {
    return text.includes('<br/>');
  };

  return {
    convertLineBreaks,
    convertToPlainText,
    countLines,
    removeAllBreaks,
    hasLineBreaks,
    renderTextWithBreaks
  };
};

export default TextareaWithLabel