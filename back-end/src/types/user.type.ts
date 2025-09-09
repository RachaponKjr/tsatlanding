import z from 'zod';

export const UserReqSchama = z.object({
  username: z.string().min(3, 'Username ต้องมีอย่างน้อย 3 ตัวอักษร'),
  password: z.string().min(6, 'Password ต้องมีอย่างน้อย 6 ตัวอักษร'),
  role: z.enum(['USER', 'ADMIN', 'OWNER']).default('USER'),
});

export type UserReq = z.infer<typeof UserReqSchama>;
