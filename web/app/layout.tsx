import type { Metadata } from "next";
import "./globals.css";

// Import components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sonam International | Fashion Clothing",
  description: "Discover the latest fashion trends at Sonam International. Shop our collection of high-quality clothing and accessories.",
  keywords: "fashion, clothing, apparel, online shopping, Sonam International",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
