import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const businessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "نام کسب‌وکار حداقل باید ۲ کاراکتر باشد")
    .max(100, "نام کسب‌وکار خیلی طولانی است"),

  description: z
    .string()
    .trim()
    .min(10, "توضیحات حداقل باید ۱۰ کاراکتر باشد")
    .max(1000, "توضیحات خیلی طولانی است"),

  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  email: z
    .string()
    .trim()
    .email("ایمیل معتبر نیست")
    .max(150, "ایمیل خیلی طولانی است"),

  address: z
    .string()
    .trim()
    .min(5, "آدرس کوتاه است")
    .max(500, "آدرس خیلی طولانی است"),
});

// GET /api/businesses
export async function GET() {
  try {
    const businesses = await prisma.business.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(businesses);
  } catch (error) {
    console.error("GET /api/businesses:", error);

    return NextResponse.json(
      {
        message: "خطا در دریافت اطلاعات",
      },
      {
        status: 500,
      }
    );
  }
}

// POST /api/businesses
export async function POST(request) {
  try {
    const body = await request.json();

    const validation = businessSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "اطلاعات وارد شده معتبر نیست",
          errors: validation.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const business = await prisma.business.create({
      data: {
        name: validation.data.name,
        description: validation.data.description,
        phone: validation.data.phone,
        email: validation.data.email,
        address: validation.data.address,
      },
    });

    return NextResponse.json(business, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/businesses:", error);

    return NextResponse.json(
      {
        message: "خطا در ثبت کسب‌وکار",
      },
      {
        status: 500,
      }
    );
  }
}