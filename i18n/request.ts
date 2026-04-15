import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const SUPPORTED_LOCALES = ['es', 'en'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale: SupportedLocale = SUPPORTED_LOCALES.includes(rawLocale as SupportedLocale)
    ? (rawLocale as SupportedLocale)
    : 'es';
  
  return {
    locale,
    messages: (await import(`./${locale}.json`)).default
  }
})
