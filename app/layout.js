import "./globals.css";

export const metadata = {
  title: "Business Management Panel",
  description:
    "پنل مدیریت کسب‌وکار",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
    >
      <body>
        {children}
      </body>
    </html>
  );
}