import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KARIGOLD | India's First Karigar-First Gold Jewellery Brand",
  description: "Experience premium gold jewellery with 100% transparent pricing and direct artisan recognition. Old-world trust reimagined with modern HUID validation.",
  keywords: ["KARIGOLD", "Karigar jewellery", "Indian gold", "BIS Hallmark", "HUID", "transparent pricing", "Ramesh Das filigree"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#050505]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-[#F8F8F8] min-h-screen selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
