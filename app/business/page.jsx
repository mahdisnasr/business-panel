"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EditBusiness from "@/components/EditBusiness";

function BusinessContent() {
  const searchParams =
    useSearchParams();

  const id =
    searchParams.get("id");

  if (!id) {
    return (
      <div className="empty-state">
        شناسه کسب‌وکار مشخص نشده است.
      </div>
    );
  }

  return (
    <EditBusiness id={id} />
  );
}

export default function BusinessPage() {
  return (
    <main className="container">
      <Suspense
        fallback={
          <div className="loading">
            در حال بارگذاری...
          </div>
        }
      >
        <BusinessContent />
      </Suspense>
    </main>
  );
}