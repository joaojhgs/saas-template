import type { NamespaceKeys, NestedKeyOf, createTranslator } from 'next-intl';

// Declaring this interface provides type safety for message keys
type Messages = typeof import('@/locale/messages/pt-BR.json');
type ZodErrors = typeof import('@/locale/messages/zod/pt-BR.json');

declare interface IntlMessages extends Messages, ZodErrors {}

declare module 'next-intl' {
  interface AppConfig {
    Messages: IntlMessages;
  }
}

declare module 'next-intl/server' {
  // Overload getTranslations to force strict typing
  export function getTranslations<
    NestedKey extends NamespaceKeys<
      IntlMessages,
      NestedKeyOf<IntlMessages>
    > = never,
  >(
    namespace?: NestedKey,
  ): Promise<ReturnType<typeof createTranslator<IntlMessages, NestedKey>>>;

  export function getTranslations(opts?: {
    locale: string;
    namespace?: string;
  }): Promise<ReturnType<typeof createTranslator<IntlMessages, string>>>;
}
