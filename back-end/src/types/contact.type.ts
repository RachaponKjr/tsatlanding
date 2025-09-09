import z from 'zod';

export const ContactSchama = z.object({
  line_url: z
    .string()
    .url('Line URL ต้องเป็นลิงก์ที่ถูกต้อง')
    .regex(/^https:\/\/.+/, 'Line URL ต้องขึ้นต้นด้วย https://')
    .optional(),

  phone_number: z
    .string()
    .regex(/^0[0-9]{8,9}$/, 'เบอร์โทรต้องขึ้นต้นด้วย 0 และมี 9–10 หลัก')
    .optional(),

  web_url: z
    .string()
    .url('Web URL ต้องเป็นลิงก์ที่ถูกต้อง')
    .regex(/^https:\/\/.+/, 'Web URL ต้องขึ้นต้นด้วย https://')
    .optional(),
});

export type Contact = z.infer<typeof ContactSchama>;
