
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const businessSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  phone: z.string().trim().regex(/^09\d{9}$/),
  email: z.string().trim().email().max(150),
  address: z.string().trim().min(5).max(500),
});

async function getBusinessId(params) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

// GET /api/businesses/:id
export async function GET(request, { params }) {
  try {
    const id = await getBusinessId(params);

    if (!id) {
      return NextResponse.json(
        { message: "شناسه کسب‌وکار معتبر نیست" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id },
    });

    if (!business) {
      return NextResponse.json(
        { message: "کسب‌وکار پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error("GET BUSINESS ERROR:", error);

    return NextResponse.json(
      { message: "خطا در دریافت کسب‌وکار" },
      { status: 500 }
    );
  }
}

// PUT /api/businesses/:id
export async function PUT(request, { params }) {
  try {
    const id = await getBusinessId(params);

    if (!id) {
      return NextResponse.json(
        { message: "شناسه کسب‌وکار معتبر نیست" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validation = businessSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "اطلاعات وارد شده معتبر نیست",
          errors: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const business = await prisma.business.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(business);
  } catch (error) {
    console.error("PUT BUSINESS ERROR:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "کسب‌وکار پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "خطا در ویرایش کسب‌وکار" },
      { status: 500 }
    );
  }
}

// DELETE /api/businesses/:id
export async function DELETE(request, { params }) {
  try {
    const id = await getBusinessId(params);

    if (!id) {
      return NextResponse.json(
        { message: "شناسه کسب‌وکار معتبر نیست" },
        { status: 400 }
      );
    }

    await prisma.business.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "کسب‌وکار با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("DELETE BUSINESS ERROR:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "کسب‌وکار پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "خطا در حذف کسب‌وکار" },
      { status: 500 }
    );
  }
}

