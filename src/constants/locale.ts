export const SUPPORTED_LOCALES = ['en', 'zh', 'es', 'ru', 'vi', 'ko', 'ja', 'de'];

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export type Language = {
  code: keyof typeof SUPPORTED_LANGUAGES
  name: string
  short: string
  long: string
}

export const DEFAULT_LOCALE: SupportedLocale = 'en'

// List of languages supported
export const SUPPORTED_LANGUAGES: Record<SupportedLocale, Language> = {
  en: { code: 'en', name: 'english', short: 'EN', long: 'English' },
  zh: { code: 'zh', name: 'chinese', short: '中文', long: '中文' },
  es: { code: 'es', name: 'es', short: 'Español', long: 'Español' },
  ru: { code: 'ru', name: 'ru', short: 'Pусский', long: 'Pусский' },
  vi: { code: 'vi', name: 'vi', short: 'Tiếng Việt', long: 'Tiếng Việt' },
  ko: { code: 'ko', name: 'ko', short: '한국어', long: '한국어' },
  ja: { code: 'ja', name: 'ja', short: '日本語', long: '日本語' },
  de: { code: 'de', name: 'de', short: 'Deutsch', long: 'Deutsch' }
}

// mapping of momentjs locales
export const MOMENTJS_LANGUAGES = {
  "en": "en",
  "zh": "zh-cn",
  "es": "es",
  "ru": "ru",
  "vi": "vi",
  "ko": "ko",
  "ja": "ja",
  "de": "de"
}

// import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';
export type LocalePrefix = 'as-needed' | 'always' | 'never';

export const LOCALE_PREFIX: LocalePrefix = 'as-needed';