import { ui, showDefaultLang } from './ui';
import { defaultLang, LANG } from "./index.ts";
import spanish from "./es.json";
import english from "./en.json";

export function getLangFromUrl(url: URL): string {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang;
    return defaultLang;
}

export function removeLangFromUrl(url: URL): URL {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) {
        url.pathname = url.pathname.replace(`/${lang}`, '')
       return url;
    }
    return url
}

export function useTranslations(lang: string) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function useTranslatedPath(lang: string) {
    return function translatePath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
}

type I18N = typeof spanish;

/**
 * Deep-merge de dos objetos. Los valores de `source` sobrescriben los de
 * `target`; los objetos planos se combinan recursivamente. Los arrays y
 * valores primitivos se reemplazan por completo. Si una clave falta en
 * `source`, se conserva el valor de `target` (fallback al idioma por defecto).
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
    const output = { ...target } as Record<string, unknown>;
    const src = source as Record<string, unknown>;

    for (const key of Object.keys(src)) {
        const targetValue = output[key];
        const sourceValue = src[key];

        if (
            isPlainObject(targetValue) &&
            isPlainObject(sourceValue)
        ) {
            output[key] = deepMerge(targetValue, sourceValue);
        } else if (sourceValue !== undefined) {
            output[key] = sourceValue;
        }
    }

    return output as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export const getI18N = (currentLocale: string = LANG.SPANISH): I18N => {
    if (currentLocale === LANG.ENGLISH) {
        // Partimos del español como base y sobrescribimos con inglés, de modo
        // que cualquier clave ausente en en.json cae al español.
        return deepMerge<I18N>(spanish, english as Partial<I18N>);
    }
    return spanish;
};