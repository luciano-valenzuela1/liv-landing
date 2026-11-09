import type { Audience } from "@/content/landing";

/**
 * Destinations of the account CTAs ("Crear mi cuenta" / "Iniciar sesión").
 * Configured per environment; values may be absolute URLs (the app lives on
 * another origin) or paths. NEXT_PUBLIC_* vars are inlined at build time, so
 * each one must be referenced literally (no dynamic `process.env[name]`).
 */
const fromEnv = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const REGISTER_DEFAULT = "/registro";
const LOGIN_DEFAULT = "/login";

/** Generic entry points, used while no audience has been chosen. */
const REGISTER = fromEnv(process.env.NEXT_PUBLIC_REGISTER_URL);
const LOGIN = fromEnv(process.env.NEXT_PUBLIC_LOGIN_URL);

/** Optional dedicated URLs per audience. */
const REGISTER_BY_AUDIENCE: Record<Audience, string | undefined> = {
  empresa: fromEnv(process.env.NEXT_PUBLIC_REGISTER_EMPRESA_URL),
  prestador: fromEnv(process.env.NEXT_PUBLIC_REGISTER_PRESTADOR_URL),
};
const LOGIN_BY_AUDIENCE: Record<Audience, string | undefined> = {
  empresa: fromEnv(process.env.NEXT_PUBLIC_LOGIN_EMPRESA_URL),
  prestador: fromEnv(process.env.NEXT_PUBLIC_LOGIN_PRESTADOR_URL),
};

/** Appends a query param, respecting a query string already in the base URL. */
export function withQueryParam(
  base: string,
  key: string,
  value: string,
): string {
  const hashAt = base.indexOf("#");
  const path = hashAt === -1 ? base : base.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : base.slice(hashAt);
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${encodeURIComponent(key)}=${encodeURIComponent(value)}${hash}`;
}

/**
 * Resolves a CTA destination:
 * - audience chosen -> its dedicated URL, else the generic one (or default
 *   path) with `?perfil=<audience>`
 * - audience not chosen yet -> the generic URL, else the dedicated URL of the
 *   audience shown by default, else the default path
 */
function resolve(
  byAudience: Record<Audience, string | undefined>,
  generic: string | undefined,
  fallbackPath: string,
  audience: Audience,
  audienceTouched: boolean,
): string {
  if (audienceTouched) {
    return (
      byAudience[audience] ??
      withQueryParam(generic ?? fallbackPath, "perfil", audience)
    );
  }
  return generic ?? byAudience[audience] ?? fallbackPath;
}

/** Where "Crear mi cuenta" goes. */
export const getRegisterHref = (audience: Audience, touched: boolean) =>
  resolve(REGISTER_BY_AUDIENCE, REGISTER, REGISTER_DEFAULT, audience, touched);

/** Where "Iniciar sesión" goes. */
export const getLoginHref = (audience: Audience, touched: boolean) =>
  resolve(LOGIN_BY_AUDIENCE, LOGIN, LOGIN_DEFAULT, audience, touched);
