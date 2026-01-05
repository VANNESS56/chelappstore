import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChelAppStore - Aplikasi Premium Termurah dan Terbaik",
  description: "Temukan aplikasi premium terbaik untuk produktivitas, desain, pengembangan, dan lainnya. Koleksi aplikasi berkualitas tinggi yang dikurasi dengan pengalaman pengguna yang seamless terbaik nomor 1 di Indonesia.",
  keywords: ["toko aplikasi", "aplikasi premium", "produktivitas", "alat desain", "software"],
  authors: [{ name: "Tim ChelAppStore" }],
  openGraph: {
    title: "ChelAppStore - Toko Aplikasi Premium Termurah dan Terbaik",
    description: "Temukan aplikasi premium untuk kehidupan digitalmu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
