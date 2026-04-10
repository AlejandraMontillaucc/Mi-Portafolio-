import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "María Alejandra Montilla | Portfolio",
  description: "Estudiante de Ingeniería de Software — UCC Pasto",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {/* Background shapes layer */}
          <div className="background-shapes">
            <div className="bg-shape bg-shape-1" />
            <div className="bg-shape bg-shape-2" />
            <div className="bg-shape bg-shape-3" />
            <div className="bg-shape bg-shape-4" />
            <div className="bg-shape bg-shape-5" />
            <div className="bg-shape bg-shape-6" />
            <div className="bg-shape bg-shape-7" />
          </div>
          
          {/* Floral texture */}
          <div className="floral-texture" />
          
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}