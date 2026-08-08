import { z } from "zod";

export const businessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "نام کسب‌وکار حداقل ۲ کاراکتر باشد")
    .max(100, "نام کسب‌وکار حداکثر ۱۰۰ کاراکتر باشد"),

  description: z
    .string()
    .trim()
    .min(10, "توضیحات حداقل ۱۰ کاراکتر باشد")
    .max(1000, "توضیحات حداکثر ۱۰۰۰ کاراکتر باشد"),

  phone: z
    .string()
    .trim()
    .regex(
      /^09\d{9}$/,
      "شماره موبایل معتبر نیست"
    ),

  email: z
    .string()
    .trim()
    .email("ایمیل معتبر نیست")
    .max(150, "ایمیل بیش از حد طولانی است"),

  address: z
    .string()
    .trim()
    .min(5, "آدرس معتبر نیست")
    .max(300, "آدرس حداکثر ۳۰۰ کاراکتر باشد"),

  logo: z
    .string()
    .max(500)
    .optional()
    .nullable(),
});