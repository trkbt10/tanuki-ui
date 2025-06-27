import { Locale, I18nKey, I18nContextValue } from './types';
import * as React from "react";
interface I18nProviderProps {
    children: React.ReactNode;
    initialLocale?: Locale;
    fallbackLocale?: Locale;
}
export declare const I18nProvider: React.FC<I18nProviderProps>;
export declare const useI18n: () => I18nContextValue;
export declare const useTranslation: () => {
    t: (key: I18nKey, params?: Record<string, string | number>) => string;
    locale: Locale;
    setLocale: (locale: Locale) => void;
    formatNumber: (num: number) => string;
    formatDate: (date: Date) => string;
    formatDateTime: (date: Date) => string;
};
export {};
