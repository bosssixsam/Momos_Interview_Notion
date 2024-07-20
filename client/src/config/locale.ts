// import { LocaleCode } from '@athena20/ts-router'

export const LocaleConfig = {
  EN: "en",
  VI: "vi",
  // FR: 'fr',
  // DE: 'de',
  // ZH_CN: 'zh-cn',
  // ZH_TW: 'zh-tw',
  // ZH_HK: 'zh-hk'
} as const;

export const locales = Object.values(LocaleConfig);
export const localePrefix = "as-needed";

export const FormLocaleConfig: Pick<Record<any, string>, "en" | "vi"> = {
  en: "en",
  vi: "vi",
} as const;

export type FormLocaleLanguage = keyof typeof FormLocaleConfig;
export const Locales = Object.values(LocaleConfig);
export const LocalePrefix = "as-needed";
