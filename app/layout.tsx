import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { GoogleAnalytics } from '@next/third-parties/google'; // <-- Importamos Google
import MetaPixel from "./components/MetaPixel"; // <-- Importamos Facebook

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joined | Accesorios en cuero",
  description: "Accesorios premium diseñados para elevar tu estilo diario.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        {/* INYECTAMOS LOS PÍXELES AQUÍ */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <MetaPixel />
      </body>
    </html>
  );
}