import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "María Alejandra Montilla | Portfolio",
  description: "Estudiante de Ingeniería de Software — UCC Pasto",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={sourceSerif.variable}
      style={
        {
          ["--font-inter" as never]: sourceSerif.style.fontFamily,
          ["--font-playfair" as never]: sourceSerif.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body className={`${sourceSerif.className} antialiased`}>
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

          <div className="sparkles-layer" />
          
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="relative z-10">
              {children}
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
