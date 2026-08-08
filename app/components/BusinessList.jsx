
"use client";

import { useEffect, useState } from "react";

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // دریافت لیست کسب‌وکارها
  async function loadBusinesses() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/businesses", {
        method: "GET",
        cache: "no-store",
      });

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("پاسخ نامعتبر از سرور دریافت شد");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "خطا در دریافت اطلاعات"
        );
      }

      setBusinesses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Load businesses:", error);
      setError(error.message || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  // دریافت اطلاعات هنگام باز شدن صفحه
  useEffect(() => {
    loadBusinesses();

    function handleBusinessCreated() {
      loadBusinesses();
    }

    window.addEventListener(
      "business-created",
      handleBusinessCreated
    );

    return () => {
      window.removeEventListener(
        "business-created",
        handleBusinessCreated
      );
    };
  }, []);

  // حذف کسب‌وکار
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این کسب‌وکار را حذف کنید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `/api/businesses/${id}`,
        {
          method: "DELETE",
        }
      );

      const contentType =
        response.headers.get("content-type");

      let data;

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text || "پاسخ نامعتبر از سرور دریافت شد"
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "حذف کسب‌وکار انجام نشد"
        );
      }

      // حذف از لیست بدون نیاز به رفرش صفحه
      setBusinesses((currentBusinesses) =>
        currentBusinesses.filter(
          (business) => business.id !== id
        )
      );
    } catch (error) {
      console.error("Delete business:", error);
      setError(
        error.message || "خطا در حذف کسب‌وکار"
      );
    } finally {
      setDeletingId(null);
    }
  }

  // باز کردن فرم ویرایش
  function handleEdit(business) {
    setError("");

    setEditingBusiness({
      id: business.id,
      name: business.name || "",
      description: business.description || "",
      phone: business.phone || "",
      email: business.email || "",
      address: business.address || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // تغییر مقادیر فرم ویرایش
  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditingBusiness((currentBusiness) => ({
      ...currentBusiness,
      [name]: value,
    }));
  }

  // ذخیره ویرایش
  async function handleUpdate(event) {
    event.preventDefault();

    if (!editingBusiness) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `/api/businesses/${editingBusiness.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingBusiness.name,
            description: editingBusiness.description,
            phone: editingBusiness.phone,
            email: editingBusiness.email,
            address: editingBusiness.address,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type");

      let data;

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text || "پاسخ نامعتبر از سرور دریافت شد"
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "ویرایش کسب‌وکار انجام نشد"
        );
      }

      // آپدیت کسب‌وکار در لیست
      setBusinesses((currentBusinesses) =>
        currentBusinesses.map((business) =>
          business.id === data.id
            ? data
            : business
        )
      );

      // بستن فرم
      setEditingBusiness(null);
    } catch (error) {
      console.error("Update business:", error);
      setError(
        error.message || "خطا در ویرایش کسب‌وکار"
      );
    } finally {
      setSaving(false);
    }
  }

  // لغو ویرایش
  function handleCancelEdit() {
    setEditingBusiness(null);
    setError("");
  }

  // Loading
  if (loading) {
    return (
      <div className="loading">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  return (
    <>
      {/* خطا */}
      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {/* فرم ویرایش */}
      {editingBusiness && (
        <section className="card edit-card">
          <div className="card-title">
            ویرایش کسب‌وکار
          </div>

          <form
            className="form"
            onSubmit={handleUpdate}
          >
            <div className="form-row">
              <div className="field">
                <label htmlFor="edit-name">
                  نام کسب‌وکار
                </label>

                <input
                  id="edit-name"
                  type="text"
                  name="name"
                  value={editingBusiness.name}
                  onChange={handleEditChange}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>

              <div className="field">
                <label htmlFor="edit-phone">
                  شماره موبایل
                </label>

                <input
                  id="edit-phone"
                  type="tel"
                  name="phone"
                  value={editingBusiness.phone}
                  onChange={handleEditChange}
                  placeholder="09123456789"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="edit-email">
                  ایمیل
                </label>

                <input
                  id="edit-email"
                  type="email"
                  name="email"
                  value={editingBusiness.email}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="edit-address">
                  آدرس
                </label>

                <input
                  id="edit-address"
                  type="text"
                  name="address"
                  value={editingBusiness.address}
                  onChange={handleEditChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="edit-description">
                توضیحات
              </label>

              <textarea
                id="edit-description"
                name="description"
                value={editingBusiness.description}
                onChange={handleEditChange}
                required
                minLength={10}
                maxLength={1000}
              />
            </div>

            <div className="edit-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={saving}
              >
                {saving
                  ? "در حال ذخیره..."
                  : "ذخیره تغییرات"}
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                انصراف
              </button>
            </div>
          </form>
        </section>
      )}

      {/* عنوان لیست */}
      <div className="list-header">
        <div>
          <h2>کسب‌وکارهای ثبت‌شده</h2>

          <p>
            {businesses.length} کسب‌وکار ثبت شده
          </p>
        </div>
      </div>

      {/* لیست خالی */}
      {businesses.length === 0 && (
        <div className="empty">
          هنوز کسب‌وکاری ثبت نشده است.
        </div>
      )}

      {/* لیست کسب‌وکارها */}
      {businesses.length > 0 && (
        <div className="business-list">
          {businesses.map((business) => (
            <article
              className="business-item"
              key={business.id}
            >
              <div className="business-info">
                <h3>{business.name}</h3>

                <p>
                  {business.description}
                </p>

                <div className="business-details">
                  <span>
                    📱 {business.phone}
                  </span>

                  <span>
                    ✉️ {business.email}
                  </span>

                  <span>
                    📍 {business.address}
                  </span>
                </div>
              </div>

              <div className="business-actions">
                <button
                  type="button"
                  className="edit-button"
                  onClick={() =>
                    handleEdit(business)
                  }
                  disabled={
                    deletingId === business.id
                  }
                >
                  ویرایش
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() =>
                    handleDelete(business.id)
                  }
                  disabled={
                    deletingId === business.id
                  }
                >
                  {deletingId === business.id
                    ? "در حال حذف..."
                    : "حذف"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

