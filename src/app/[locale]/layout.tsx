import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});


export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Mistorsush | " + (locale === 'ru' ? 'Суши в Ашкелоне' : locale === 'he' ? 'סושי באשקלון' : 'Sushi in Ashkelon'),
    description: "Best sushi in Ashkelon with Friday 2+1 promo.",
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isRtl = locale === 'he';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="scroll-smooth">
      <body
        className={cn(
          inter.variable,
          "bg-dark text-white antialiased pb-28 min-h-screen font-sans"
        )}
      >
        <Providers messages={messages} locale={locale}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
