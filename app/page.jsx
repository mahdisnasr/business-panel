import BusinessForm from "./components/BusinessForm";
import BusinessList from "./components/BusinessList";

export default function Home() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>پنل مدیریت کسب‌وکار</h1>
          <p>
            ثبت و مدیریت اطلاعات کسب‌وکارها
          </p>
        </header>

        <section className="card">
          <h2 className="card-title">
            ثبت کسب‌وکار
          </h2>

          <BusinessForm />
        </section>

        <section className="card">
          <h2 className="card-title">
            کسب‌وکارهای ثبت‌شده
          </h2>

          <BusinessList />
        </section>
      </div>
    </main>
  );
}