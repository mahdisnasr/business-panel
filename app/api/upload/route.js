import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(request) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          error:
            "فایلی انتخاب نشده است.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedTypes = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    if (!allowedTypes[file.type]) {
      return NextResponse.json(
        {
          error:
            "فرمت تصویر مجاز نیست.",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        {
          error:
            "حجم تصویر بیشتر از ۲ مگابایت است.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "uploads"
      );

    await mkdir(uploadDir, {
      recursive: true,
    });

    const filename =
      `${crypto.randomUUID()}${allowedTypes[file.type]}`;

    const filepath =
      path.join(
        uploadDir,
        filename
      );

    await writeFile(
      filepath,
      buffer
    );

    return NextResponse.json({
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "خطا در آپلود تصویر",
      },
      {
        status: 500,
      }
    );
  }
}