import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getLocale, getTranslations } from 'next-intl/server';

import MainLayout from '@/client/components/layout/MainLayout';
import MainProvider from '@/client/components/providers/MainProvider';

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: Record<string, string>;
}) {
  let messages;
  try {
    messages = {
      ...(await import(`../../locale/messages/${locale}.json`)).default,
      ...(await import(`../../locale/messages/zod/${locale}.json`)).default,
      ...(await import(`../../locale/messages/big-calendar/${locale}.json`))
        .default,
    };
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head />
      <body>
        <MainProvider locale={locale} messages={messages}>
          <MainLayout>{children}</MainLayout>
        </MainProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('site');
  const locale = await getLocale();
  const title = t('title');
  const description = t('desc');

  return {
    title,
    description,
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title,
      description,
      url: 'https://nextjs.org',
      siteName: title,
      images: [
        {
          url: 'https://nextjs.org/og.png',
          width: 800,
          height: 600,
        },
        {
          url: 'https://nextjs.org/og-alt.png',
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      locale,
      type: 'website',
    },
  };
}
