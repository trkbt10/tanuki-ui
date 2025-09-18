import type { ThemeMetadata } from "../data/themes";

const THEME_LINK_ID = "theme-css";
export const DEFAULT_THEME_VALUE = "monotone";

const ABSOLUTE_URL_PATTERN = /^(https?:)?\/\//i;

function resolveThemeHref(path: string): string {
  if (!path) return path;
  if (ABSOLUTE_URL_PATTERN.test(path)) return path;

  const base = import.meta.env.BASE_URL ?? "/";

  if (path.startsWith(base)) return path;

  if (path.startsWith("/")) {
    return `${base}${path.slice(1)}`;
  }

  return `${base}${path}`;
}

function toAbsoluteUrl(href: string): string {
  return new URL(href, document.baseURI).href;
}

export function ensureThemeStylesheet(theme: ThemeMetadata | undefined) {
  if (typeof document === "undefined" || !theme?.file) return;

  const targetHref = resolveThemeHref(theme.file);
  const themeLink = document.getElementById(THEME_LINK_ID);

  if (themeLink instanceof HTMLLinkElement) {
    const absoluteHref = toAbsoluteUrl(targetHref);
    if (themeLink.dataset.theme === theme.value && themeLink.href === absoluteHref) {
      return;
    }

    themeLink.dataset.theme = theme.value;
    themeLink.href = targetHref;
    return;
  }

  const link = document.createElement("link");
  link.id = THEME_LINK_ID;
  link.rel = "stylesheet";
  link.href = targetHref;
  link.dataset.theme = theme.value;
  document.head.appendChild(link);
}
