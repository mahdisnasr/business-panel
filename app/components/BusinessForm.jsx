"use client";

import { useState } from "react";

export default function BusinessForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "خطا در ثبت کسب‌وکار");
      }

      setMessage("کسب‌وکار با موفقیت ثبت شد.");

      setForm({
        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
      });

      window.dispatchEvent(new Event("business-created"));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">نام کسب‌وکار</label>

        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="مثلاً فروشگاه لوکس"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="description">توضیحات</label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="توضیحات کسب‌وکار"
          required
        />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="phone">شماره موبایل</label>

          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="09123456789"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">ایمیل</label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="address">آدرس</label>

        <input
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="آدرس کسب‌وکار"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="logo">لوگوی کسب‌وکار</label>

        <div className="file-box">
          <p>انتخاب تصویر لوگو</p>

          <input
            id="logo"
            type="file"
            accept="image/*"
          />
        </div>
      </div>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {message && (
        <p className="success">
          {message}
        </p>
      )}

      <button
        className="submit-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "در حال ثبت..." : "ثبت کسب‌وکار"}
      </button>
    </form>
  );
}